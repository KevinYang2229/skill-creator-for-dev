'use strict';
const useA11y = true;
// -----------------------------------------------------------------------
// -----  支援js時，移除no-js  ------------------------------------------------------
// -----------------------------------------------------------------------
$('html').removeClass('no-js');

// -----------------------------------------------------------------------
// -----  共用效果  ------------------------------------------------------
// -----------------------------------------------------------------------

function _toggleDropdown(elem, con, autoClose = true) {
  const $body = $('body');
  const $targetSelect = $(elem);
  const $targetSelectCon = $(con);

  if (!$targetSelectCon.length) return;
  if (!$targetSelect.length) {
    $targetSelectCon.show();
    return;
  }

  const id = `ts_${_randomLetter(3)}${_randomNumber(3)}`;

  if ($targetSelectCon.is(':hidden')) {
    if (useA11y) {
      $targetSelect.attr('aria-expanded', 'false');
    }
  } else {
    if (useA11y) {
      $targetSelect.attr('aria-expanded', 'true');
    }
    $targetSelect.addClass('active');
  }

  if (useA11y) {
    $targetSelect.attr({
      'aria-haspopup': 'true',
      'aria-controls': `${id}_con`,
      id: id,
    });

    $targetSelectCon.attr({
      id: `${id}_con`,
      'aria-labelledby': id,
    });
  }

  $targetSelect.on('click', function (e) {
    let expanded = $targetSelect.hasClass('active');
    expanded === true ? closeCon() : openCon();
  });

  function openCon() {
    if (useA11y) {
      $targetSelect.attr('aria-expanded', 'true');
    }
    $targetSelect.attr('aria-expanded', 'true').addClass('active');
    $targetSelectCon.slideDown(200);
  }

  function closeCon() {
    if (useA11y) {
      $targetSelect.attr('aria-expanded', 'false');
    }
    $targetSelect.removeClass('active');
    $targetSelectCon.slideUp(200, function () {
      $targetSelect.focus();
    });
  }

  $body.on('keydown', function (e) {
    const allTarget = $targetSelectCon.find('a, button, input, textarea, select');
    const firstTarget = allTarget.first();
    const lastTarget = allTarget.last();

    if ($targetSelect.hasClass('active')) {
      if (e.code === 'Tab') {
        if (e.target === $targetSelect[0] && e.shiftKey) {
          closeCon();
        } else if (e.target === firstTarget[0] && e.shiftKey) {
          e.preventDefault();
          $targetSelect.focus();
        } else if (e.target === lastTarget[0] && !e.shiftKey) {
          e.preventDefault();
          closeCon();
        }
      } else if (e.code === 'Escape') {
        closeCon();
      }
    }
  });

  if (autoClose) {
    $body.on('click', function (e) {
      if ($targetSelect.hasClass('active') && !$(e.target).is($targetSelect) && !$(e.target).closest($targetSelectCon).length) {
        closeCon();
      }
    });
  }

  $(window).on('resize', function (e) {
    if ($targetSelectCon.is(':visible')) {
      closeCon();
    }
  });
}

// 亂數數字
function _randomNumber(max) {
  let letter = '1234567890';
  let number = '';
  for (let i = 0; i < max; i++) {
    number += letter.charAt(Math.floor(Math.random() * letter.length));
  }
  return number;
}

// 亂數英文字
function _randomLetter(max) {
  let letter = 'abcdefghijklmnopqrstuvwxyz';
  let text = '';
  for (let i = 0; i < max; i++) {
    text += letter.charAt(Math.floor(Math.random() * letter.length));
  }
  return text;
}

// 改變標籤
function _changeTag(oldTag, newTag) {
  const $oldTag = $(oldTag);
  if (!$oldTag.length) return;

  const $newTagElem = $(`<${newTag}>`);

  // 複製所有屬性
  $.each($oldTag[0].attributes, function () {
    $newTagElem.attr(this.name, this.value);
  });

  // 增加所有子節點
  $newTagElem.html($oldTag.html());

  // 使用 replaceWith 替換舊標籤
  $oldTag.replaceWith($newTagElem);
  return $newTagElem;
}

// -----------------------------------------------------------------------
// -----  FontSize   -----------------------------------------------------
// -----------------------------------------------------------------------
function FontSize() {
  const $body = $('body');

  function _updateView($buttons, $target, activeClassName) {
    const sizeClasses = ['smallSize', 'mediumSize', 'largeSize'];

    $buttons.each(function () {
      const isTargetButton = $(this).hasClass(activeClassName);
      $(this).parent().toggleClass('active', isTargetButton);
      if (useA11y) {
        $(this).attr('aria-pressed', isTargetButton);
      }
    });

    $target.removeClass(sizeClasses.join(' ')).addClass(activeClassName);
  }

  function _createCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }

  function _readCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  function _setupFontSizeToggle(container, cookieName, target) {
    const $container = $(container);
    const $target = $(target);
    if (!$container.length || !$target.length) return;

    const $buttons = $container.find('ul button');
    const $buttonContainer = $container.find('ul');
    const sizeClasses = ['smallSize', 'mediumSize', 'largeSize'];

    if (!$buttonContainer.length || !$buttons.length) return;

    $buttonContainer.on('click', 'button', function (e) {
      const $button = $(this);
      const selectedSize = sizeClasses.find((cls) => $button.hasClass(cls));
      if (selectedSize) {
        _createCookie(cookieName, selectedSize, 365);
        _updateView($buttons, $target, selectedSize);
      }
    });

    const cookieValue = _readCookie(cookieName);
    const initialSize = sizeClasses.includes(cookieValue) ? cookieValue : 'smallSize';
    if (!cookieValue) _createCookie(cookieName, initialSize, 365);
    _updateView($buttons, $target, initialSize);
  }

  const $fontSizeHeader = $('header .fontSize');
  if ($fontSizeHeader.length) _setupFontSizeToggle($fontSizeHeader, 'FontSize', $body);

  const $fontSizeInner = $('.fontSizeInner');
  const $mainContent = $('.mainContentBox .mainContent');
  if ($fontSizeInner.length && $mainContent.length) _setupFontSizeToggle($fontSizeInner, 'FontSizeInner', $mainContent);
}
FontSize();

// -----------------------------------------------------------------------
// -----  menu   ------------------------------------------------------
// -----------------------------------------------------------------------
function mainMenu(obj) {
  const setRWDWidth = parseInt($(':root').css('--RWDWidth'));
  let $overlay = $('.overlay');
  if (!$overlay.length) {
    $overlay = $('<div class="overlay"></div>').prependTo('body');
  }

  const $body = $('body');
  const $header = $('header');
  const $headTop = $('.headTop');
  const { sticky = true, needLink = false, mega = false } = obj;
  const $mainMenu = $('.mainMenu');

  const $menu = $mainMenu.find('nav');

  $menu.find('li ul').parent().addClass('hasChild');
  const $hasChild = $menu.find('.hasChild');

  function _checkBorder(e) {
    if (mega) return;
    const $target = $(e);
    const $nextUl = $target.find('ul');
    const $hasChildLi = $nextUl.last().parents('li');

    if ($hasChildLi.length <= 1) return;

    const checkUlWidth = $hasChildLi.last().outerWidth() * $hasChildLi.length - 1 || 0;
    const objectRect = $hasChildLi.last()[0].getBoundingClientRect();

    if ($(window).width() < objectRect.left + checkUlWidth) {
      $hasChildLi.last().addClass('leftSlider');
    } else {
      $hasChildLi.last().removeClass('leftSlider');
    }
  }

  function _handleMouseenter(e) {
    const $target = $(e.currentTarget);
    $target.addClass('active');
    _checkBorder($target);
    if (useA11y) {
      $target.children('a').attr('aria-expanded', 'true');
    }
  }

  function _handleMouseleave(e) {
    const $target = $(e.currentTarget);
    $target.removeClass('active');
    $target.children('ul').css('top', '');
    if (useA11y) {
      $target.children('a').attr('aria-expanded', 'false');
    }
  }

  function _toggleAccordion(item, con) {
    const $item = $(item);
    const $content = $item.parent().find(con);
    if (useA11y) {
      $item.toggleClass('active').attr('aria-expanded', $item.hasClass('active'));
    }
    $content.slideToggle(200);

    $item
      .parent()
      .siblings()
      .each(function () {
        const $siblingContent = $(this).find(con);
        if ($siblingContent.length) {
          $siblingContent.slideUp(200);
          $(this).find(item[0].nodeName.toLowerCase()).removeClass('active');
          if (useA11y) {
            $(this).find(item[0].nodeName.toLowerCase()).attr('aria-expanded', 'false');
          }
        }
      });
  }

  function _initDesktopMenu() {
    if (mega) {
      $menu.addClass('megaMenu').removeClass('menu');
      if (useA11y) {
        $menu.find('ul ul .hasChild > a').removeAttr('aria-haspopup');
      }
    }

    if (sticky) {
      const menuHeight = $mainMenu.outerHeight();
      const headerMargin = parseInt($header.css('marginBottom'));
      function stickyHeader() {
        if ($(window).width() > setRWDWidth) {
          if ($headTop.outerHeight() < $(window).scrollTop()) {
            $header.addClass('sticky');
            $headTop.css('marginBottom', headerMargin + menuHeight);
          } else {
            $header.removeClass('sticky');
            $headTop.css('marginBottom', headerMargin);
          }
        } else {
          $headTop.removeAttr('style');
        }
      }
      $(window).on('scroll', stickyHeader);
      $(window).on('resize', stickyHeader);
      $(window).on('load', stickyHeader);
    }

    $menu.on('mouseenter', '.hasChild', _handleMouseenter);
    $menu.on('mouseleave', '.hasChild', _handleMouseleave);

    $menu.on('keydown', 'a,button', function (e) {
      if ($(window).width() <= setRWDWidth) return;
      const $this = $(this);
      const $parentLi = $this.parent('li');
      const isHasSubmenu = $parentLi.hasClass('hasChild');
      const $lastTarget = $this.parents('.hasChild').last();

      _checkBorder($parentLi);

      if (e.code === 'Tab' && !e.shiftKey) {
        if (isHasSubmenu) {
          if (useA11y) {
            $parentLi.children('a').attr('aria-expanded', 'true');
          }
          $parentLi.addClass('active');
        }
        if (useA11y) {
          $parentLi.siblings().find('.hasChild > a').attr('aria-expanded', 'false');
        }
        $parentLi.siblings().removeClass('active').find('.hasChild > a');

        if ($this.is($lastTarget)) {
          $this.parents('li').removeClass('active');
        }
      } else if (e.code === 'Tab' && e.shiftKey) {
        if (isHasSubmenu) {
          if (useA11y) {
            $parentLi.children('a').attr('aria-expanded', 'false');
          }
          $parentLi.removeClass('active').children('a');
        }
      }
    });

    $hasChild.each(function () {
      const id = `menu_${_randomLetter(3)}${_randomNumber(3)}`;
      const $childA = $(this).children('a');
      const $childUl = $(this).children('ul');
      if (useA11y) {
        $childA.attr({
          'aria-expanded': 'false',
          'aria-haspopup': 'true',
          id: id,
          'aria-controls': `${id}_con`,
        });
        $childUl.attr({
          id: `${id}_con`,
          'aria-labelledby': id,
        });
      }
    });
  }
  _initDesktopMenu();

  function _initMobileMenu() {
    const $mobileMenu = $('<nav id="mobileMenu" aria-labelledby="mobileMainMenuBtn"></nav>');
    const $mobileMainMenuBox = $('<div class="mobileMainMenuBox"></div>');
    const $mainMenuClone = $menu.clone().removeClass('mainMenu menu megaMenu').addClass('mobileMainMenu');

    const $topNav = $('.topNav');
    if ($topNav.length) {
      const $topNavClone = $topNav.clone();
      $topNavClone.find('.fontSize, .topSearch, #aU').remove();
      $mobileMainMenuBox.append(_changeTag($topNavClone, 'div'));
    }

    $mobileMainMenuBox.prepend($mainMenuClone);
    $mobileMenu.append($mobileMainMenuBox);
    $header.before($mobileMenu);
    _changeTag($mainMenuClone, 'div');

    const $mobileMainMenuBtn = $('#mobileMainMenuBtn');
    if (useA11y) {
      $mobileMainMenuBtn.attr({
        'aria-controls': 'mobileMenu',
        'aria-expanded': 'false',
        'aria-pressed': 'false',
        'aria-haspopup': 'true',
      });
    }

    function _showSidebar() {
      $mobileMenu.css({ opacity: '1', display: 'block' });
      if (useA11y) {
        $mobileMainMenuBtn.attr({ 'aria-expanded': 'true', 'aria-pressed': 'true' });
      }
      $mobileMainMenuBtn.addClass('active');
      setTimeout(() => {
        $mobileMenu.css('transform', 'translateX(0px)').addClass('open');
      }, 0);
      if ($(window).width() < setRWDWidth) $body.addClass('noscroll');
      $overlay.fadeIn().css('z-index', '90');
    }

    function _hideSidebar(overlayFN = true) {
      $mobileMenu.css('transform', 'translateX(-100%)');
      if (useA11y) {
        $mobileMainMenuBtn.attr({ 'aria-expanded': 'false', 'aria-pressed': 'false' });
      }
      $mobileMainMenuBtn.removeClass('active');
      setTimeout(() => {
        $mobileMenu.removeAttr('style');
      }, 300);
      $mobileMenu.removeClass('open');
      $body.removeClass('noscroll');
      $overlay.css('z-index', '');
      if (overlayFN) $overlay.fadeOut();
    }

    $mobileMainMenuBtn.on('click', function (e) {
      e.preventDefault();
      if ($mobileMainMenuBtn.hasClass('active')) {
        _hideSidebar();
      } else {
        _showSidebar();
      }
      $(this).focus();
    });

    $overlay.on('click', () => _hideSidebar());

    $mobileMenu.on('click', function (e) {
      const $target = $(e.target);
      const $hasChildLi = $target.closest('.hasChild');

      if ($hasChildLi.length) {
        let $childControl;
        if (!needLink) {
          $childControl = $hasChildLi.children('a');
          if ($target.is($childControl)) {
            e.preventDefault();
            _toggleAccordion($childControl, 'ul');
          }
        } else {
          $childControl = $hasChildLi.children('.nextLvl');
          if ($target.is($childControl)) {
            _toggleAccordion($childControl, 'ul');
          }
        }
      }
    });

    const $mobileMenuLiHasChild = $mobileMenu.find('li.hasChild');
    $mobileMenuLiHasChild.each(function () {
      let $childControl;
      if (!needLink) {
        if (useA11y) {
          $childControl = $(this).children('a').attr('role', 'button');
        }
      } else {
        $(this).addClass('needLink');
        const $nextA = $(this).children('a');
        const $nextBtn = $('<button class="nextLvl"></button>');
        $nextA.after($nextBtn);
        if (useA11y) {
          $nextBtn.attr('id', $nextA.attr('id'));
        }
        $childControl = $nextBtn;
      }

      const id = `mobileMenu_${_randomLetter(3)}${_randomNumber(3)}`;
      const $childUl = $(this).children('ul');
      if (useA11y) {
        $childControl.attr({
          'aria-expanded': 'false',
          'aria-haspopup': 'true',
          id: id,
          'aria-controls': `${id}_con`,
        });
        $childUl.attr({
          id: `${id}_con`,
          'aria-labelledby': id,
        });
      }
    });

    const $allMobileMenuTarget = $mobileMenu.find('a,button,input,select');
    $body.on('keydown', function (e) {
      if (e.code === 'Escape' && $mobileMainMenuBtn.hasClass('active')) {
        _hideSidebar();
      } else if (e.code === 'Tab' && !e.shiftKey && e.target === $mobileMainMenuBtn[0] && $mobileMainMenuBtn.hasClass('active')) {
        e.preventDefault();
        $allMobileMenuTarget.first().focus();
      } else if (e.code === 'Tab' && e.shiftKey && e.target === $allMobileMenuTarget.first()[0]) {
        e.preventDefault();
        $mobileMainMenuBtn.focus();
      }
    });

    $(window).on('resize', function () {
      if ($(window).width() <= setRWDWidth) {
        $headTop.removeAttr('style');
      } else {
        $body.removeClass('noscroll');
        _hideSidebar();
      }
    });

    const $mobileSearchBtn = $('#mobileSearchBtn');
    if (!$mobileSearchBtn.length) return;
    $mobileSearchBtn.on('click', () => _hideSidebar(false));
  }
  _initMobileMenu();
}

// -----------------------------------------------------------------------
// -----  search   ------------------------------------------------------
// -----------------------------------------------------------------------
function webSearch() {
  const setRWDWidth = parseInt($(':root').css('--RWDWidth'));
  let $overlay = $('.overlay');
  if (!$overlay.length) {
    $overlay = $('<div class="overlay"></div>').prependTo('body');
  }

  const $body = $('body');
  const $webSearch = $('.webSearch');
  if (!$webSearch.length) return;

  const $mobileSearchBtn = $('#mobileSearchBtn');
  const $webSearchBtn = $('#topSearchBtn');
  const $searchTargetSelect = $('#topSearchBtn, #mobileSearchBtn');
  const $webSearchAllTarget = $webSearch.find('a, button, input, select, textarea');
  const id = `ws_${_randomLetter(3)}${_randomNumber(3)}`;

  if ($webSearchBtn.length) {
    if (useA11y) {
      $webSearchBtn.attr({
        'aria-controls': `${id}_con`,
        'aria-expanded': 'false',
        'aria-pressed': 'false',
        'aria-haspopup': 'true',
      });
    }
    $webSearchBtn.on('click', () => _toggleContent($webSearchBtn));
  }

  if ($mobileSearchBtn.length) {
    if (useA11y) {
      $mobileSearchBtn.attr({
        'aria-controls': `${id}_con`,
        'aria-expanded': 'false',
        'aria-pressed': 'false',
        'aria-haspopup': 'true',
      });
      $webSearch.attr({
        id: `${id}_con`,
        'aria-labelledby': 'topSearchBtn mobileSearchBtn',
      });
    }
    $mobileSearchBtn.on('click', () => _toggleContent($mobileSearchBtn));

    $(window).on('resize', function () {
      if ($(window).width() > setRWDWidth) $webSearch.removeAttr('style');
    });
  } else {
    if (useA11y) {
      $webSearch.attr({
        id: `${id}_con`,
        'aria-labelledby': 'mobileSearchBtn',
      });
    }
  }

  function _toggleContent(elem) {
    const $elem = $(elem);
    if ($webSearch.is(':hidden')) {
      _showSearchBox($elem);
      if ($(window).width() < setRWDWidth) $body.addClass('noscroll');
    } else {
      _hideSearchBox($elem);
      $body.removeClass('noscroll');
    }
  }

  function _showSearchBox(elem) {
    const $elem = $(elem);
    if (useA11y) {
      $elem.attr({ 'aria-expanded': 'true', 'aria-pressed': 'true' });
    }
    $elem.addClass('active');
    setTimeout(() => {
      if ($webSearchAllTarget.first().length) {
        $webSearchAllTarget.first().val('').focus();
      }
    });
    $webSearch.slideDown(200);
    if ($(window).width() < setRWDWidth) $overlay.fadeIn();
  }

  function _hideSearchBox(elem, overLayFn = true) {
    const $elem = $(elem);
    if (useA11y) {
      $elem.attr({ 'aria-expanded': 'false', 'aria-pressed': 'false' });
    }
    $elem.removeClass('active');
    $webSearch.slideUp(200);

    if (overLayFn) {
      $overlay.fadeOut(200, () => {
        $elem.focus();
      });
    }
  }

  $body.on('keydown', function (e) {
    const isSearchBtn = $(e.target).is($webSearchBtn) || $(e.target).is($mobileSearchBtn);
    const $searchBtn = $(window).width() >= setRWDWidth ? $webSearchBtn : $mobileSearchBtn;
    const $lastTarget = $webSearchAllTarget.last();

    if (e.code === 'Tab') {
      if ($(e.target).is($lastTarget) && $searchBtn.length) {
        _toggleContent($searchBtn);
      }
      if (e.shiftKey && isSearchBtn) {
        if (!$webSearch.is(':hidden')) _hideSearchBox($searchBtn, true);
      }
    } else if (e.altKey && e.code === 'KeyS') {
      _toggleContent($searchBtn);
    } else if (e.code === 'Escape') {
      if ($webSearch.is(':hidden')) return;
      const $btn = $(window).width() >= setRWDWidth ? $webSearchBtn : $mobileSearchBtn;
      _toggleContent($btn);
      $overlay.fadeOut();
    }
  });

  $body.on('click', function (e) {
    $searchTargetSelect.each(function () {
      if ($(this).hasClass('active') && !$(e.target).is($(this)) && !$(e.target).closest($webSearch).length) {
        if (useA11y) {
          $(this).attr({ 'aria-expanded': 'false', 'aria-pressed': 'false' });
        }
        $(this).removeClass('active');
        $webSearch.slideUp(200);
        $overlay.fadeOut();
      }
    });
  });

  const $mobileMainMenuBtn = $('#mobileMainMenuBtn');
  if (!$mobileMainMenuBtn.length) return;
  $mobileMainMenuBtn.on('click', () => _hideSearchBox($mobileSearchBtn, false));
}
webSearch();

// -----------------------------------------------------------------------
// -----  sideNav   ------------------------------------------------------
// -----------------------------------------------------------------------
function sideNav(options) {
  const setRWDWidth = parseInt($(':root').css('--RWDWidth'));
  const $body = $('body');
  const { target, showDefault = true, needLink = false, duration = 200, float = true } = options;
  const $sideNav = $(target);
  if (!$sideNav.length) return;

  $sideNav.addClass(float ? 'typeA' : 'typeB');

  const nextOpen = $sideNav.data('next-open');
  const nextClose = $sideNav.data('next-close');

  const $sideMenu = $sideNav.find('nav#sideMenu');
  if (!$sideMenu.length) return;
  const $sideMenuContent = $sideMenu.find('.sideMenuContent');
  $sideMenu.data('width', parseInt($sideMenuContent.css('width')));
  const $sideNavBtn = $sideNav.find('#sideNavBtn');
  const $allTarget = $sideNav.find('a, button, input, select');

  if (useA11y) {
    $sideNavBtn.attr({ 'aria-haspopup': 'true', 'aria-controls': 'sideMenu' });
    $sideMenu.attr({ 'aria-labelledby': 'sideNavBtn', role: 'navigation' });
  }

  if ($sideNavBtn.length) {
    function _setTransitionBtn(left = null, toLeft = null) {
      const isHidden = $sideMenu.is(':hidden');
      $sideNavBtn.attr('aria-expanded', !isHidden).toggleClass('active');

      if ($(window).width() <= setRWDWidth && float) {
        $sideNavBtn.css({
          transitionProperty: 'left',
          transitionDuration: `${duration}ms`,
          left: `${left}px`,
        });
        setTimeout(() => {
          $sideNavBtn.css('left', `${toLeft}px`);
        });
        setTimeout(() => {
          $sideNavBtn.css({
            transitionProperty: '',
            transitionDuration: '',
          });
        }, duration);
      }
    }

    function _transitionToggle() {
      if (($(window).width() <= setRWDWidth && float) || $(window).width() > setRWDWidth) {
        $sideMenu.animate({ width: 'toggle' }, 200);
      } else if ($(window).width() <= setRWDWidth && !float) {
        $sideMenu.slideToggle(200);
      }
    }
    $sideNavBtn.on('click', () => {
      _transitionToggle();
      _setTransitionBtn();
    });
  }

  if (showDefault) {
    if (useA11y) {
      $sideNavBtn.attr('aria-expanded', 'true');
    }
    $sideNavBtn.addClass('active');
    $sideMenu.show();
  } else {
    if (useA11y) {
      $sideNavBtn.attr('aria-expanded', 'false');
    }
    $sideMenu.hide();
  }

  $sideMenu.find('li ul').parent().addClass('hasChild');

  $sideMenu.find('.hasChild').each(function () {
    const uid = `sn_${_randomLetter(3)}${_randomNumber(3)}`;
    let $childControl;
    if (!needLink) {
      if (useA11y) {
        $childControl = $(this).children('a').attr('role', 'button');
      }
    } else {
      $(this).addClass('needLink');
      const $nextBtn = $('<button type="button" class="nextLvl"></button>');
      if (useA11y) {
        $nextBtn.attr('aria-label', nextOpen);
      }
      $(this).children('a').after($nextBtn);
      $childControl = $nextBtn;
    }
    const $childUl = $(this).children('ul');
    if (useA11y) {
      $childControl.attr({
        'aria-expanded': 'false',
        'aria-haspopup': 'true',
        id: uid,
        'aria-controls': `${uid}_con`,
      });
      $childUl.attr({
        id: `${uid}_con`,
        'aria-labelledby': uid,
      });
    }
    $childControl.on('click', function (e) {
      e.preventDefault();
      _toggleAccordion(this, 'ul', $(this).parent());
    });
  });

  function _toggleAccordion(control, selector, parent) {
    const $control = $(control);
    const $content = $control.parent().children(selector);
    const isVisible = $content.is(':visible');
    if (useA11y) {
      $control.attr('aria-expanded', !isVisible);
    }
    parent.toggleClass('active');
    $content.slideToggle(200);
    if (needLink && useA11y) {
      $control.attr('aria-label', isVisible ? nextOpen : nextClose);
    }

    parent.siblings().each(function () {
      $(this).find(selector).slideUp(200);
      if (useA11y) {
        if (needLink) {
          $(this).find('button').attr({ 'aria-expanded': 'false', 'aria-label': nextOpen });
        } else {
          $(this).find('a').attr('aria-expanded', 'false');
        }
      }
      $(this).removeClass('active');
    });
  }

  let checkRwd = $(window).width() < setRWDWidth;
  $body.on('keydown', function (e) {
    if (checkRwd && $sideNavBtn.hasClass('active')) {
      const $focusable = $allTarget.filter(':visible');
      const $lastFocusable = $focusable.last();
      if (e.code === 'Tab') {
        if (e.shiftKey && e.target === $allTarget.first()[0]) {
          e.preventDefault();
          $lastFocusable.focus();
        } else if (!e.shiftKey && e.target === $lastFocusable[0]) {
          e.preventDefault();
          $sideNavBtn.focus();
        }
      }
    }
  });

  const _checkRwdFn = () => {
    if ($(window).width() <= setRWDWidth) {
      checkRwd = true;
      $sideNavBtn.removeClass('active');
      if (useA11y) {
        $sideNavBtn.attr('aria-expanded', 'false');
      }
      if (float) {
        $sideNavBtn.css({ left: '', top: '80px' });
        $sideMenu.removeAttr('style');
      } else {
        $sideMenu.slideUp(200);
      }
    } else if ($(window).width() > setRWDWidth && checkRwd === true) {
      checkRwd = false;
      $sideNavBtn.addClass('active');
      if (useA11y) {
        $sideNavBtn.attr('aria-expanded', 'true');
      }
      $sideMenu.removeAttr('style');
      if (!float) $sideMenu.slideDown(200);
    }
  };
  _checkRwdFn();
  $(window).on('resize', _checkRwdFn);
}

// -----------------------------------------------------------------------
// -----  Tab   ------------------------------------------------------
// -----------------------------------------------------------------------
function tabFunction(obj) {
  const setRWDWidth = parseInt($(':root').css('--RWDWidth'));
  const { target, autoClose = true, openContent = false, modeSwitch = false, windowWidth = setRWDWidth, openSwitch = true } = obj;

  const $tabSet = $(target);
  if (!$tabSet.length) return;

  const $tabItems = $tabSet.find('.tabItems');
  const $tabBtn = $tabSet.find('.tabBtn');
  const $tabContent = $tabSet.find('.tabContent');
  const $tabContentIn = $tabSet.find('.tabContentIn');
  const defaultIndex = $($tabBtn).index($tabSet.find('.active'));

  function _tabInit(targetIndex) {
    $tabItems.attr('role', 'tablist');

    $tabBtn.each(function (i) {
      const id = `tab_${_randomLetter(3)}${_randomNumber(3)}`;
      const controls = `${id}_con`;

      if (useA11y) {
        $(this).attr({
          role: 'tab',
          id: id,
          'aria-controls': controls,
          'aria-selected': 'false',
          'aria-expanded': 'false',
          tabindex: '-1',
        });

        if ($tabContent.eq(i).length) {
          _setAttributeFn($tabContent.eq(i), 'tabpanel', controls, id);
        } else {
          console.error(`tab功能: ${obj.target}內容數量與按鈕數量不符`);
        }
      }
      if (modeSwitch) {
        const $mobileTabBtn = _createMobileTabBtn(id, controls, $(this).text());
        $tabContent.eq(i).prepend($mobileTabBtn);
      }
    });

    _checkTarget(targetIndex);
    $tabSet.data('nowIndex', targetIndex);
  }

  function _createMobileTabBtn(id, controls, textContent) {
    if (useA11y) {
      return $(`<button class="mobileTabBtn" id="${id}" aria-controls="${controls}" type="button" aria-expanded="false">${textContent}</button>`);
    }
    return $(`<button class="mobileTabBtn" id="${id}"  type="button">${textContent}</button>`);
  }

  _tabInit(defaultIndex);

  function _checkTarget(targetIndex) {
    $tabSet.data('nowIndex', targetIndex);

    $tabBtn.eq(targetIndex).addClass('active').siblings().removeClass('active');
    if (useA11y) {
      $tabBtn
        .eq(targetIndex)
        .attr({
          'aria-selected': 'true',
          'aria-expanded': 'true',
          tabindex: '0',
        })
        .siblings()
        .attr({
          'aria-selected': 'false',
          'aria-expanded': 'false',
          tabindex: '-1',
        });
    }

    $tabContent.eq(targetIndex).show().siblings().hide();
  }

  if (openSwitch) {
    $tabSet.on('click', '.tabBtn, .mobileTabBtn', function (e) {
      const $target = $(this);
      if ($target.hasClass('tabBtn')) {
        const index = $tabBtn.index($target);
        _checkTarget(index);
      } else if (modeSwitch && $target.hasClass('mobileTabBtn')) {
        const $mobileTabBtn = $tabSet.find('.mobileTabBtn');
        const index = $mobileTabBtn.index($target);
        _mobileTabFn($target, index, $mobileTabBtn);
      }
    });

    $tabSet.on('keydown', '.tabBtn', function (e) {
      let index;
      if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
        const currentIndex = $tabBtn.index(this);
        if (e.code === 'ArrowRight') {
          index = (currentIndex + 1) % $tabBtn.length;
        } else {
          index = (currentIndex - 1 + $tabBtn.length) % $tabBtn.length;
        }
        $tabBtn.eq(index).focus();
        _checkTarget(index);
      }
    });
  }

  function _mobileTabFn($btn, i, $mobileTabBtn) {
    $tabContentIn.eq(i).slideToggle(200);
    $tabSet.data('nowIndex', i);
    let check = $btn.hasClass('active') ? false : true;
    $btn.attr('aria-expanded', check).toggleClass('active');

    if (!autoClose) return;
    $mobileTabBtn.not($btn).removeClass('active');
    if (useA11y) {
      $mobileTabBtn.attr('aria-expanded', 'false');
    }
    $tabContentIn.not($tabContentIn.eq(i)).slideUp(200);

    setTimeout(() => {
      let btnClientRect = $btn[0].getBoundingClientRect();
      if (btnClientRect.y < 0) {
        $('html, body').animate(
          {
            scrollTop: $(window).scrollTop() + btnClientRect.y - btnClientRect.height - 20,
          },
          200
        );
      }
    }, 200);
  }

  function _removeAttributeFn(item) {
    $(item).removeAttr('role aria-labelledby id');
  }

  function _setAttributeFn(item, role, id, labelledby) {
    $(item).attr({
      role: role,
      id: id,
      'aria-labelledby': labelledby,
    });
  }

  function _checkRWD() {
    const $tabpanelBtn = $tabSet.find('.tabContent .mobileTabBtn');
    const nowOpen = $tabSet.data('nowIndex');

    $tabBtn
      .eq(nowOpen)
      .addClass('active')
      .attr({
        'aria-selected': 'true',
        'aria-expanded': 'true',
        tabindex: '0',
      })
      .siblings()
      .removeClass('active')
      .attr({
        'aria-selected': 'false',
        'aria-expanded': 'false',
        tabindex: '-1',
      });

    $tabpanelBtn.eq(nowOpen).addClass('active').attr('aria-expanded', 'true');
    $tabpanelBtn.not($tabpanelBtn.eq(nowOpen)).removeClass('active').attr('aria-expanded', 'false');

    if ($(window).width() < windowWidth && modeSwitch) {
      $tabItems.hide();
      $tabContent.show();
      $tabpanelBtn.show();
      $tabContentIn.hide();

      $tabContent.each(function (i) {
        if (useA11y) {
          _removeAttributeFn(this);
        }
        const id = $tabpanelBtn.eq(i).attr('id');
        const controls = $tabpanelBtn.eq(i).attr('aria-controls');
        if (useA11y) {
          _setAttributeFn($tabContentIn.eq(i), 'region', controls, id);
        }
      });

      if (openContent) {
        $tabContentIn.show();
        $tabpanelBtn.addClass('active');
      } else {
        $tabContentIn.not($tabContentIn.eq(nowOpen)).hide();
        $tabpanelBtn.not($tabpanelBtn.eq(nowOpen)).removeClass('active');
        $tabpanelBtn.eq(nowOpen).addClass('active');
        if (useA11y) {
          $tabpanelBtn.attr('aria-expanded', 'true');
        }
        $tabContentIn.eq(nowOpen).show();
      }
    } else if ($(window).width() >= windowWidth && modeSwitch) {
      $tabItems.show();
      if (useA11y) {
        $tabItems.attr('role', 'tablist');
      }
      $tabContentIn.removeAttr('style role aria-labelledby id');
      $tabpanelBtn.hide();
      if (useA11y) {
        $tabContent.each(function (i) {
          const id = $tabBtn.eq(i).attr('id');
          const controls = $tabBtn.eq(i).attr('aria-controls');
          _setAttributeFn(this, 'tabpanel', controls, id);
        });
      }
      $tabContent.eq(nowOpen).show().siblings().hide();
    }
  }
  _checkRWD();
  $(window).on('resize', _checkRWD);
}

// -----------------------------------------------------------------------
// -----   Accordion設定   ------------------------------------------------
// -----------------------------------------------------------------------
function accordionFunction(obj) {
  const { target, openContent = false, openDefault = false, autoClose = true, openSwitch = true } = obj;

  const $accordionSet = $(target);
  if (!$accordionSet.length) return;

  const infoOpen = $accordionSet.data('state-open');
  const infoClose = $accordionSet.data('state-close');
  const $accordionList = $accordionSet.find('.accordionList');
  const $accordionBtns = $accordionSet.find('.accordionBtn');
  const $accordionCons = $accordionSet.find('.accordionContent');
  const defaultIndex = $accordionList.index($accordionSet.find('.active'));

  function _accordionInit(targetIndex) {
    $accordionSet.data('nowIndex', targetIndex);
    $accordionBtns.each(function (i) {
      const id = `accordion_${_randomLetter(3)}${_randomNumber(3)}`;
      const controls = `${id}_con`;

      if (openSwitch) {
        const $accordionStateOuter = $('<div class="accordionState"></div>');
        const $accordionState = $(`<span>${infoOpen}</span>`);
        $accordionStateOuter.append($accordionState);
        $(this).append($accordionStateOuter);
      }

      if (useA11y) {
        $(this).attr({
          id: id,
          'aria-controls': controls,
          'aria-expanded': 'false',
        });

        $accordionCons.eq(i).attr({
          id: controls,
          'aria-labelledby': id,
          role: 'region',
        });
      }
      if (openContent) {
        $(this).addClass('active');
        if (useA11y) {
          $(this).attr('aria-expanded', 'true');
        }
        if (openSwitch) $(this).find('.accordionState span').text(infoClose);
      } else {
        if (useA11y) {
          $(this).attr('aria-expanded', 'false');
        }
        $accordionCons.eq(i).hide();
      }
    });

    if (openDefault) {
      $accordionBtns.eq(defaultIndex).parent().addClass('active');
      if (useA11y) {
        $accordionBtns.eq(defaultIndex).attr('aria-expanded', 'true');
      }
      $accordionCons.eq(defaultIndex).slideDown(200);
      if (openSwitch) $accordionBtns.eq(defaultIndex).find('.accordionState span').text(infoClose);
    }
  }
  _accordionInit(defaultIndex);

  function _accordionFn($btn, i) {
    const $accordionState = $btn.find('.accordionState span');
    $accordionCons.eq(i).slideToggle(200);
    $accordionSet.data('nowIndex', i);
    let infoText = $accordionState.text() === infoClose ? infoOpen : infoClose;
    $accordionState.text(infoText);
    $btn.parent().toggleClass('active');
    if (useA11y) {
      let expanded = $btn.attr('aria-expanded') === 'true' ? false : true;
      $btn.attr('aria-expanded', expanded);
    }

    if (!autoClose) return;
    $accordionBtns.not($btn).parent().removeClass('active');
    $accordionBtns.not($btn).find('.accordionState span').text(infoOpen);
    $accordionCons.not($accordionCons.eq(i)).slideUp(200);

    setTimeout(() => {
      let btnClientRect = $btn[0].getBoundingClientRect();
      if (btnClientRect.y < 0) {
        $('html, body').animate(
          {
            scrollTop: $(window).scrollTop() + btnClientRect.y - btnClientRect.height - 20,
          },
          200
        );
      }
    }, 200);
  }

  if (openSwitch) {
    $accordionBtns.on('click', function (e) {
      e.preventDefault();
      const index = $accordionBtns.index(this);
      _accordionFn($(this), index);
    });
  }
}

// -----------------------------------------------------------------------
// -----  fatFooter   ------------------------------------------------------
// -----------------------------------------------------------------------
function fatFooter() {
  const $fatFooterBtn = $('#fatFooterBtn');
  if (!$fatFooterBtn.length) return;

  const $fatFooterCon = $('.fatFooter nav > ul > li > ul');
  if (useA11y) {
    let idArray = [];
    $fatFooterCon.each(function (i) {
      idArray.push(`fatFooter${i}`);
      $(this).attr({
        id: `fatFooter${i}_con`,
        'aria-labelledby': 'fatFooterBtn',
      });
    });

    $fatFooterBtn.attr({
      'aria-controls': idArray.join(' '),
      'aria-expanded': 'true',
    });
  }
  $fatFooterBtn.on('click', function (e) {
    e.preventDefault();
    $fatFooterCon.each(function () {
      _toggleFatFooter($(this), 400);
    });
  });

  function _toggleFatFooter($element, time = 200) {
    if ($element.is(':hidden')) {
      $element.slideDown(time, function () {
        $(this).css('display', 'flex');
      });
      $fatFooterBtn.removeClass('active');
      if (useA11y) {
        $fatFooterBtn.attr('aria-expanded', 'true');
      }
    } else {
      $element.slideUp(time);
      $fatFooterBtn.addClass('active');
      if (useA11y) {
        $fatFooterBtn.attr('aria-expanded', 'false');
      }
    }
  }
}
fatFooter();

// -----------------------------------------------------------------------
// -----   tableList樣式 加上 data-title   -------------------------------
// -----------------------------------------------------------------------
function tableAddDataAttributes() {
  const $el = $('.tableList');
  if (!$el.length) return;
  $el.each(function () {
    $(this)
      .find('table')
      .each(function () {
        _setTrAttr($(this));
        $(this).addClass('loaded');
      });
  });

  function _setTrAttr($table) {
    const $thList = $table.find('th');
    const $trList = $table.find('tr');
    $trList.each(function () {
      $(this)
        .find('td')
        .each(function (idx) {
          $(this).attr('data-td-title', $thList.eq(idx).text());
        });
    });
  }
}
tableAddDataAttributes();

// -----------------------------------------------------------------------
// -----   scrollTables   ------------------------------------------------
// -----------------------------------------------------------------------
function scrollTables() {
  const $el = $('.tableScroll');
  if (!$el.length) return;

  $el.each(function () {
    const $table = $(this).find('table');
    const $caption = $(this).find('caption');
    const $prevBtn = $(this).find('.scrollTablePrevBtn');
    const $nextBtn = $(this).find('.scrollTableNextBtn');
    if (!$prevBtn.length || !$nextBtn.length) {
      console.error('表格捲動功能: prevBtn 或 nextBtn 無法抓到，請檢查Html結構');
      return;
    }

    if ($caption.length) {
      let captionMargin = parseInt($caption.css('marginBottom')) || 0;
      const topPosition = $caption.outerHeight() + captionMargin;
      $prevBtn.css('top', topPosition);
      $nextBtn.css('top', topPosition);
    }

    const $tableScrollIn = $('<div class="tableScrollIn"></div>');
    $tableScrollIn.append($table);
    $(this).append($tableScrollIn);

    function _checkScroll() {
      const tableScrollLeft = $tableScrollIn.scrollLeft();
      const tableClientWidth = $tableScrollIn.innerWidth();
      const tableScrollWidth = $table[0].scrollWidth;

      $nextBtn.toggle(tableScrollLeft + tableClientWidth < tableScrollWidth);
      $prevBtn.toggle(tableScrollLeft > 0);
    }

    $tableScrollIn.on('scroll', _checkScroll);
    _checkScroll();
    $(window).on('resize', _checkScroll);

    $prevBtn.on('click', function (e) {
      e.preventDefault();
      $tableScrollIn[0].scrollBy({ left: -100, behavior: 'smooth' });
    });
    $nextBtn.on('click', function (e) {
      e.preventDefault();
      $tableScrollIn[0].scrollBy({ left: 100, behavior: 'smooth' });
    });
  });
}
scrollTables();

// -----------------------------------------------------------------------
// -----   swiper無障礙功能   -----------------------------------
// -----------------------------------------------------------------------
function swiperA11Fn(swiper) {
  let noActive = 0;
  $(swiper.slides).each(function (i, elem) {
    if ($(elem).hasClass('swiper-slide-thumb-active')) {
      noActive = i;
    }
  });

  const $swiperSlide = $(swiper.el).find('.item');
  $swiperSlide.each(function (idx, elem) {
    $(elem).attr({
      role: 'button',
      tabindex: '0',
      'aria-pressed': idx === noActive,
    });

    $(elem).on('click', function () {
      $(this).attr('aria-pressed', 'true');
      $swiperSlide.not(this).attr('aria-pressed', 'false');
    });
  });

  const $autoPlaySwitch = $(swiper.el).parent().parent().find('.autoPlaySwitch');
  if (!$autoPlaySwitch.length) return;

  let nowState = swiper.autoplay.running;
  let infoPlay = $autoPlaySwitch.data('info-play');
  let infoStop = $autoPlaySwitch.data('info-stop');

  $autoPlaySwitch.addClass(nowState ? 'stop' : 'play').attr({
    'aria-label': infoStop,
    'data-altlabel': infoPlay,
  });

  $autoPlaySwitch.on('click', function () {
    nowState = !nowState;
    if (nowState) {
      swiper.autoplay.start();
      $(this).removeClass('play').addClass('stop').attr({
        'aria-label': infoStop,
        'data-altlabel': infoPlay,
      });
    } else {
      swiper.autoplay.stop();
      $(this).removeClass('stop').addClass('play').attr({
        'aria-label': infoPlay,
        'data-altlabel': infoStop,
      });
    }
  });
  if (swiper.slides.length === 1) $autoPlaySwitch.remove();
}

function swiperNavKeyDownFn(swiper, mainSwiper) {
  if (!swiper) return;
  $(swiper.slides).each(function (idx, elem) {
    $(elem).data('swiper-slide-index', idx);
  });

  $('body').on('keydown', function (e) {
    if (e.code === 'Enter' && $(e.target).parent().data('swiper-slide-index') !== undefined) {
      let index = $(e.target).parent().data('swiper-slide-index');
      mainSwiper.slideTo(index, 1000, false);
      $(e.target).attr('aria-pressed', 'true').siblings().attr('aria-pressed', 'false');
    }
  });
}

// -----------------------------------------------------------------------
// -----   表單密碼顯示設定   ------------------------------------------------
// -----------------------------------------------------------------------
function formEye() {
  const $checkEye = $('.formEyes');
  if (!$checkEye.length) return;

  $checkEye.each(function () {
    const $password = $(this).parent().find('input');
    const showPassword = $(this).data('show');
    const hidePassword = $(this).data('hide');
    if (useA11y) {
      $(this).attr({
        'aria-label': showPassword,
        'aria-pressed': 'false',
      });
    }

    $(this).on('click', function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        if (useA11y) {
          $(this).attr({
            'aria-pressed': 'false',
            'aria-label': showPassword,
          });
        }
        $password.attr('type', 'password');
      } else {
        $(this).addClass('active');
        if (useA11y) {
          $(this).attr({
            'aria-pressed': 'true',
            'aria-label': hidePassword,
          });
        }
        $password.attr('type', 'text');
      }
    });
  });
}
formEye();

// -----------------------------------------------------------------------
// -----   scroll top   ------------------------------------------------
// -----------------------------------------------------------------------
function scrollTopFn() {
  const $scrollTop = $('#scrollTop');
  const $goCenter = $('.goCenter');
  if (!$scrollTop.length) return;

  function _scrollFn() {
    $scrollTop.toggleClass('active', $(window).scrollTop() > 100);
  }

  $(window).on('scroll', _scrollFn);
  _scrollFn();

  $scrollTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 300);
    if ($goCenter.length) $goCenter.focus();
  });
}
scrollTopFn();

// -----------------------------------------------------------------------
// -----  form 檔案上傳  ---------------------------------------------------
// -----------------------------------------------------------------------
function addFile() {
  const $addFileName = $('.downloadFile');
  if (!$addFileName.length) return;

  $addFileName.on('change', function (e) {
    const files = e.target.files;
    const $uploadInput = $(this).parent().find('.fileName');
    let allFileName = [];
    for (let i = 0; i < files.length; i++) {
      allFileName.push(files[i].name);
    }
    $uploadInput.text(allFileName.join(', '));
  });
}
addFile();

// -----------------------------------------------------------------------
// -----  橫式跑馬燈   ----------------------------------------------------
// -----------------------------------------------------------------------
function marquee() {
  const $marquee = $('.marqueeSliderH');
  if (!$marquee.length) return;

  $marquee.each(function () {
    const $wrapper = $(this);
    const $marqueeBox = $wrapper.find('.marqueeBox');
    const $marqueeList = $wrapper.find('.marqueeList').first();
    const $autoPlaySwitch = $wrapper.find('.autoPlaySwitch');

    if (!$marqueeBox.length || !$marqueeList.length) return;

    let marqueeBoxWidth = $marqueeBox.outerWidth();
    let marqueeListWidth = $marqueeList.outerWidth();
    let isPaused = false;
    let isHover = false;
    let sliderMovePx = 0;

    $(window).on('resize', function () {
      marqueeBoxWidth = $marqueeBox.outerWidth();
      marqueeListWidth = $marqueeList.outerWidth();
    });

    for (let i = 0; (marqueeListWidth * i) / marqueeBoxWidth < 1; i++) {
      const $cloneList = $marqueeList.clone();
      $cloneList.find('a').attr('tabindex', '-1');
      $marqueeList.after($cloneList);
    }

    const $allList = $marqueeBox.find('.marqueeList');

    function _marqueeMove() {
      requestAnimationFrame(_marqueeMove);
      if (isHover || isPaused) return;
      sliderMovePx += 1;
      if (sliderMovePx <= marqueeListWidth) {
        $allList.css('transform', `translateX(-${sliderMovePx}px)`);
      } else {
        sliderMovePx = 0;
      }
    }
    _marqueeMove();

    $marqueeBox.on('mouseenter', () => {
      isHover = true;
    });
    $marqueeBox.on('mouseleave', () => {
      isHover = false;
    });

    if (!$autoPlaySwitch.length) return;

    const infoPlay = $autoPlaySwitch.data('info-play');
    const infoStop = $autoPlaySwitch.data('info-stop');
    $autoPlaySwitch.addClass('stop');
    if (useA11y) {
      $autoPlaySwitch.attr({ 'aria-label': infoStop, 'data-altlabel': infoPlay });
    }

    $marqueeBox.on('keyup', (e) => {
      if (e.code === 'Tab') {
        e.preventDefault();
        sliderMovePx = -1;
        setTimeout(() => {
          isPaused = true;
        });
        $autoPlaySwitch.addClass('play').removeClass('stop');
        if (useA11y) {
          $autoPlaySwitch.attr({ 'aria-label': infoPlay, 'data-altlabel': infoStop });
        }
      }
    });

    $autoPlaySwitch.on('click', () => {
      if (!isPaused) {
        isPaused = true;
        $autoPlaySwitch.addClass('play').removeClass('stop');
        if (useA11y) {
          $autoPlaySwitch.attr({ 'aria-label': infoPlay, 'data-altlabel': infoStop });
        }
      } else {
        isPaused = false;
        $autoPlaySwitch.addClass('stop').removeClass('play');
        if (useA11y) {
          $autoPlaySwitch.attr({ 'aria-label': infoStop, 'data-altlabel': infoPlay });
        }
      }
    });
  });
}
marquee();

function a11yKeyCode() {
  $(document).on('keydown', function (e) {
    if (!e.altKey) return;
    const code = e.code || e.key;
    switch (code) {
      case 'KeyU':
      case 'U':
      case 'u':
        $('#aU').focus();
        break;
      case 'KeyC':
      case 'C':
      case 'c':
        $('#aC').focus();
        break;
      case 'KeyZ':
      case 'Z':
      case 'z':
        $('#aZ').focus();
        break;
    }
  });
}
a11yKeyCode();

function popupFn() {
  const $fancyBox = $('[data-fancybox]');
  if (!$fancyBox.length) return;

  let lang = 'en';
  $('script').each(function () {
    const src = $(this).attr('src');
    if (src && src.indexOf('fancybox/l10n') !== -1) {
      const path = src.split('/');
      const fileName = path[path.length - 1];
      lang = fileName.split('.')[0];
      return false;
    }
  });

  function fancyBoxFn(eventName, Fancybox) {
    if (eventName === 'Carousel.ready') {
      const $closeBtn = $('[data-fancybox-close]');
      $closeBtn.append(`<span>${Fancybox.l10n[lang].CLOSE}</span>`);
      $closeBtn.attr('aria-label', Fancybox.l10n[lang].CLOSE);
      $closeBtn.focus();

      const popupBox = Fancybox.getSlide().el;
      const $allTarget = $(popupBox).find('a,button,input,select');

      const lastElement = $allTarget.last()[0];
      console.log(lastElement);

      $(popupBox).on('keydown', (e) => {
        const target = e.target;
        console.log(target, lastElement);

        if (target === lastElement && e.code === 'Tab' && !e.shiftKey) {
          e.preventDefault();
          $closeBtn.focus();
        } else if (target === $closeBtn[0] && e.code === 'Tab' && e.shiftKey) {
          e.preventDefault();
          lastElement.focus();
        }
      });
    }
  }

  Fancybox.bind('[data-fancybox]', {
    l10n: Fancybox.l10n[lang],
    on: {
      '*': (fancyboxRef, eventName) => {
        // 關閉按鈕無障礙問題
        fancyBoxFn(eventName, Fancybox);
      },
    },
  });

  const $showPopup = $('.showPopup');
  if ($showPopup.length) {
    Fancybox.show(
      [
        {
          src: `#${$showPopup.attr('id')}`,
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
popupFn();
