const swiper = new Swiper('.section-slide', {
  direction: 'vertical', // 垂直方向滑動
  mousewheel: true, // 啟用滾輪滑動
  pagination: {
    el: '.swiper-pagination', // 分頁指示器
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next', // 下一個按鈕
    prevEl: '.swiper-button-prev', // 上一個按鈕
  },
  slidesPerView: 1, // 每次顯示一個區塊
  speed: 800, // 動畫速度（毫秒）
});


$('.menu-slide__button, .menu-slide__closed').click(function() {
  $('.menu-slide').toggleClass('open');
  $('.menu-slide__button').toggleClass('btn-menu');
});

