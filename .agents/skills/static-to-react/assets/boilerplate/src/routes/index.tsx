import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

/** 首頁元件 */
function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold">歡迎使用 React App</h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
        由靜態網站轉換而來的 React 專案
      </p>
    </div>
  );
}
