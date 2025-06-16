$(document).ready(function () {
  $('.section-tab-group').each(function () {
    const $group = $(this); 

    $group.find('.section-tab-content').hide().eq(0).show();

    $group.find('.section-tab-item').click(function () {
      const index = $(this).index();

      $group.find('.section-tab-item').removeClass('is-active');
      $(this).addClass('is-active');

      $group.find('.section-tab-content').hide().eq(index).fadeIn(300);
    });
  });

  $('.tab-item').click(function () {
    const index = $(this).index();

    $('.tab-item').removeClass('is-active');
    $(this).addClass('is-active');

    if (index === 0) {
      $('.left-table-container').show();
      $('.right-table-container').hide();
    } else {
      $('.left-table-container').hide();
      $('.right-table-container').show();
    }
  });

  $('.left-table-container').show();
  $('.right-table-container').hide();


  $('.right-table-container .s3-section-btn').on('click', function () {

    $('.tab-item').eq(0).click();

    setTimeout(function () {
      $('html, body').animate({
        scrollTop: $('.s3-section-bottom.column').offset().top
      }, 500);
    }, 100);
  });

  $('.tab-item').click(function () {
    const $clicked = $(this);
    const index = $clicked.index();

    $('.tab-item').removeClass('is-active');
    $clicked.addClass('is-active');

    const $tab = $clicked.closest('.tab');
    $tab.removeClass(function (i, className) {
      return (className.match(/img-\d+/g) || []).join(' ');
    }).addClass('img-' + (index + 1));
  });
});

const swiper = new Swiper('.swiper', {
  loop: true, 
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

  $('.left-table-container .s3-section-btn').on('click', function () {
    const targetPopup = $(this).data('target');
    
    $(targetPopup).fadeIn();
    $('.black-overlay').fadeIn();
  });

  $('.popup .closed').on('click', function () {
    $(this).closest('.popup').fadeOut();
    $('.black-overlay').fadeOut();
  });

  $(function () {
    $("#gotop").click(function () {
        jQuery("html,body").animate({
            scrollTop: 0
        }, 1000);
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('#gotop').fadeIn("fast");
        } else {
            $('#gotop').stop().fadeOut("fast");
        }
    });
});


$('.btn_toggle').on('click', (event) => {
  event.preventDefault();
  $('.side_nav').toggleClass('hide');
});