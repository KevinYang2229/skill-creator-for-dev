#!/usr/bin/env python3
"""Generate FigJam-pasteable Mermaid flowchart from a sitemap.json tree.

Usage:
    python3 generate_mermaid.py sitemap.json > sitemap.mmd
    python3 generate_mermaid.py sitemap.json -o sitemap.mmd

The input schema is documented in references/node-schema.md.
The Mermaid dialect rules are documented in references/mermaid-figjam.md.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path
from typing import Any

# Page type → Mermaid shape template. {label} is the quoted, escaped label.
SHAPE_BY_TYPE: dict[str, str] = {
    "landing":   '{id}({label})',
    "list":      '{id}([{label}])',
    "detail":    '{id}[({label})]',
    "form":      '{id}{{{{{label}}}}}',
    "flow":      '{id}[[{label}]]',
    "auth":      '{id}(({label}))',
    "decision":  '{id}{{{label}}}',
    "content":   '{id}[{label}]',
    "dashboard": '{id}[{label}]',
    "settings":  '{id}[{label}]',
    "legal":     '{id}[{label}]',
    "external":  '{id}>{label}]',
}

DEFAULT_SHAPE = '{id}[{label}]'

NOTES_MAX_LEN = 60
SUBGRAPH_THRESHOLD = 12  # total nodes beyond which top-level sections become subgraphs


def escape_label_text(text: str) -> str:
    """Escape a single line of label text for use inside a quoted Mermaid label."""
    if text is None:
        return ""
    # Double quotes break quoted labels; use HTML entity.
    text = text.replace('"', "#quot;")
    # Strip newlines — we use <br/> explicitly.
    text = text.replace("\n", " ").replace("\r", " ")
    return text.strip()


def build_label(node: dict[str, Any]) -> str:
    """Build a quoted multi-line Mermaid label from a node."""
    lines: list[str] = []

    name = escape_label_text(node.get("name", node.get("id", "")))
    lines.append(name if name else "(unnamed)")

    url = escape_label_text(node.get("url", ""))
    if url:
        lines.append(url)

    ntype = escape_label_text(node.get("type", ""))
    if ntype:
        lines.append(ntype)

    notes = escape_label_text(node.get("notes", ""))
    if notes:
        if len(notes) > NOTES_MAX_LEN:
            notes = notes[: NOTES_MAX_LEN - 1].rstrip() + "…"
        lines.append(notes)

    return '"' + "<br/>".join(lines) + '"'


def sanitize_id(raw: str) -> str:
    """Make an id safe for Mermaid (alnum + underscore)."""
    out = []
    for ch in raw:
        if ch.isalnum() or ch == "_":
            out.append(ch)
        else:
            out.append("_")
    result = "".join(out).strip("_")
    return result or "node"


def render_node_line(node: dict[str, Any]) -> str:
    """Render a single node declaration line."""
    node_id = sanitize_id(node["id"])
    label = build_label(node)
    ntype = node.get("type", "content")
    template = SHAPE_BY_TYPE.get(ntype, DEFAULT_SHAPE)
    return template.format(id=node_id, label=label)


def collect_nodes(node: dict[str, Any], acc: list[dict[str, Any]]) -> None:
    acc.append(node)
    for child in node.get("children", []) or []:
        collect_nodes(child, acc)


def count_nodes(node: dict[str, Any]) -> int:
    n = 1
    for child in node.get("children", []) or []:
        n += count_nodes(child)
    return n


def render_flat(root: dict[str, Any]) -> tuple[list[str], list[str], list[str]]:
    """Render without subgraphs. Returns (node_lines, edge_lines, comment_lines)."""
    node_lines: list[str] = []
    edge_lines: list[str] = []
    comment_lines: list[str] = []

    all_nodes: list[dict[str, Any]] = []
    collect_nodes(root, all_nodes)

    for n in all_nodes:
        node_lines.append(render_node_line(n))
        thumb = n.get("thumbnail")
        if thumb:
            comment_lines.append(f"%% thumbnail[{sanitize_id(n['id'])}]: {thumb}")

    def walk_edges(parent: dict[str, Any]) -> None:
        pid = sanitize_id(parent["id"])
        for child in parent.get("children", []) or []:
            cid = sanitize_id(child["id"])
            if child.get("url_inferred"):
                edge_lines.append(f"{pid} -.-> {cid}")
            elif child.get("link_source") == "nav":
                edge_lines.append(f"{pid} ==> {cid}")
            else:
                edge_lines.append(f"{pid} --> {cid}")
            walk_edges(child)

    walk_edges(root)
    return node_lines, edge_lines, comment_lines


def render_subgraphs(root: dict[str, Any]) -> tuple[list[str], list[str], list[str], list[str]]:
    """Render with top-level children of root as subgraphs.

    Returns (root_node_lines, subgraph_blocks, edge_lines, comment_lines).
    """
    root_id = sanitize_id(root["id"])
    root_line = render_node_line(root)

    subgraph_blocks: list[str] = []
    edge_lines: list[str] = []
    comment_lines: list[str] = []

    if root.get("thumbnail"):
        comment_lines.append(f"%% thumbnail[{root_id}]: {root['thumbnail']}")

    for section in root.get("children", []) or []:
        section_id = sanitize_id(section["id"])
        section_title_raw = escape_label_text(section.get("name", section["id"]))
        section_title = f'"{section_title_raw}"'

        block: list[str] = [f"subgraph sg_{section_id}[{section_title}]", "  direction TB"]

        section_nodes: list[dict[str, Any]] = []
        collect_nodes(section, section_nodes)
        for n in section_nodes:
            block.append("  " + render_node_line(n))
            if n.get("thumbnail"):
                comment_lines.append(f"%% thumbnail[{sanitize_id(n['id'])}]: {n['thumbnail']}")

        # internal edges inside the section
        def walk_section(parent: dict[str, Any]) -> None:
            pid = sanitize_id(parent["id"])
            for child in parent.get("children", []) or []:
                cid = sanitize_id(child["id"])
                if child.get("url_inferred"):
                    block.append(f"  {pid} -.-> {cid}")
                else:
                    block.append(f"  {pid} --> {cid}")
                walk_section(child)

        walk_section(section)
        block.append("end")
        subgraph_blocks.append("\n".join(block))

        # edge from root to section entry
        edge_lines.append(f"{root_id} ==> {section_id}")

    return [root_line], subgraph_blocks, edge_lines, comment_lines


def generate(data: dict[str, Any]) -> str:
    root = data.get("root")
    if not root:
        raise ValueError("sitemap.json is missing top-level 'root'")

    site = data.get("site", {}) or {}
    header_comments: list[str] = ["%% Generated by sitemap-from-screenshots skill"]
    if site.get("name"):
        header_comments.append(f"%% site: {site['name']}")
    if site.get("base_url"):
        header_comments.append(f"%% base_url: {site['base_url']}")

    total = count_nodes(root)
    use_subgraphs = total > SUBGRAPH_THRESHOLD

    out: list[str] = []
    out.extend(header_comments)
    out.append("flowchart TD")

    if use_subgraphs:
        root_lines, subgraphs, edges, comments = render_subgraphs(root)
        out.extend("  " + line for line in root_lines)
        for block in subgraphs:
            out.append("")
            out.extend("  " + line for line in block.splitlines())
        out.append("")
        out.extend("  " + line for line in edges)
        if comments:
            out.append("")
            out.extend(comments)
    else:
        node_lines, edge_lines, comments = render_flat(root)
        out.extend("  " + line for line in node_lines)
        out.append("")
        out.extend("  " + line for line in edge_lines)
        if comments:
            out.append("")
            out.extend(comments)

    return "\n".join(out) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate FigJam Mermaid from sitemap.json")
    parser.add_argument("input", help="Path to sitemap.json")
    parser.add_argument("-o", "--output", help="Output .mmd path (default: stdout)")
    args = parser.parse_args()

    in_path = Path(args.input)
    if not in_path.exists():
        print(f"error: {in_path} not found", file=sys.stderr)
        return 1

    try:
        data = json.loads(in_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        print(f"error: invalid JSON in {in_path}: {e}", file=sys.stderr)
        return 1

    try:
        mermaid = generate(data)
    except ValueError as e:
        print(f"error: {e}", file=sys.stderr)
        return 1

    if args.output:
        Path(args.output).write_text(mermaid, encoding="utf-8")
        print(f"wrote {args.output}", file=sys.stderr)
    else:
        sys.stdout.write(mermaid)

    return 0


if __name__ == "__main__":
    sys.exit(main())
