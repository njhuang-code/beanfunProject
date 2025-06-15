$(document).ready(function () {
  $('.section-tab-group').each(function () {
    const $group = $(this); // 當前這一組 tab 區塊

    // 預設只顯示第一個 content
    $group.find('.section-tab-content').hide().eq(0).show();

    $group.find('.section-tab-item').click(function () {
      const index = $(this).index();

      // 切換 tab 樣式
      $group.find('.section-tab-item').removeClass('is-active');
      $(this).addClass('is-active');

      // 顯示對應內容
      $group.find('.section-tab-content').hide().eq(index).fadeIn(300);
    });
  });

  $('.tab-item').click(function () {
    const index = $(this).index();

    $('.tab-item').removeClass('is-active');
    $(this).addClass('is-active');

    // 顯示對應內容
    if (index === 0) {
      $('.left-table-container').show();
      $('.right-table-container').hide();
    } else {
      $('.left-table-container').hide();
      $('.right-table-container').show();
    }
  });

  // 預設狀態：只顯示左邊
  $('.left-table-container').show();
  $('.right-table-container').hide();



  $('.tab-item').click(function () {
    const $clicked = $(this);
    const index = $clicked.index(); // 第幾個 tab-item

    // 切換 active 樣式
    $('.tab-item').removeClass('is-active');
    $clicked.addClass('is-active');

    // 切換 .tab 上的 img-x class
    const $tab = $clicked.closest('.tab');
    $tab.removeClass(function (i, className) {
      return (className.match(/img-\d+/g) || []).join(' ');
    }).addClass('img-' + (index + 1));
  });
});

const swiper = new Swiper('.swiper', {
  loop: true, // 循環模式選項
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
});