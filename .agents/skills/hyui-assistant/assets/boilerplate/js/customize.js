mainMenu({
  sticky: true, // 是否置頂
  mega: false, // 是否megaMenu
  needLink: false, // 如果同時需要連結和下層功能時(手機版選單)
});
// -----  基本功能開關   ---------------------------------------------------

// 側邊選單
sideNav({
  target: '.sideNav',
  needLink: false, // 如果同時需要連結和下層功能時
  float: true, // 切換手機版由左側展開或是下方展開
  showDefault: true, // 是否預設顯示
});

// tabFunction({
// target: '.target1', // 執行目標，多組需要另外設定
// modeSwitch: false, // 自動切換，尺寸以上tab功能，尺寸以下手風琴功能
// openContent: false, // 展開所有內容，僅開啟模式切換時才可使用
// openIndex: 0, // 開啟第幾個
// windowWidth: 767, // 尺寸以上tab功能，尺寸以下手風琴功能
// autoClose: true, // 自動關閉其他開啟內容
// openSwitch: true, // 是否可開合/切換
// });
// tab功能
tabFunction({
  target: '.tabFunction1',
  modeSwitch: true,
});
// mp2 新書展示
tabFunction({
  target: '.tabFunction2',
});
// mp2 最新消息
tabFunction({
  target: '.tabFunction3',
  modeSwitch: true, // 自動切換，尺寸以上tab功能，尺寸以下手風琴功能<br />
});

// 手風琴功能
accordionFunction({
  target: '.accordion',
  openContent: false, // 預設先展開所有內容
  openDefault: true, // 是否有預設開啟
  openIndex: 0, // 預設開啟第幾個
  autoClose: true, // 自動關閉其他開啟內容
  openSwitch: true, // 是否可開合/切換
});

window.addEventListener('DOMContentLoaded', () => {
  _toggleDropdown('header .subNavList .language > button', 'header .subNavList .language ul'); //語系開關切換
  _toggleDropdown('header .navList .language > button', 'header .navList .language ul'); //語系開關切換
  _toggleDropdown('#mobileMenu .language > button', '#mobileMenu .language ul'); //語系開關切換手機版
  _toggleDropdown('header .fontSize > button', 'header .fontSize ul'); //文字大小展開開關切換
  _toggleDropdown('.shareBox .share', '.shareBox .shareBoxList'); //分享開關切換
  _toggleDropdown('.contentSearchBtn', '.contentSearchBox', false); //LP 內容搜尋
  _toggleDropdown('.floatNav .floatSwitchBtn', '.floatNav .typeA'); //LP 內容

  // -----  MP2 多筆swiper輪播   ---------------------------------------------------
  const multipleSlider = document.querySelectorAll('.blockTypeG .multipleSlider');

  multipleSlider.forEach((item, index) => {
    let multipleSwiper = new Swiper(item.querySelector('.swiper'), {
      slideToClickedSlide: true,
      slidesPerView: 5,
      watchSlidesProgress: true,
      navigation: {
        nextEl: item.querySelector('.swiperNext'),
        prevEl: item.querySelector('.swiperPrev'),
        disabledClass: 'swiperArrow-disabled', //不可點選樣式
      },
      autoplay: {
        delay: 5000,
      },
      on: {
        init: function (swiper) {
          swiperA11Fn(swiper);
        },
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        500: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      },
    });
  });

  // -----  MP 輪播   ---------------------------------------------------
  const mpSlider = new Swiper('.mpSlider .swiper', {
    // 切換點
    pagination: {
      el: '.mpSlider .swiperPagination',
    },
    // 切換箭頭
    navigation: {
      nextEl: '.mpSlider .swiperNext', //自行設定樣式
      prevEl: '.mpSlider .swiperPrev', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    autoplay: {
      delay: 5000,
    },
    on: {
      init: function (swiper) {
        swiperA11Fn(swiper);
      },
    },
  });

  // -----  CP 輪播   ---------------------------------------------------
  const lightBoxSlider = new Swiper('.lightBoxSlider .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    slideToClickedSlide: true,
    loop: false,
    // 切換箭頭
    navigation: {
      nextEl: '.lightBoxSlider .swiperNext', //自行設定樣式
      prevEl: '.lightBoxSlider .swiperPrev', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
    autoplay: {
      delay: 5000,
    },
    on: {
      init: function (swiper) {
        swiperA11Fn(swiper);
      },
    },
  });

  // -----  跑馬燈   ---------------------------------------------------
  const marqueeSlider = new Swiper('.marqueeSlider .swiper', {
    direction: 'vertical',
    // 切換箭頭
    navigation: {
      nextEl: '.marqueeSlider .swiperNext', //自行設定樣式
      prevEl: '.marqueeSlider .swiperPrev', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    freeMode: true,
    autoplay: {
      delay: 5000,
    },
    on: {
      init: function (swiper) {
        swiperA11Fn(swiper);
      },
    },
  });

  // -----  cp_album   ---------------------------------------------------
  const sliderFor = new Swiper('.thumbsAlbum .sliderFor .swiper', {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.sliderFor .swiperPagination',
      type: 'fraction',
    },
    autoplay: {
      delay: 5000,
    },
    lazy: true,
    thumbs: {
      swiper: {
        el: '.thumbsAlbum .navSlider .swiper',
        spaceBetween: 20,
        slideToClickedSlide: true,
        slidesPerView: 4,
        watchSlidesVisibility: true,
        navigation: {
          nextEl: '.navSlider .swiperNext',
          prevEl: '.navSlider .swiperPrev',
          disabledClass: 'swiperArrow-disabled', //不可點選樣式
        },
        breakpoints: {
          100: {
            slidesPerView: 2,
          },
          767: {
            slidesPerView: 3,
          },
          1000: {
            slidesPerView: 4,
          },
        },
      },
      autoScrollOffset: 1,
    },
    on: {
      init: function (swiper) {
        swiperA11Fn(swiper);
      },
    },
  });
  swiperNavKeyDownFn(sliderFor.thumbs.swiper, sliderFor);

  // -----  mp/mp2 link 輪播   ---------------------------------------------------
  const linkSlider = new Swiper('.linkSlider .swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    slideToClickedSlide: true,
    loop: false,
    // 切換箭頭
    navigation: {
      nextEl: '.linkSlider .swiperNext', //自行設定樣式
      prevEl: '.linkSlider .swiperPrev', //自行設定樣式
      disabledClass: 'swiperArrow-disabled', //不可點選樣式
    },
    breakpoints: {
      100: {
        slidesPerView: 2,
      },
      767: {
        slidesPerView: 3,
      },
      1000: {
        slidesPerView: 4,
      },
    },
    autoplay: {
      delay: 5000,
    },
    on: {
      init: function (swiper) {
        swiperA11Fn(swiper);
      },
    },
  });
});
