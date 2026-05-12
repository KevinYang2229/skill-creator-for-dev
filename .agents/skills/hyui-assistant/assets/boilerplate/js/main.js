'use strict';
const useA11y = true;
// -----------------------------------------------------------------------
// -----  支援js時，移除no-js  -------------------------------------------------------
// -----------------------------------------------------------------------
document.documentElement.classList.remove('no-js');

// -----------------------------------------------------------------------
// -----  共用效果  -------------------------------------------------------
// -----------------------------------------------------------------------

function _jsSlideUp(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;
  element.style.display = display;
  if (display !== 'none') {
    let totalHeight = element.offsetHeight;
    element.style.overflow = 'hidden';

    element.style.height = `${totalHeight}px`;
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.height = `0px`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsSlideUp(a);
// })

function _jsSlideDown(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;
  element.style.display = display;
  if (display === 'none') {
    element.style.display = 'block';
    element.style.overflow = 'hidden';
    let totalHeight = element.offsetHeight;
    element.style.height = '0px';
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.height = `${totalHeight}px`;
    }, 0);
    setTimeout(() => {
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsSlideDown(a);
// })

function _jsSlideToggle(element, time = 200) {
  let ele = window.getComputedStyle(element);

  let display = ele.display;
  let speed = time;
  element.style.display = display;
  if (display === 'none') {
    element.style.display = 'block';
    let totalHeight = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = '0px';
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.height = `${totalHeight}px`;
    }, 0);
    setTimeout(() => {
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  } else {
    let totalHeight2 = element.offsetHeight;
    element.style.overflow = 'hidden';
    element.style.height = `${totalHeight2}px`;
    element.style.transitionProperty = 'height';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.height = `0px`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('height');
      element.style.removeProperty('overflow');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsSlideToggle(a);
// })

function _jsFadeIn(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;

  if (display === 'none') {
    display = 'block';
    let opacity = 0;
    element.style.display = display;
    element.style.opacity = 0;

    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `1`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'block';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsFadeIn(a);
// })

function _jsFadeOut(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;

  if (display !== 'none') {
    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `0`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsFadeOut(a);
// })

function _jsFadeToggle(element, time = 200) {
  let ele = window.getComputedStyle(element);
  let display = ele.display;
  let speed = time;

  if (display === 'none') {
    display = 'block';
    let opacity = 0;
    element.style.display = display;
    element.style.opacity = 0;

    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `1`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'block';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  } else {
    element.style.transitionProperty = 'opacity';
    element.style.transitionDuration = `${speed}ms`;
    setTimeout(() => {
      element.style.opacity = `0`;
    }, 0);
    setTimeout(() => {
      element.style.display = 'none';
      element.style.removeProperty('opacity');
      element.style.removeProperty('transition-duration');
      element.style.removeProperty('transition-property');
    }, speed);
  }
}
// 使用方式
// let target = document.querySelector('.target');
// let a = document.querySelector('.a');
// target.addEventListener('click',(e)=>{
//   jsFadeToggle(a);
// })

function _toggleDropdown(elem, con, autoClose = true) {
  const body = document.body;
  const targetSelect = document.querySelector(elem);
  const targetSelectCon = document.querySelector(con);
  if (!targetSelectCon) return;

  if (!targetSelect) {
    targetSelectCon.style.display = 'block';
    return;
  }
  let checkDisplay = window.getComputedStyle(targetSelectCon).display === 'none';
  const id = `ts_${_randomLetter(3)}${_randomNumber(3)}`;

  if (checkDisplay) {
    if (useA11y) {
      targetSelect.setAttribute('aria-expanded', 'false');
    }
  } else {
    if (useA11y) {
      targetSelect.setAttribute('aria-expanded', 'true');
    }
    targetSelect.classList.add('active');
  }
  if (useA11y) {
    targetSelect.setAttribute('aria-haspopup', 'true');
    targetSelect.setAttribute('aria-controls', `${id}_con`);
    targetSelect.setAttribute('id', id);
    targetSelectCon.setAttribute('id', `${id}_con`);
    targetSelectCon.setAttribute('aria-labelledby', id);
  }

  targetSelect.addEventListener('click', (e) => {
    let expanded = targetSelect.classList.contains('active');
    expanded === true ? closeCon() : openCon();
  });
  function openCon() {
    if (useA11y) {
      targetSelect.setAttribute('aria-expanded', 'true');
    }
    targetSelect.classList.add('active');
    _jsSlideDown(targetSelectCon);
  }
  function closeCon() {
    if (useA11y) {
      targetSelect.setAttribute('aria-expanded', 'false');
    }
    targetSelect.classList.remove('active');
    _jsSlideUp(targetSelectCon);
    targetSelect.focus();
  }
  body.addEventListener('keydown', (e) => {
    let allTarget = targetSelectCon.querySelectorAll('a, button, input, textarea, select');
    const firstTarget = allTarget[0];
    const lastTarget = [...allTarget].at(-1);

    if (targetSelect.classList.contains('active')) {
      if (e.code === 'Tab') {
        if (e.target === targetSelect && e.shiftKey) {
          closeCon();
        } else if (e.target === firstTarget && e.shiftKey) {
          e.preventDefault();
          targetSelect.focus();
        } else if (e.target === lastTarget && !e.shiftKey) {
          e.preventDefault();
          closeCon();
        }
      }
      //Escape
      else if (e.code === 'Escape') {
        if (useA11y) {
          targetSelect.setAttribute('aria-expanded', 'false');
        }
        _jsSlideUp(targetSelectCon);
        targetSelect.focus();
      }
    }
  });

  if (autoClose) {
    // 點擊其他地方關閉;
    body.addEventListener('click', (e) => {
      let isInsideTarget = _jsParents(e.target, targetSelectCon).length === 0;

      if (targetSelect.classList.contains('active') && e.target !== targetSelect && isInsideTarget) {
        if (useA11y) {
          targetSelect.setAttribute('aria-expanded', 'false');
        }
        targetSelect.classList.remove('active');
        _jsSlideUp(targetSelectCon);
      }
    });
  }

  window.addEventListener('resize', (e) => {
    if (!checkDisplay) return;
    if (useA11y) {
      targetSelect.setAttribute('aria-expanded', 'false');
    }
    targetSelect.classList.remove('active');
    _jsSlideUp(targetSelectCon);
  });
}

// 使用方式
// toggleSlider('.target','.con');

function _jsParents(element, elementCheck) {
  const matched = [];

  const elements = typeof element === 'string' ? document.querySelectorAll(element) : element;

  // 取得每個元素的所有父節點，直到 <html>
  function _getParents(el) {
    while (el.parentNode && el.parentNode !== document.documentElement) {
      matched.push(el.parentNode);
      el = el.parentNode;
    }
  }

  // 處理集合與單一元素
  if (elements) {
    if (elements.length === undefined) {
      _getParents(elements);
    } else if (elements.nodeName !== 'SELECT') {
      elements.forEach(_getParents);
    }
  }

  // 根據 elementCheck 過濾父節點
  const filtered = matched.filter((parent) => {
    if (!elementCheck) {
      return true;
    } else if (elementCheck[0] === '#') {
      return parent.id === elementCheck.slice(1);
    } else if (elementCheck[0] === '.') {
      return parent.classList.contains(elementCheck.slice(1));
    } else if (typeof elementCheck === 'string') {
      return parent.localName === elementCheck.toLowerCase();
    } else {
      return parent === elementCheck;
    }
  });

  // 利用 Set 來進行去重複，並使用reverse()反轉順序
  return Array.from(new Set(filtered)).reverse();
}

// 使用方式
// 第一個參數可使用'.target','#target',變數，第二個參數可使用'ul','.out','#out'
// let target = document.querySelector('.target');
// jsParents(target) 變數方式
// jsParents('.target/#target'); 抓取'.target/#target'所有父層
// jsParents('.target/#target','ul'); 抓取'.target/#target'所有tag為ul的父層
// jsParents('.target/#target','.out'); 抓取'.target/#target'所有class為out的父層
// jsParents('.target/#target','#out'); 抓取'.target/#target'所有id為out的父層
// 操作父層
// jsParents('.target/#target').forEach((i) => {});

function _jsChildren(element, elementCheck) {
  const elementArr = typeof element === 'string' ? document.querySelectorAll(element) : element;

  const _getChildren = (item) => {
    if (!item || !item.childNodes) return [];
    return [...item.childNodes].filter((child) => {
      if (child.nodeName === '#text') return;
      if (elementCheck === undefined) return true;
      const letter = elementCheck.slice(1);
      switch (elementCheck[0]) {
        case '#':
          return child.id === letter;
        case '.':
          return child.classList.contains(letter);
        default:
          return child.localName === elementCheck;
      }
    });
  };
  const hasLength = elementArr && typeof elementArr.length === 'number';
  if (hasLength && elementArr.length === 0) return [];
  return (hasLength && elementArr.length > 0 ? [...elementArr].map((i) => _getChildren(i)) : _getChildren(elementArr)).flat();
}

// 使用方式
// 第一個參數可使用'.target','#target',變數，第二個參數可使用'ul','.out','#out'
// let target = document.querySelector('.target');
// jsChildren(target) 變數方式
// jsChildren('.target/#target'); 抓取target所有子層
// jsChildren('.target/#target','ul'); 抓取target下一層所有tag為ul的子層
// jsChildren('.target/#target','.out'); 抓取target下一層所有class為out的子層
// jsChildren('.target/#target','#out'); 抓取target下一層所有id為out的子層
// 操作子層
// jsChildren('.target/#target').forEach((i) => {});

// 檢查元素是否可見
function _isElementVisible(el) {
  let current = el;
  while (current) {
    const style = window.getComputedStyle(current);
    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
      return false;
    }
    current = current.parentElement;
  }
  return true;
}

// 亂數數字
function _randomNumber(max) {
  let letter = '1234567890';
  let number = '';

  for (let i = 0; i < max; i++) number += letter.charAt(Math.floor(Math.random() * letter.length));
  return number;
}

// 亂數英文字
function _randomLetter(max) {
  let letter = 'abcdefghijklmnopqrstuvwxyz';
  let text = '';

  for (let i = 0; i < max; i++) text += letter.charAt(Math.floor(Math.random() * letter.length));
  return text;
}

// 改變標籤
// 改變標籤
function _changeTag(oldTag, newTag) {
  // 檢查 oldTag 是否存在於 DOM 中
  if (!oldTag || !oldTag.parentNode) return;

  const newTagElem = document.createElement(newTag);
  // 複製所有屬性
  for (const attr of oldTag.attributes) {
    newTagElem.setAttribute(attr.name, attr.value);
  }

  // 增加所有子節點
  while (oldTag.firstChild) {
    newTagElem.appendChild(oldTag.firstChild);
  }

  // 使用 replaceWith 替換舊標籤，語法更簡潔
  oldTag.replaceWith(newTagElem);
}

// -----------------------------------------------------------------------
// -----  FontSize   -----------------------------------------------------
// -----------------------------------------------------------------------

function FontSize() {
  const body = document.body;
  // 更新按鈕狀態與目標區域的字體 class
  function _updateView(buttons, target, activeClassName) {
    const sizeClasses = ['smallSize', 'mediumSize', 'largeSize'];

    // 更新按鈕的 ARIA 狀態和 active class
    buttons.forEach((button) => {
      const isTargetButton = button.classList.contains(activeClassName);
      if (useA11y) {
        button.setAttribute('aria-pressed', isTargetButton);
      }
      button.parentNode.classList.toggle('active', isTargetButton);
    });

    // 更新目標元素的 class
    target.classList.remove(...sizeClasses);
    target.classList.add(activeClassName);
  }

  // 創造新的 字體大小設定
  function _createCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }

  // 讀取瀏覽器上 字體大小設定
  function _readCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  // 設定字體切換功能
  function _setupFontSizeToggle(container, cookieName, target) {
    if (!container || !target) return;

    const buttons = container.querySelectorAll('ul button');
    const buttonContainer = container.querySelector('ul');
    const sizeClasses = ['smallSize', 'mediumSize', 'largeSize'];

    if (!buttonContainer || buttons.length === 0) return;

    // 使用事件委派 (Event Delegation)
    buttonContainer.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (!button) return;

      const selectedSize = sizeClasses.find((cls) => button.classList.contains(cls));
      if (selectedSize) {
        _createCookie(cookieName, selectedSize, 365);
        _updateView(buttons, target, selectedSize);
      }
    });

    // 初始化
    const cookieValue = _readCookie(cookieName);
    const initialSize = sizeClasses.includes(cookieValue) ? cookieValue : 'smallSize';
    if (!cookieValue) _createCookie(cookieName, initialSize, 365);
    _updateView(buttons, target, initialSize);
  }

  // 頁首字體大小設定
  const fontSizeHeader = document.querySelector('header .fontSize');
  if (fontSizeHeader) _setupFontSizeToggle(fontSizeHeader, 'FontSize', body);

  // 內頁字體大小設定
  const fontSizeInner = document.querySelector('.fontSizeInner'); // 控制的對象
  const mainContent = document.querySelector('.mainContentBox .mainContent');
  if (fontSizeInner && mainContent) _setupFontSizeToggle(fontSizeInner, 'FontSizeInner', mainContent);
}
window.addEventListener('load', () => FontSize());

// -----------------------------------------------------------------------
// -----  menu   ------------------------------------------------------
// -----------------------------------------------------------------------
function mainMenu(obj) {
  // RWD切換判斷，與_variable.scss 的 --RWDWidth連動
  const setRWDWidth = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--RWDWidth'));
  // 增加透明黑底
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.insertAdjacentElement('afterbegin', overlay);
  }

  const body = document.body;
  const header = document.querySelector('header');
  const headTop = document.querySelector('.headTop');
  const { sticky = true, needLink = false, mega = false } = obj;
  const mainMenu = document.querySelector('.mainMenu');
  if (mainMenu === null) return;
  const menu = mainMenu.querySelector('nav');

  // 有下層的增加 hasChild 的 class
  const checkChild = menu.querySelectorAll('li ul');
  checkChild.forEach((item) => item.parentNode.classList.add('hasChild'));
  // 檢查子選單是否超出視窗邊界
  function _checkBorder(e) {
    if (mega) return;
    // 抓出該項目以下有多少層級
    const nextUl = e.querySelectorAll('ul');
    //確定最後一層ul的父層li共有幾個
    const hasChildLi = _jsParents([...nextUl].at(-1), 'li');

    // 如果只有一層就不需要
    if (hasChildLi.length <= 1) return;

    // 確定選項的寬度 * 選項有幾層，由於第一層是直接向下不會左右展開，所以需要-1
    const checkUlWidth = hasChildLi[0].offsetWidth * hasChildLi.length - 1 || 0;

    //查詢第一層的位置
    const objectRect = hasChildLi[0].getBoundingClientRect();

    // 如果第一層左邊 + 其他層寬度超過視窗的寬度，則新增leftSlider
    if (window.innerWidth < objectRect.left + checkUlWidth) {
      hasChildLi[0].classList.add('leftSlider');
    } else {
      hasChildLi[0].classList.remove('leftSlider');
    }
  }

  // 滑鼠滑入
  function _handleMouseenter(e) {
    if (useA11y) {
      e.target.querySelector('a').setAttribute('aria-expanded', 'true');
    }
    e.target.classList.add('active');
    _checkBorder(e.target);
  }

  // 滑鼠滑出
  function _handleMouseleave(e) {
    if (useA11y) {
      e.target.querySelector('a').setAttribute('aria-expanded', 'false');
    }
    e.target.classList.remove('active');
    e.target.querySelector('ul').style.removeProperty('top');
  }

  // 選單層級展開fn
  function _toggleAccordion(item, con) {
    const nodeNameCheck = item.nodeName.toLowerCase();

    let content = item.parentNode.querySelector(con);
    if (item.classList.contains('active')) {
      if (useA11y) {
        item.setAttribute('aria-expanded', 'false');
      }
      item.classList.remove('active');
    } else {
      if (useA11y) {
        item.setAttribute('aria-expanded', 'true');
      }
      item.classList.add('active');
    }
    _jsSlideToggle(content);

    const siblings = [...item.parentNode.parentNode.children].filter((child) => child !== item.parentNode);

    siblings.forEach((j) => {
      if (j.querySelector(con)) {
        let target = j.querySelector(con);
        _jsSlideUp(target);
        if (useA11y) {
          j.querySelector(nodeNameCheck).setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // 桌面版選單初始化與事件綁定
  function _initDesktopMenu() {
    if (mainMenu) {
      const menu = mainMenu.querySelector('nav');
      const hasChild = menu.querySelectorAll('.hasChild');
      // 是否為megaMenu
      if (mega) {
        menu.classList.add('megaMenu');
        menu.classList.remove('menu');
        const megaMenuChild = menu.querySelectorAll(' ul ul .hasChild > a');
        if (useA11y) {
          megaMenuChild.forEach((i) => {
            i.removeAttribute('aria-haspopup');
          });
        }
      }

      // 是否選單固定
      if (sticky) {
        const headerMargin = parseInt(window.getComputedStyle(header).marginBottom.replace('px', ''));
        function stickyHeader() {
          if (window.innerWidth > setRWDWidth) {
            if (headTop.clientHeight < window.scrollY) {
              header.classList.add('sticky');
              headTop.style.marginBottom = `${headerMargin + mainMenu.clientHeight}px`;
            } else {
              header.classList.remove('sticky');
              headTop.style.marginBottom = `${headerMargin}px`;
            }
          } else {
            headTop.removeAttribute('style');
          }
        }
        window.addEventListener('scroll', stickyHeader);
        window.addEventListener('resize', stickyHeader);
        window.addEventListener('load', stickyHeader);
      }

      // 使用事件委派處理滑鼠移入和移出事件
      menu.addEventListener(
        'mouseenter',
        (e) => {
          if (e.target.matches('.hasChild')) {
            _handleMouseenter(e);
          }
        },
        true
      );

      menu.addEventListener(
        'mouseleave',
        (e) => {
          if (e.target.matches('.hasChild')) {
            _handleMouseleave(e);
          }
        },
        true
      );

      //無障礙操作

      menu.addEventListener('keydown', (e) => {
        const checkHasSubmenu = e.target.parentNode.classList.contains('hasChild');
        const lastTarget = _jsParents(e.target, '.hasChild')[0] !== undefined && [..._jsParents(e.target, '.hasChild')[0].querySelectorAll('a,button,input,textarea,select')].at(-1);
        _checkBorder(e.target.parentNode);
        if (window.innerWidth <= setRWDWidth) return;

        if (e.code === 'Tab' && !e.shiftKey) {
          const siblings = [...e.target.parentNode.parentNode.children].filter((child) => child !== e.target.parentNode);
          if (checkHasSubmenu) {
            e.target.parentNode.classList.add('active');
            if (useA11y) {
              e.target.setAttribute('aria-expanded', 'true');
            }
          }
          siblings.forEach((j) => {
            j.classList.remove('active');
            if (useA11y) {
              j.classList.contains('hasChild') ? j.querySelector('a').setAttribute('aria-expanded', 'false') : null;
            }
          });
          if (e.target === lastTarget) {
            _jsParents(e.target, 'li').forEach((j) => j.classList.remove('active'));
          }
        } else if (e.code === 'Tab' && e.shiftKey) {
          if (checkHasSubmenu) {
            e.target.parentNode.classList.remove('active');
            if (useA11y) {
              e.target.setAttribute('aria-expanded', 'false');
            }
          }
        }
      });

      hasChild.forEach((i) => {
        const id = `menu_${_randomLetter(3)}${_randomNumber(3)}`;
        const childA = i.querySelector('a');
        const childUl = i.querySelector('ul');
        if (useA11y) {
          childA.setAttribute('aria-expanded', 'false');
          childA.setAttribute('aria-haspopup', 'true');
          childA.setAttribute('id', id);
          childA.setAttribute('aria-controls', `${id}_con`);
          childUl.setAttribute('id', `${id}_con`);
          childUl.setAttribute('aria-labelledby', id);
        }
      });
    }
  }

  _initDesktopMenu();

  // 手機版選單初始化與事件綁定
  function _initMobileMenu() {
    const header = document.querySelector('header');
    const mobileMenu = document.createElement('nav');
    mobileMenu.setAttribute('id', 'mobileMenu');
    if (useA11y) {
      mobileMenu.setAttribute('aria-labelledby', 'mobileMainMenuBtn');
    }

    // 新增手機版主選單容器
    const mobileMainMenuBox = document.createElement('div');
    mobileMainMenuBox.classList.add('mobileMainMenuBox');

    // 複製主選單
    if (mainMenu) {
      const menu = mainMenu.querySelector('nav');
      const mainMenuClone = menu.cloneNode(true);
      mainMenuClone.classList.remove('mainMenu', 'menu');
      mainMenuClone.classList.add('mobileMainMenu');
      mainMenuClone.classList.remove('megaMenu');
      // 將 主選單 加入到 手機版主選單
      mobileMainMenuBox.insertAdjacentElement('afterbegin', mainMenuClone);

      // 轉換標籤
      _changeTag(mainMenuClone, 'div');
    }

    // 複製top選單
    const topNav = document.querySelector('.topNav');
    if (topNav) {
      const topNavClone = topNav.cloneNode(true);

      topNavClone.querySelector('.fontSize')?.remove();
      topNavClone.querySelector('.topSearch')?.remove();
      topNavClone.querySelector('#aU')?.remove();
      // 將 top選單 加入到 手機版主選單
      mobileMainMenuBox.insertAdjacentElement('beforeend', topNavClone);
      _changeTag(topNavClone, 'div');
    }

    // 將 手機版主選單 加入到 手機版主選單(多包一層div)
    mobileMenu.insertAdjacentElement('afterbegin', mobileMainMenuBox);
    // 將 手機版主選單 加入到 header 前
    header?.insertAdjacentElement('beforebegin', mobileMenu);

    // 點擊選單按鈕 執行 展開側邊選單函式
    const mobileMainMenuBtn = document.querySelector('#mobileMainMenuBtn');
    if (mobileMainMenuBtn === null) return;
    if (useA11y) {
      mobileMainMenuBtn.setAttribute('aria-controls', 'mobileMenu');
      mobileMainMenuBtn.setAttribute('aria-expanded', 'false');
      mobileMainMenuBtn.setAttribute('aria-pressed', 'false');
      mobileMainMenuBtn.setAttribute('aria-haspopup', 'true');
    }

    // 展開側邊選單函式
    function _showSidebar() {
      mobileMenu.style.opacity = '1';
      mobileMenu.style.display = 'block';
      if (useA11y) {
        mobileMainMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMainMenuBtn.setAttribute('aria-pressed', 'true');
      }

      setTimeout(() => {
        mobileMenu.style.transform = 'translateX(0px)';
        mobileMenu.classList.add('open');
      }, 0);
      mobileMainMenuBtn.classList.add('active');
      if (window.innerWidth < setRWDWidth) body.classList.add('noscroll');
      _jsFadeIn(overlay);
      overlay.style.zIndex = '90';
    }

    // 隱藏側邊選單函式
    function _hideSidebar(overlayFN = true) {
      mobileMenu.style.transform = 'translateX(-100%)';
      if (useA11y) {
        mobileMainMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMainMenuBtn.setAttribute('aria-pressed', 'false');
      }

      // 等待 300ms 的動畫時間
      setTimeout(() => {
        mobileMenu.removeAttribute('style');
      }, 300);

      mobileMenu.classList.remove('open');
      body.classList.remove('noscroll');
      mobileMainMenuBtn.classList.remove('active');
      overlay.style.zIndex = '';
      if (overlayFN) _jsFadeOut(overlay);
    }

    mobileMainMenuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (mobileMainMenuBtn.classList.contains('active')) {
        _hideSidebar();
      } else {
        _showSidebar();
      }
      mobileMainMenuBtn.focus();
    });

    overlay.addEventListener('click', () => _hideSidebar());

    // 使用事件委派處理手機選單的點擊事件
    mobileMenu.addEventListener('click', (e) => {
      const target = e.target;
      const hasChildLi = target.closest('.hasChild');

      if (hasChildLi) {
        let childControl;
        if (!needLink) {
          childControl = hasChildLi.querySelector('a');
          if (target === childControl) {
            e.preventDefault();
            _toggleAccordion(childControl, 'ul');
          }
        } else {
          childControl = hasChildLi.querySelector('.nextLvl');
          if (target === childControl) {
            _toggleAccordion(childControl, 'ul');
          }
        }
      }
    });

    // 初始設定
    const mobileMenuLiHasChild = mobileMenu.querySelectorAll('li.hasChild');
    mobileMenuLiHasChild.forEach((i) => {
      let childControl;
      if (!needLink) {
        childControl = i.querySelector('a');
        childControl.setAttribute('role', 'button');
      } else {
        i.classList.add('needLink');
        const nextA = i.querySelector('a');
        const nextBtn = document.createElement('button');
        nextBtn.classList.add('nextLvl');
        nextA.insertAdjacentElement('afterend', nextBtn);
        nextBtn.setAttribute('id', nextA.getAttribute('id'));
        childControl = nextBtn;
      }

      // 無障礙設定 -- mobile
      const id = `mobileMenu_${_randomLetter(3)}${_randomNumber(3)}`;
      if (useA11y) {
        const childUl = i.querySelector('ul');
        childControl.setAttribute('aria-expanded', 'false');
        childControl.setAttribute('aria-haspopup', 'true');
        childControl.setAttribute('id', id);
        childControl.setAttribute('aria-controls', `${id}_con`);
        childUl.setAttribute('id', `${id}_con`);
        childUl.setAttribute('aria-labelledby', id);
      }
    });

    // 手機版鍵盤無障礙設定
    const allMobileMenuTarget = mobileMenu.querySelectorAll('a,button,input,select');
    body.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && mobileMainMenuBtn.classList.contains('active')) {
        _hideSidebar();
      } else if (e.code === 'Tab' && !e.shiftKey && e.target === mobileMainMenuBtn && mobileMainMenuBtn.classList.contains('active')) {
        e.preventDefault();
        allMobileMenuTarget[0].focus();
      } else if (e.code === 'Tab' && e.shiftKey && e.target === allMobileMenuTarget[0]) {
        e.preventDefault();
        mobileMainMenuBtn.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth <= setRWDWidth) {
        headTop.removeAttribute('style');
      } else {
        body.classList.remove('noscroll');
        _hideSidebar();
      }
    });
    const mobileSearchBtn = document.querySelector('#mobileSearchBtn');
    if (!mobileSearchBtn) return;
    mobileSearchBtn.addEventListener('click', () => _hideSidebar(false));
  }
  _initMobileMenu();
}

// -----------------------------------------------------------------------
// -----  search   ------------------------------------------------------
// -----------------------------------------------------------------------
function webSearch() {
  // RWD切換判斷，與_variable.scss 的 --RWDWidth連動
  const setRWDWidth = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--RWDWidth'));
  // 增加透明黑底
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.insertAdjacentElement('afterbegin', overlay);
  }

  const body = document.body;
  const webSearch = document.querySelector('.webSearch');

  if (!webSearch) return;
  // console.warn('網站搜尋功能: webSearch 無法抓到(請檢查Html結構)，或是沒有使用到此功能');
  // return;

  const mobileSearchBtn = document.querySelector('#mobileSearchBtn');
  const webSearchBtn = document.querySelector('#topSearchBtn');
  const searchTargetSelect = document.querySelectorAll('#topSearchBtn, #mobileSearchBtn');
  const webSearchAllTarget = webSearch.querySelectorAll('a, button, input, select, textarea');
  const id = `ws_${_randomLetter(3)}${_randomNumber(3)}`;

  if (webSearchBtn) {
    // 桌機搜尋按鈕進行設定與事件綁定
    if (useA11y) {
      webSearchBtn.setAttribute('aria-controls', `${id}_con`);
      webSearchBtn.setAttribute('aria-expanded', 'false');
      webSearchBtn.setAttribute('aria-pressed', 'false');
      webSearchBtn.setAttribute('aria-haspopup', 'true');
    }
    webSearchBtn.addEventListener('click', () => _toggleContent(webSearchBtn));
  }

  // 行動版搜尋按鈕設定及事件綁定
  if (mobileSearchBtn) {
    if (useA11y) {
      mobileSearchBtn.setAttribute('aria-controls', `${id}_con`);
      mobileSearchBtn.setAttribute('aria-expanded', 'false');
      mobileSearchBtn.setAttribute('aria-pressed', 'false');
      mobileSearchBtn.setAttribute('aria-haspopup', 'true');
      webSearch.setAttribute('aria-labelledby', `topSearchBtn mobileSearchBtn`);
    }
    mobileSearchBtn.addEventListener('click', () => _toggleContent(mobileSearchBtn));
    window.addEventListener('resize', () => window.innerWidth > setRWDWidth && webSearch.removeAttribute('style'));
  } else {
    if (useA11y) {
      webSearch.setAttribute('aria-labelledby', `mobileSearchBtn`);
    }
  }

  // 搜尋內容區塊設定 ARIA 標記，建立與觸發按鈕的關聯
  if (useA11y) {
    webSearch.setAttribute('id', `${id}_con`);
  }

  //  切換搜尋展開/關閉的函式
  function _toggleContent(elem) {
    const checkDisplay = window.getComputedStyle(webSearch).display === 'none';
    if (checkDisplay) {
      _showSearchBox(elem);
      if (window.innerWidth < setRWDWidth) body.classList.add('noscroll');
    } else {
      _hideSearchBox(elem);
      body.classList.remove('noscroll');
    }
  }

  function _showSearchBox(elem) {
    if (useA11y) {
      elem?.setAttribute('aria-expanded', 'true');
      elem?.setAttribute('aria-pressed', 'true');
    }
    elem?.classList.add('active');
    webSearch.classList.add('active');
    // 清空搜尋區塊內第一個可編輯項目的值（例如輸入框）
    setTimeout(() => {
      if (webSearchAllTarget[0]) webSearchAllTarget[0].value = '';
      if (webSearchAllTarget[0]) webSearchAllTarget[0].focus();
    });
    _jsSlideDown(webSearch);
    window.innerWidth < setRWDWidth ? _jsFadeIn(overlay) : null;
  }

  function _hideSearchBox(elem, overLayFn = true) {
    if (!elem) return;
    if (useA11y) {
      elem.setAttribute('aria-expanded', 'false');
      elem.setAttribute('aria-pressed', 'false');
    }
    elem.classList.remove('active');
    webSearch.classList.remove('active');
    _jsSlideUp(webSearch);

    if (overLayFn) {
      _jsFadeOut(overlay);
      setTimeout(() => {
        elem.focus();
      });
    }
  }

  // 鍵盤事件設定，支援 Tab、Enter、Alt+S 快捷鍵以及 Escape 關閉
  body.addEventListener('keydown', (e) => {
    const isSearchBtn = e.target === webSearchBtn || e.target === mobileSearchBtn;
    const searchBtn = window.innerWidth >= setRWDWidth ? webSearchBtn : mobileSearchBtn;
    const lastTarget = [...webSearchAllTarget].at(-1);

    // Tab
    if (e.code === 'Tab') {
      if (e.target === lastTarget && searchBtn) {
        _toggleContent(searchBtn);
      }
      // Alt+S
    } else if (e.altKey && e.code === 'KeyS') {
      _toggleContent(searchBtn);

      // Escape
    } else if (e.code === 'Escape') {
      if (webSearch.classList.contains('active')) {
        if (window.innerWidth >= setRWDWidth && webSearchBtn) {
          _toggleContent(webSearchBtn);
        } else if (window.innerWidth < setRWDWidth && mobileSearchBtn) {
          _toggleContent(mobileSearchBtn);
        }
        _jsFadeOut(overlay);
      }
    }
  });

  // 點擊其他地方時關閉搜尋面板
  body.addEventListener('click', (e) => {
    const isInsideSearch = _jsParents(e.target, webSearch).length === 0;

    searchTargetSelect.forEach((item) => {
      if (item.classList.contains('active') && e.target !== item && isInsideSearch && webSearchBtn !== null) {
        if (useA11y) {
          item.setAttribute('aria-expanded', 'false');
          item.setAttribute('aria-pressed', 'false');
        }
        item.classList.remove('active');
        _jsSlideUp(webSearch);
        _jsFadeOut(overlay);
      }
    });
  });
  overlay.addEventListener('click', () => {
    const searchBtn = window.innerWidth >= setRWDWidth ? webSearchBtn : mobileSearchBtn;
    _hideSearchBox(searchBtn, false);
  });
  const mobileMainMenuBtn = document.querySelector('#mobileMainMenuBtn');
  if (!mobileMainMenuBtn) return;
  mobileMainMenuBtn.addEventListener('click', () => _hideSearchBox(mobileSearchBtn, false));
}
window.addEventListener('load', () => webSearch());

// -----------------------------------------------------------------------
// -----  sideNav   ------------------------------------------------------
// -----------------------------------------------------------------------
function sideNav(options) {
  // RWD切換判斷，與_variable.scss 的 --RWDWidth連動
  const setRWDWidth = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--RWDWidth'));
  const body = document.body;
  const { target, showDefault = true, needLink = false, duration = 200, float = true } = options;
  const sideNav = document.querySelector(target);
  if (!sideNav) return;

  float ? sideNav.classList.add('typeA') : sideNav.classList.add('typeB');

  const nextOpen = sideNav.dataset.nextOpen;
  const nextClose = sideNav.dataset.nextClose;

  const sideMenu = sideNav.querySelector('nav#sideMenu');
  if (!sideMenu) return;
  const sideMenuContent = sideMenu.querySelector('.sideMenuContent');
  if (!sideMenuContent) return;
  sideMenu.dataset.width = parseInt(getComputedStyle(sideMenuContent).width.replace('px', ''), 10);
  const sideNavBtn = sideNav.querySelector('#sideNavBtn');
  if (!sideNavBtn) return;
  const allTarget = sideNav.querySelectorAll('a, button, input, select');

  // 設定無障礙屬性
  if (useA11y) {
    // 按鈕
    sideNavBtn.setAttribute('aria-haspopup', 'true');
    sideNavBtn.setAttribute('aria-controls', 'sideMenu');
    // 選單
    sideMenu.setAttribute('aria-labelledby', 'sideNavBtn');
    sideMenu.setAttribute('role', 'navigation');
  }

  // 統一設定過渡效果
  function _jsSlideToggleWidth(element, time = 200) {
    let ele = window.getComputedStyle(element);
    let display = ele.display;
    let speed = time;
    element.style.display = display;
    if (display === 'none') {
      if (useA11y) {
        sideNavBtn.setAttribute('aria-expanded', 'true');
      }
      element.style.display = 'block';
      let totalWidth = element.offsetWidth;
      element.style.overflow = 'hidden';
      element.style.width = '0px';
      element.style.transitionProperty = 'width';
      element.style.transitionDuration = `${speed}ms`;
      setTimeout(() => {
        element.style.width = `${totalWidth}px`;
      }, 0);
      setTimeout(() => {
        element.style.removeProperty('width');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
      }, speed);
    } else {
      if (useA11y) {
        sideNavBtn.setAttribute('aria-expanded', 'false');
      }
      let totalWidth2 = element.offsetWidth;
      element.style.overflow = 'hidden';
      element.style.width = `${totalWidth2}px`;
      element.style.transitionProperty = 'width';
      element.style.transitionDuration = `${speed}ms`;
      setTimeout(() => {
        element.style.width = `0px`;
      }, 0);
      setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('width');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
      }, speed);
    }
  }
  function _transitionToggle() {
    sideNavBtn.classList.toggle('active');
    if ((window.innerWidth <= setRWDWidth && float) || window.innerWidth > setRWDWidth) {
      _jsSlideToggleWidth(sideMenu, 200);
    } else if (window.innerWidth <= setRWDWidth && !float) {
      _jsSlideToggle(sideMenu);
    }
  }
  if (sideNavBtn) {
    sideNavBtn.addEventListener('click', () => {
      _transitionToggle();
    });
  }

  // 預設開啟/關閉
  if (showDefault) {
    // 按鈕
    if (useA11y) {
      sideNavBtn.setAttribute('aria-expanded', 'true');
    }
    sideNavBtn.classList.add('active');
    // 選單
    sideMenu.style.display = 'block';
  } else {
    // 按鈕
    if (useA11y) {
      sideNavBtn.setAttribute('aria-expanded', 'false');
      sideNavBtn.setAttribute('aria-controls', 'sideMenu');
    }
    // 選單
    sideNavBtn.classList.remove('active');
    sideMenu.style.display = 'none';
  }

  // 為含下層選單的 li 加上 hasChild 類別
  sideMenu.querySelectorAll('li ul').forEach((item) => item.parentNode.classList.add('hasChild'));

  // 設定所有含子選單項目的無障礙與點擊處理
  sideMenu.querySelectorAll('.hasChild').forEach((item) => {
    const uid = `sn_${_randomLetter(3)}${_randomNumber(3)}`;
    let childControl;
    if (!needLink) {
      childControl = item.querySelector('a');
      if (useA11y) {
        childControl.setAttribute('role', 'button');
      }
    } else {
      item.classList.add('needLink');
      const nextBtn = document.createElement('button');
      nextBtn.classList.add('nextLvl');
      item.querySelector('a').insertAdjacentElement('afterend', nextBtn);
      nextBtn.setAttribute('type', 'button');
      if (useA11y) {
        nextBtn.setAttribute('aria-label', nextOpen);
      }
      childControl = nextBtn;
    }
    const childUl = item.querySelector('ul');
    if (useA11y) {
      childControl.setAttribute('aria-expanded', 'false');
      childControl.setAttribute('aria-haspopup', 'true');
      childControl.setAttribute('id', uid);
      childControl.setAttribute('aria-controls', `${uid}_con`);
      childUl.setAttribute('id', `${uid}_con`);
      childUl.setAttribute('aria-labelledby', uid);
    }
    childControl.addEventListener('click', (e) => {
      e.preventDefault();
      _toggleAccordion(childControl, 'ul', item);
    });
  });

  // 手風琴切換函式
  function _toggleAccordion(control, selector, parent) {
    const content = control.parentNode.querySelector(selector);
    const isVisible = getComputedStyle(content).display !== 'none';
    if (useA11y) {
      control.setAttribute('aria-expanded', isVisible ? 'false' : 'true');
    }
    parent.classList.toggle('active');
    _jsSlideToggle(content);
    if (needLink && useA11y) {
      control.setAttribute('aria-label', isVisible ? nextOpen : nextClose);
    }
    // 收合同層其他項目
    const sibling = [...control.parentNode.parentNode.children].filter((item) => item !== parent);

    sibling.forEach((item) => {
      item.querySelector(selector) !== null ? _jsSlideUp(item.querySelector(selector)) : null;
      if (useA11y) {
        if (needLink) {
          item.querySelector('button')?.setAttribute('aria-expanded', 'false');
          item.querySelector('button')?.setAttribute('aria-label', nextOpen);
        } else {
          item.querySelector('a').setAttribute('aria-expanded', 'false');
        }
      }
      item.classList.remove('active');
    });
  }

  let checkRwd = window.innerWidth < setRWDWidth;
  // 鍵盤無障礙設定（僅限 RWD 狀態下有效）
  body.addEventListener('keydown', (e) => {
    if (checkRwd && sideNavBtn.classList.contains('active')) {
      const focusable = [...allTarget].filter((item) => item.getBoundingClientRect().height !== 0);
      const lastFocusable = focusable.at(-1);
      if (e.code === 'Tab') {
        if (e.shiftKey && e.target === allTarget[0]) {
          e.preventDefault();
          lastFocusable.focus();
        } else if (!e.shiftKey && e.target === lastFocusable) {
          e.preventDefault();
          sideNavBtn.focus();
        }
      } else if (e.code === 'Escape') {
        e.preventDefault();
        if (sideNavBtn.classList.contains('active')) {
          _transitionToggle();
        }
      }
    }
  });

  // 視窗載入與重置事件：調整響應式設定
  const _checkRwdFn = () => {
    if (window.innerWidth <= setRWDWidth) {
      checkRwd = true;
      sideNavBtn.classList.remove('active');
      if (useA11y) {
        sideNavBtn.setAttribute('aria-expanded', 'false');
      }
      if (float) {
        sideNavBtn.style.left = '';
        sideMenu.removeAttribute('style');
      } else {
        _jsSlideUp(sideMenu);
      }
    } else if (window.innerWidth > setRWDWidth && checkRwd === true) {
      checkRwd = false;
      sideNavBtn.classList.add('active');
      sideMenu.removeAttribute('style');
      if (useA11y) {
        sideNavBtn.setAttribute('aria-expanded', 'true');
      }
      if (!float) {
        _jsSlideDown(sideMenu);
      }
    }
  };
  _checkRwdFn();
  window.addEventListener('resize', () => _checkRwdFn());
}

// -----------------------------------------------------------------------
// -----  Tab   ------------------------------------------------------
// -----------------------------------------------------------------------

function tabFunction(obj) {
  // RWD切換判斷，與_variable.scss 的 --RWDWidth連動
  const setRWDWidth = parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--RWDWidth'));
  const { target, autoClose = true, openContent = false, modeSwitch = false, windowWidth = setRWDWidth, openSwitch = true } = obj;

  const tabSet = document.querySelector(target);
  if (!tabSet) return;

  const tabItems = tabSet.querySelector('.tabItems');
  const tabBtn = tabSet.querySelectorAll('.tabBtn');
  const tabContent = tabSet.querySelectorAll('.tabContent');
  const tabContentIn = tabSet.querySelectorAll('.tabContentIn');
  const defaultIndex = [...tabBtn].indexOf(tabItems.querySelector('.active')) === -1 ? 0 : [...tabBtn].indexOf(tabItems.querySelector('.active'));

  //初始設定
  function _tabInit(targetIndex) {
    if (useA11y) {
      tabItems.setAttribute('role', 'tablist');
    }

    tabBtn.forEach((tab, i) => {
      const id = `tab_${_randomLetter(3)}${_randomNumber(3)}`;
      const controls = `${id}_con`;
      if (useA11y) {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('id', id);
        tab.setAttribute('aria-controls', controls);
        tab.setAttribute('aria-selected', 'false');
        tab.setAttribute('aria-expanded', 'false');
        if (tabContent[i] === undefined) {
          console.error(`tab功能: ${obj.target}內容數量與按鈕數量不符`);
        } else {
          _setAttributeFn(tabContent[i], 'tabpanel', controls, id);
        }
      }
      tab.setAttribute('tabindex', '-1');

      //模式切換-新增按鈕
      if (modeSwitch) {
        const mobileTabBtn = _createMobileTabBtn(id, controls, tab.textContent);
        tabContent[i].insertAdjacentElement('afterbegin', mobileTabBtn);
      }
    });

    _checkTarget(targetIndex);
    tabSet.dataset.nowIndex = targetIndex;
  }

  // 創建移動版選項按鈕
  function _createMobileTabBtn(id, controls, textContent) {
    const mobileTabBtn = document.createElement('button');
    mobileTabBtn.classList.add('mobileTabBtn');
    mobileTabBtn.setAttribute('type', 'button');
    if (useA11y) {
      mobileTabBtn.setAttribute('id', id);
      mobileTabBtn.setAttribute('aria-controls', controls);
      mobileTabBtn.setAttribute('aria-expanded', 'false');
    }
    mobileTabBtn.insertAdjacentHTML('afterbegin', textContent);
    return mobileTabBtn;
  }

  //執行
  _tabInit(defaultIndex);

  //切換動作
  function _checkTarget(targetIndex) {
    tabSet.dataset.nowIndex = targetIndex;

    //點選的按鈕增加active
    tabBtn[targetIndex].classList.add('active');
    if (useA11y) {
      tabBtn[targetIndex].setAttribute('aria-selected', 'true');
      tabBtn[targetIndex].setAttribute('aria-expanded', 'true');
    }
    tabBtn[targetIndex].setAttribute('tabindex', '0');

    //移除其他按鈕的active
    const siblingsBtn = [...tabBtn].filter((value) => value !== tabBtn[targetIndex]);
    siblingsBtn.forEach((value) => {
      value.classList.remove('active');
      if (useA11y) {
        value.setAttribute('aria-selected', 'false');
        value.setAttribute('aria-expanded', 'false');
      }
      value.setAttribute('tabindex', '-1');
    });

    //內容增加active
    tabContent[targetIndex].removeAttribute('style');

    //移除其他內容的active
    const siblingsPanel = [...tabContent].filter((value) => value !== tabContent[targetIndex]);
    siblingsPanel.forEach((value) => {
      value.style.display = 'none';
    });
  }

  // 是否可開合/切換
  if (openSwitch) {
    // 使用事件委派，將監聽器綁定到 tabSet 上
    tabSet.addEventListener('click', (e) => {
      const target = e.target;
      if (target.classList.contains('tabBtn')) {
        const index = [...tabBtn].indexOf(target);
        _checkTarget(index);
      } else if (modeSwitch && target.classList.contains('mobileTabBtn')) {
        const mobileTabBtn = tabSet.querySelectorAll('.mobileTabBtn');
        const index = [...mobileTabBtn].indexOf(target);
        _mobileTabFn(target, index, mobileTabBtn);
      }
    });

    tabSet.addEventListener('keydown', (e) => {
      if (!e.target.classList.contains('tabBtn')) return;
      let index;
      // 左右操作tab
      if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        const currentIndex = [...tabBtn].indexOf(e.target);
        if (e.code === 'ArrowRight') {
          index = (currentIndex + 1) % tabBtn.length;
        } else {
          index = (currentIndex - 1 + tabBtn.length) % tabBtn.length;
        }
        tabBtn[index].focus();
        _checkTarget(index);
      }
    });
  }

  function _mobileTabFn(btn, i, mobileTabBtn) {
    _jsSlideToggle(tabContentIn[i]);
    tabSet.dataset.nowIndex = i;
    if (useA11y) {
      let check = btn.classList.contains('active') ? false : true;
      btn.setAttribute('aria-expanded', check);
    }
    btn.classList.toggle('active');

    if (!autoClose) return;
    const siblingsMobileTabBtn = [...mobileTabBtn].filter((value) => value !== mobileTabBtn[i]);
    siblingsMobileTabBtn.forEach((value) => {
      value.classList.remove('active');
      if (useA11y) {
        value.setAttribute('aria-expanded', 'false');
      }
    });
    const siblingsPanel = [...tabContentIn].filter((value) => value !== tabContentIn[i]);
    siblingsPanel.forEach((value) => {
      _jsSlideUp(value);
    });
    setTimeout(() => {
      let btnClientRect = btn.getBoundingClientRect();
      if (btnClientRect.y < 0) {
        window.scrollTo({
          top: window.scrollY + btnClientRect.y - btnClientRect.height - 20,
          behavior: 'smooth',
        });
      }
    }, 200);
  }

  function _removeAttributeFn(item) {
    item.removeAttribute('role');
    item.removeAttribute('aria-labelledby');
    item.removeAttribute('id');
  }
  function _setAttributeFn(item, role, id, labelledby) {
    item.setAttribute('role', role);
    item.setAttribute('id', id);
    item.setAttribute('aria-labelledby', labelledby);
  }
  //模式切換-RWD
  function _checkRWD() {
    const tabpanelBtn = tabSet.querySelectorAll('.tabContent .mobileTabBtn');
    const nowOpen = tabSet.dataset.nowIndex;

    // 電腦版
    tabBtn[nowOpen].classList.add('active');
    tabBtn[nowOpen].setAttribute('aria-selected', 'true');
    tabBtn[nowOpen].setAttribute('aria-expanded', 'true');
    tabBtn[nowOpen].setAttribute('tabindex', '0');
    const tabListSiblingsPanelBtn = [...tabBtn].filter((value) => value !== tabBtn[nowOpen]);
    tabListSiblingsPanelBtn.forEach((value) => {
      value.classList.remove('active');
      value.setAttribute('aria-expanded', 'false');
      value.setAttribute('aria-selected', 'false');
      value.setAttribute('tabindex', '-1');
    });

    // 手機版
    tabpanelBtn[nowOpen]?.classList.add('active');
    tabpanelBtn[nowOpen]?.setAttribute('aria-expanded', 'true');
    const tabSiblingsPanelBtn = [...tabpanelBtn].filter((value) => value !== tabpanelBtn[nowOpen]);
    tabSiblingsPanelBtn.forEach((value) => {
      value.classList.remove('active');
      value.setAttribute('aria-expanded', 'false');
    });

    if (window.innerWidth < windowWidth && modeSwitch) {
      //隱藏上方選單
      tabItems.style.display = 'none';

      tabBtn.forEach((tab, i) => {
        const id = tabpanelBtn[i].getAttribute('id');
        const controls = tabpanelBtn[i].getAttribute('aria-controls');

        //顯示所有tab內容標籤
        tabContent[i].removeAttribute('style');
        //移除tab內容標籤
        if (useA11y) {
          _removeAttributeFn(tabContent[i]);
        }

        //顯示手風琴標籤按鈕
        tabpanelBtn[i].removeAttribute('style');
        //新增手風琴內容標籤
        if (useA11y) {
          _setAttributeFn(tabContentIn[i], 'region', controls, id);
        }
        tabContentIn[i].style.display = 'none';
      });

      if (openContent) {
        tabContentIn.forEach((value, j) => {
          value.style.display = 'block';
          tabpanelBtn[j].classList.add('active');
        });
      } else {
        //隱藏其他手風琴內容
        const siblingsPanel = [...tabContentIn].filter((value) => value !== tabContentIn[nowOpen]);
        siblingsPanel.forEach((value, t) => {
          tabpanelBtn[t].classList.remove('active');
        });
        //展開目前手風琴內容
        tabpanelBtn[nowOpen].classList.add('active');
        if (useA11y) {
          tabpanelBtn[nowOpen].setAttribute('aria-expanded', 'true');
        }
        // tabpanelBtn[nowOpen].focus();
        tabContentIn[nowOpen].removeAttribute('style');
      }
    } else if (window.innerWidth >= windowWidth && modeSwitch) {
      //增加上方選單
      tabItems.removeAttribute('style');
      if (useA11y) {
        tabItems.setAttribute('role', 'tablist');
      }

      tabBtn.forEach((tab, i) => {
        //顯示所有Tab內容
        tabContentIn[i].removeAttribute('style');
        //移除Tab內容標籤
        if (useA11y) {
          _removeAttributeFn(tabContentIn[i]);
        }
        tabContentIn[i].removeAttribute('style');

        //隱藏Tab標籤按鈕
        tabpanelBtn[i].style.display = 'none';
        //新增Tab內容標籤
        if (useA11y) {
          const id = tabpanelBtn[i].getAttribute('id');
          const controls = tabpanelBtn[i].getAttribute('aria-controls');
          _setAttributeFn(tabContent[i], 'tabpanel', controls, id);
        }
      });

      //展開目前Tab內容
      tabContent[nowOpen].removeAttribute('style');
      // tabBtn[nowOpen].focus();

      //隱藏其他Tab內容
      const siblingsPanel = [...tabContent].filter((value) => value !== tabContent[nowOpen]);
      siblingsPanel.forEach((value) => {
        value.style.display = 'none';
      });
    }
  }
  _checkRWD();
  window.addEventListener('resize', _checkRWD);
}

// tabFunction({
//   target: '.target1', // 執行目標，多組需要另外設定
//   modeSwitch: false, // 自動切換，尺寸以上tab功能，尺寸以下手風琴功能
//   openContent: false, // 展開所有內容，僅開啟模式切換時才可使用
//   width: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
//   autoClose: true, // 自動關閉其他開啟內容
//   openSwitch: true, // 是否可開合/切換
//   });

// -----------------------------------------------------------------------
// -----   Accordion設定   ------------------------------------------------
// -----------------------------------------------------------------------
function accordionFunction(obj) {
  const { target, openContent = false, openDefault = false, autoClose = true, openSwitch = true } = obj;

  const accordionSet = document.querySelector(target);
  if (!accordionSet) return;
  // console.warn('手風琴功能: accordionSet 無法抓到(請檢查Html結構)，或是沒有使用到此功能');
  // return;

  const infoOpen = accordionSet.dataset.stateOpen;
  const infoClose = accordionSet.dataset.stateClose;
  const accordionList = accordionSet.querySelectorAll('.accordionList');
  const accordionBtns = accordionSet.querySelectorAll('.accordionBtn');
  const accordionCons = accordionSet.querySelectorAll('.accordionContent');
  const defaultIndex = [...accordionList].indexOf(accordionSet.querySelector('.active')) === -1 ? 0 : [...accordionList].indexOf(accordionSet.querySelector('.active'));

  //初始設定
  function _accordionInit() {
    accordionBtns.forEach((accordion, i) => {
      const id = `accordion_${_randomLetter(3)}${_randomNumber(3)}`;
      const controls = `${id}_con`;

      // 增加展開說明文字
      let accordionStateOuter;
      let accordionState;
      if (openSwitch) {
        const accordionStateOuter = document.createElement('div');
        const accordionState = document.createElement('span');
        accordionStateOuter.classList.add('accordionState');
        accordionState.insertAdjacentHTML('afterbegin', infoOpen);
        accordionStateOuter.insertAdjacentElement('beforeend', accordionState);
        accordion.insertAdjacentElement('beforeend', accordionStateOuter);
      }

      if (useA11y) {
        //button
        accordion.setAttribute('id', id);
        accordion.setAttribute('aria-controls', controls);
        accordion.setAttribute('aria-expanded', 'false');

        //content
        accordionCons[i].setAttribute('id', controls);
        accordionCons[i].setAttribute('aria-labelledby', id);
        accordionCons[i].setAttribute('role', 'region');
      }

      if (openContent) {
        // 預設先展開所有內容
        accordion.classList.add('active');
        if (useA11y) {
          accordion.setAttribute('aria-expanded', 'true');
        }
        const stateEl = accordion.querySelector('.accordionState span');
        if (openSwitch && stateEl) stateEl.textContent = infoClose;
      } else if (!openContent) {
        if (useA11y) {
          accordion.setAttribute('aria-expanded', 'false');
        }
        accordionCons[i].style.display = 'none';
      }
    });

    if (openDefault) {
      accordionBtns[defaultIndex].parentElement.classList.add('active');
      if (useA11y) {
        accordionBtns[defaultIndex].setAttribute('aria-expanded', 'true');
      }
      _jsSlideDown(accordionCons[defaultIndex]);
      const defaultStateEl = accordionBtns[defaultIndex].querySelector('.accordionState span');
      if (openSwitch && defaultStateEl) defaultStateEl.textContent = infoClose;
    }
  }
  _accordionInit();

  function _accordionFn(btn, i) {
    const accordionState = btn.querySelector('.accordionState span');
    _jsSlideToggle(accordionCons[i]);
    accordionSet.dataset.nowIndex = i;
    const infoText = accordionState ? (accordionState.textContent === infoClose ? infoOpen : infoClose) : infoOpen;
    if (useA11y) {
      let expanded = btn.getAttribute('aria-expanded') === 'true' ? false : true;
      btn.setAttribute('aria-expanded', expanded);
    }
    if (accordionState) accordionState.textContent = infoText;
    btn.parentElement.classList.toggle('active');

    if (!autoClose) return;
    const siblingsMobileAccordionBtns = [...accordionBtns].filter((value) => value !== accordionBtns[i]);
    siblingsMobileAccordionBtns.forEach((value) => {
      value.parentElement.classList.remove('active');
      const stateSpan = value.querySelector('.accordionState span');
      if (stateSpan) stateSpan.textContent = infoOpen;
    });
    const siblingsAccordionCons = [...accordionCons].filter((value) => value !== accordionCons[i]);
    siblingsAccordionCons.forEach((value) => _jsSlideUp(value));
    setTimeout(() => {
      let btnClientRect = btn.getBoundingClientRect();
      if (btnClientRect.y < 0) {
        window.scrollTo({
          top: window.scrollY + btnClientRect.y - btnClientRect.height - 20,
          behavior: 'smooth',
        });
      }
    }, 200);
  }

  // 是否可開合/切換
  if (openSwitch) {
    accordionBtns.forEach((btn, i) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        _accordionFn(btn, i);
      });
    });
  }
}

// accordionFunction({
//   target: '.target1',
//   openContent: false, // 預設先展開所有內容，僅開啟模式切換時才可使用
//   openDefault: true,是否有預設開啟
//   openIndex: 0, // 預設開啟第幾個
//   autoClose: true, // 自動關閉其他開啟內容
//   openSwitch: true, // 是否可開合/切換
// });

// -----------------------------------------------------------------------
// -----  fatFooter   ------------------------------------------------------
// -----------------------------------------------------------------------
function fatFooter() {
  const fatFooterBtn = document.querySelector('#fatFooterBtn');

  if (!fatFooterBtn) return;

  const fatFooterCon = document.querySelectorAll('.fatFooter nav > ul > li > ul');

  if (useA11y) {
    let idArray = [];
    fatFooterCon.forEach((item, i) => {
      idArray.push(`fatFooter${i}_con`);
      item.setAttribute('id', `fatFooter${i}_con`);
      item.setAttribute('aria-labelledby', `fatFooterBtn`);
    });

    fatFooterBtn.setAttribute('aria-controls', idArray.join(' '));
    fatFooterBtn.setAttribute('aria-expanded', 'true');
  }

  fatFooterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fatFooterCon.forEach((i) => _toggleFatFooter(i, 400));
  });

  function _toggleFatFooter(element, time = 200) {
    let ele = window.getComputedStyle(element);

    let display = ele.display;
    let speed = time;
    element.style.display = display;
    if (display === 'none') {
      element.style.display = 'flex';
      let totalHeight = element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = '0px';
      element.style.transitionProperty = 'height';
      element.style.transitionDuration = `${speed}ms`;
      setTimeout(() => {
        element.style.height = `${totalHeight}px`;
      }, 0);
      setTimeout(() => {
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
      }, speed);
      if (useA11y) {
        fatFooterBtn.setAttribute('aria-expanded', 'true');
      }
      fatFooterBtn.classList.remove('active');
    } else {
      let totalHeight2 = element.offsetHeight;
      element.style.overflow = 'hidden';
      element.style.height = `${totalHeight2}px`;
      element.style.transitionProperty = 'height';
      element.style.transitionDuration = `${speed}ms`;
      setTimeout(() => {
        element.style.height = `0px`;
      }, 0);
      setTimeout(() => {
        element.style.display = 'none';
        element.style.removeProperty('height');
        element.style.removeProperty('overflow');
        element.style.removeProperty('transition-duration');
        element.style.removeProperty('transition-property');
      }, speed);
      if (useA11y) {
        fatFooterBtn.setAttribute('aria-expanded', 'false');
      }
      fatFooterBtn.classList.add('active');
    }
  }
}
window.addEventListener('load', () => fatFooter());

// -----------------------------------------------------------------------
// -----   tableList樣式 加上 data-title   -------------------------------
// -----------------------------------------------------------------------

function tableAddDataAttributes() {
  const el = document.querySelectorAll('.tableList');
  if (el.length === 0) return;
  el.forEach((i) => {
    const tableItem = i.querySelectorAll('table');
    tableItem.forEach((i) => {
      _setTrAttr(i);
      i.classList.add('loaded');
    });
  });
  function _setTrAttr(i) {
    const thList = i.querySelectorAll('th');
    const trList = i.querySelectorAll('tr');
    trList.forEach((trItem) => {
      const tdList = trItem.querySelectorAll('td');
      tdList.forEach((i, idx) => {
        tdList[idx].dataset.tdTitle = `${thList[idx].textContent}`;
      });
    });
  }
}
window.addEventListener('load', () => tableAddDataAttributes());

// -----------------------------------------------------------------------
// -----   scrollTables   ------------------------------------------------
// -----------------------------------------------------------------------

function scrollTables() {
  const el = document.querySelectorAll('.tableScroll');
  if (el.length === 0) return;

  el.forEach((elem) => {
    const table = elem.querySelector('table');
    const caption = elem.querySelector('caption');
    const prevBtn = elem.querySelector('.scrollTablePrevBtn');
    const nextBtn = elem.querySelector('.scrollTableNextBtn');
    if (!prevBtn || !nextBtn) {
      console.error('表格捲動功能: prevBtn 或 nextBtn 無法抓到，請檢查Html結構');
      return;
    }

    if (caption) {
      let captionMargin = parseInt(window.getComputedStyle(caption).marginBottom.replace('px', '')) || 0;

      prevBtn.style.top = `${caption.offsetHeight + captionMargin}px`;
      nextBtn.style.top = `${caption.offsetHeight + captionMargin}px`;
    }
    const tableScrollIn = document.createElement('div');
    tableScrollIn.className = 'tableScrollIn';
    tableScrollIn.insertAdjacentElement('afterbegin', table);
    elem.insertAdjacentElement('beforeend', tableScrollIn);

    let tableScrollLeft = tableScrollIn.scrollLeft;
    let tableClientWidth = tableScrollIn.clientWidth;
    let tableScrollWidth = tableScrollIn.scrollWidth;

    tableScrollIn.addEventListener('scroll', () => {
      _checkScroll(tableScrollLeft, tableClientWidth, tableScrollWidth);
    });

    function _checkScroll(tableScrollLeft, tableClientWidth, tableScrollWidth) {
      tableScrollLeft = tableScrollIn.scrollLeft;
      tableClientWidth = tableScrollIn.clientWidth;
      tableScrollWidth = table.scrollWidth;

      if (tableScrollLeft >= 0 && tableScrollLeft + tableClientWidth < tableScrollWidth) {
        nextBtn.style.display = 'block';
      } else {
        nextBtn.style.display = 'none';
      }
      if (tableScrollLeft > 0) {
        prevBtn.style.display = 'block';
      } else {
        prevBtn.style.display = 'none';
      }
    }

    _checkScroll(tableScrollLeft, tableClientWidth, tableScrollWidth);
    window.addEventListener('resize', () => _checkScroll(tableScrollLeft, tableClientWidth, tableScrollWidth));

    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      tableScrollIn.scrollBy({ left: -100, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      tableScrollIn.scrollBy({ left: 100, behavior: 'smooth' });
    });
  });
}
window.addEventListener('load', () => scrollTables());

// -----------------------------------------------------------------------
// -----   swiper無障礙功能   -----------------------------------
// -----------------------------------------------------------------------
function swiperA11Fn(swiper) {
  // 圓點
  let noActive = 0;
  swiper.slides.filter((elem, i) => {
    if (elem.classList.contains('swiper-slide-thumb-active')) {
      noActive = i;
    }
  });

  const swiperSlide = swiper.el.querySelectorAll('.item');
  swiperSlide.forEach((elem, idx) => {
    elem.setAttribute('role', 'button');
    elem.setAttribute('tabindex', '0');

    if (useA11y) {
      if (idx === noActive) {
        elem.setAttribute('aria-pressed', 'true');
      } else {
        elem.setAttribute('aria-pressed', 'false');
      }
    }

    if (useA11y) {
      elem.addEventListener('click', (e) => {
        elem.setAttribute('aria-pressed', 'true');
        let sibling = [...swiperSlide].filter((item) => item !== elem);
        sibling.forEach((j) => j.setAttribute('aria-pressed', 'false'));
      });
    }
  });

  // swiperAutoPlay切換功能
  const autoPlaySwitch = swiper.el.parentNode.parentNode.querySelector('.autoPlaySwitch');

  if (!autoPlaySwitch) return;
  let nowState = swiper.autoplay.running ? true : false;
  let infoPlay = autoPlaySwitch.dataset.infoPlay;
  let infoStop = autoPlaySwitch.dataset.infoStop;
  nowState ? autoPlaySwitch.classList.add('stop') : autoPlaySwitch.classList.add('play');
  if (useA11y) {
    autoPlaySwitch.setAttribute('aria-label', infoStop);
    autoPlaySwitch.setAttribute('data-altlabel', infoPlay);
  }

  autoPlaySwitch.addEventListener('click', (e) => {
    if (nowState) {
      nowState = false;
      swiper.autoplay.stop();
      autoPlaySwitch.classList.add('play');
      autoPlaySwitch.classList.remove('stop');
      if (useA11y) {
        autoPlaySwitch.setAttribute('aria-label', infoPlay);
        autoPlaySwitch.setAttribute('data-altlabel', infoStop);
      }
    } else {
      nowState = true;
      swiper.autoplay.start();
      autoPlaySwitch.classList.add('stop');
      autoPlaySwitch.classList.remove('play');
      if (useA11y) {
        autoPlaySwitch.setAttribute('aria-label', infoStop);
        autoPlaySwitch.setAttribute('data-altlabel', infoPlay);
      }
    }
  });
  swiper.slides.length === 1 ? autoPlaySwitch.remove() : null;
}

function swiperNavKeyDownFn(swiper, mainSwiper) {
  const body = document.body;
  if (!swiper) return;
  swiper.slides.forEach((elem, idx) => {
    elem.dataset.swiperSlideIndex = idx;
  });

  body.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && e.target.parentNode.dataset.swiperSlideIndex !== undefined) {
      let index = e.target.parentNode.dataset.swiperSlideIndex;
      let swiperSlide = e.target.parentNode.parentNode.querySelectorAll('.item');
      mainSwiper.slideTo(index, 1000, false);
      if (useA11y) {
        e.target.setAttribute('aria-pressed', 'true');
      }

      let sibling = [...swiperSlide].filter((item) => item !== e.target);
      if (useA11y) {
        sibling.forEach((j) => j.setAttribute('aria-pressed', 'false'));
      }
    }
  });
}

// -----------------------------------------------------------------------
// -----   表單密碼顯示設定   ------------------------------------------------
// -----------------------------------------------------------------------
function formEye() {
  const checkEye = document.querySelectorAll('.formEyes');
  if (!checkEye.length) return;
  checkEye.forEach((i) => {
    const password = i.parentNode.querySelector('input');
    const showPassword = i.dataset.show;
    const hidePassword = i.dataset.hide;
    if (useA11y) {
      i.setAttribute('aria-label', showPassword);
      i.setAttribute('aria-pressed', 'false');
    }

    i.addEventListener('click', (e) => {
      if (!i.classList.contains('active')) {
        i.classList.add('active');
        password.setAttribute('type', 'text');
        if (useA11y) {
          i.setAttribute('aria-pressed', 'true');
          i.setAttribute('aria-label', hidePassword);
        }
      } else {
        i.classList.remove('active');
        password.setAttribute('type', 'password');
        if (useA11y) {
          i.setAttribute('aria-pressed', 'false');
          i.setAttribute('aria-label', showPassword);
        }
      }
    });
  });
}
// formEye();
window.addEventListener('load', () => formEye());

// -----------------------------------------------------------------------
// -----   scroll top   ------------------------------------------------
// -----------------------------------------------------------------------

function scrollTopFn() {
  const scrollTop = document.querySelector('#scrollTop');
  const goCenter = document.querySelector('.goCenter');
  let scrollY = window.scrollY;
  if (!scrollTop) return;

  function _scrollFn() {
    scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    _scrollFn();
  });
  _scrollFn(); // 初始檢查（頁面已捲動時按鈕狀態正確）

  scrollTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    if (goCenter) goCenter.focus();
  });
}
window.addEventListener('load', () => scrollTopFn());

// -----------------------------------------------------------------------
// -----  form 檔案上傳  ---------------------------------------------------
// -----------------------------------------------------------------------
function addFile() {
  const addFileName = document.querySelectorAll('.downloadFile');
  if (addFileName.length === 0) return;

  addFileName.forEach((i) => {
    i.addEventListener('change', _pushFileName);
  });

  function _pushFileName(e) {
    let fileLen = e.target.files.length;
    const uploadInput = e.target.parentNode.querySelector('.fileName');

    let allFileName = [];
    for (let i = 0; i < fileLen; i++) {
      allFileName.push(e.target.files[i].name);
    }
    uploadInput.textContent = allFileName.join(', ');
  }
}
window.addEventListener('load', () => addFile());

// -----------------------------------------------------------------------
// -----  橫式跑馬燈   -----------------------------------------------------
// -----------------------------------------------------------------------

function marquee() {
  const marquee = document.querySelectorAll('.marqueeSliderH');
  if (marquee.length === 0) return;
  marquee.forEach((i) => {
    const marqueeBox = i.querySelector('.marqueeBox');
    const marqueeList = i.querySelector('.marqueeList');
    const autoPlaySwitch = i.querySelector('.autoPlaySwitch');
    let marqueeBoxWidth = marqueeBox.offsetWidth;
    let marqueeListWidth = marqueeList.offsetWidth;

    let isPaused = false;
    let isHover = false;
    let sliderMovePx = 0;

    window.addEventListener('resize', () => {
      marqueeBoxWidth = marqueeBox.offsetWidth;
      marqueeListWidth = marqueeList.offsetWidth;
    });

    for (let i = 0; (marqueeListWidth * i) / marqueeBoxWidth < 1; i++) {
      let cloneList = marqueeList.cloneNode(true);

      cloneList.querySelectorAll('a').forEach((value) => {
        value.setAttribute('tabindex', '-1');
      });
      marqueeList.insertAdjacentElement('afterend', cloneList);
    }
    let allList = marqueeBox.querySelectorAll('.marqueeList');
    function _marqueeMove() {
      requestAnimationFrame(_marqueeMove);
      if (isHover || isPaused) return;
      sliderMovePx++;

      if (sliderMovePx <= marqueeListWidth) {
        allList.forEach((value) => {
          value.style.transform = `translateX(-${sliderMovePx}px)`;
        });
      } else {
        sliderMovePx = 0;
      }
    }
    _marqueeMove();
    marqueeBox.addEventListener('mouseenter', () => {
      isHover = true;
    });
    marqueeBox.addEventListener('mouseleave', () => {
      isHover = false;
    });
    // autoPlay切換功能
    if (!autoPlaySwitch) return;
    let infoPlay = autoPlaySwitch.dataset.infoPlay;
    let infoStop = autoPlaySwitch.dataset.infoStop;
    autoPlaySwitch.classList.add('stop');
    if (useA11y) {
      autoPlaySwitch.setAttribute('aria-label', infoStop);
      autoPlaySwitch.setAttribute('data-altlabel', infoPlay);
    }

    marqueeBox.addEventListener('keyup', (e) => {
      if (e.code === 'Tab') {
        e.preventDefault();
        sliderMovePx = -1;
        setTimeout(() => {
          isPaused = true;
        });
        autoPlaySwitch.classList.add('play');
        autoPlaySwitch.classList.remove('stop');
        if (useA11y) {
          autoPlaySwitch.setAttribute('aria-label', infoPlay);
          autoPlaySwitch.setAttribute('data-altlabel', infoStop);
        }
      }
    });

    autoPlaySwitch.addEventListener('click', (e) => {
      if (!isPaused) {
        isPaused = true;
        autoPlaySwitch.classList.add('play');
        autoPlaySwitch.classList.remove('stop');
        if (useA11y) {
          autoPlaySwitch.setAttribute('aria-label', infoPlay);
          autoPlaySwitch.setAttribute('data-altlabel', infoStop);
        }
      } else {
        isPaused = false;
        autoPlaySwitch.classList.add('stop');
        autoPlaySwitch.classList.remove('play');
        if (useA11y) {
          autoPlaySwitch.setAttribute('aria-label', infoStop);
          autoPlaySwitch.setAttribute('data-altlabel', infoPlay);
        }
      }
    });
  });
}
window.addEventListener('load', () => marquee());

// -----------------------------------------------------------------------
// -----  無障礙快捷鍵盤組合 a11yKeyCode   ----------------------------------
// -----------------------------------------------------------------------

function a11yKeyCode() {
  const body = document.body;
  body.addEventListener('keydown', (e) => {
    switch (e.altKey && e.code) {
      case true && 'KeyU':
        const aU = document.querySelector('#aU');
        aU.focus();
        break;
      case true && 'KeyC':
        const aC = document.querySelector('#aC');
        aC.focus();
        break;
      case true && 'KeyZ':
        const aZ = document.querySelector('#aZ');
        aZ.focus();
        break;
    }
  });
}
window.addEventListener('load', () => a11yKeyCode());

// -----------------------------------------------------------------------
// -----   fancyBox新增需要綁定才有效果   -----------------------------------
// -----------------------------------------------------------------------
function popupFn() {
  const fancyBoxElem = document.querySelectorAll('[data-fancybox]');
  if (fancyBoxElem.length === 0) return;
  // 確認引入語系
  let checkLang = document.querySelectorAll('script');

  let lang;
  checkLang.forEach((elem) => {
    const path = elem.attributes.src?.value;
    if (path === undefined) return;
    const match = path?.match(/fancybox\/l10n/);
    const fancyboxPath = match ? match[0] : null;

    if (!fancyboxPath) return;
    const fileName = path?.split('/').pop();
    const locale = fileName?.split('.')[0];
    lang = locale;
  });

  function fancyBoxFn(eventName, Fancybox) {
    if (eventName === 'Carousel.ready') {
      let closeBtn = document.querySelector('[data-fancybox-close]');
      closeBtn?.insertAdjacentHTML('afterbegin', `<span>${Fancybox.l10n[lang].CLOSE}</span>`);
      closeBtn?.setAttribute('aria-label', Fancybox.l10n[lang].CLOSE);
      closeBtn?.focus();

      let popupBox = Fancybox.getSlide().el;
      let allTarget = popupBox.querySelectorAll('a,button,input,select');

      const lastElement = allTarget[allTarget.length - 1];
      popupBox.addEventListener('keydown', (e) => {
        const target = e.target;
        if (target === lastElement && e.code === 'Tab' && !e.shiftKey) {
          e.preventDefault();
          closeBtn?.focus();
        } else if (target === closeBtn && e.code === 'Tab' && e.shiftKey) {
          e.preventDefault();
          lastElement.focus();
        }
      });
    }
  }

  // 一般設定
  Fancybox.bind('[data-fancybox]', {
    l10n: Fancybox.l10n[lang],
    on: {
      '*': (fancyboxRef, eventName) => {
        // 關閉按鈕無障礙問題
        fancyBoxFn(eventName, Fancybox);
      },
    },
  });

  // 進入網頁開啟燈箱
  let showPopup = document.querySelector('.showPopup');
  if (showPopup) {
    Fancybox.show(
      [
        {
          src: `#${showPopup.getAttribute('id')}`,
          type: 'inline',
        },
      ],
      {
        l10n: Fancybox.l10n[lang],
        on: {
          '*': (fancyboxRef, eventName) => {
            // 關閉按鈕無障礙問題
            fancyBoxFn(eventName, Fancybox);
          },
        },
      }
    );
  }
}
window.addEventListener('load', () => popupFn());
