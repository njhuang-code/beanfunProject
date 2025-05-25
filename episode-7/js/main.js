window.addEventListener("load", function () {
  let swiper = null;

  const sectionToSlideIndex = {
    '#sectionMain': 0,
    '#sectionSec': 1,
    '#sectionThird': 2,
    '#sectionFourth': 3,
    '#sectionFifth': 4,
    '#sectionSixth': 5,
    '#sectionSeventh': 6,
    '#sectionEighth': 7,
    '#sectionNinth': 8,
    // '#sectionTenth': 9,
  };

  const slideIndexToSection = Object.fromEntries(
    Object.entries(sectionToSlideIndex).map(([key, val]) => [val, key])
  );

  function initSwiper() {
    swiper = new Swiper(".section-slide", {
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: true,
      autoHeight: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      on: {
        init(swiper) {
          handleSlide(swiper.activeIndex);
        },
        slideChangeTransitionStart(swiper) {
          handleSlide(swiper.activeIndex);
        },
      },
    });
  }

  function destroySwiper() {
    if (swiper) {
      swiper.destroy(true, true);
      swiper = null;
    }
  }

  function handleSlide(index) {
    handleSlideAnimations(index);
    updateActiveNav(index);
  }

  function handleSlideAnimations(activeIndex) {
    document.querySelectorAll(".swiper-slide").forEach((slide, i) => {
      slide.querySelectorAll(".animate").forEach(el => {
        el.classList.toggle("animate_active", i === activeIndex);
      });
    });
  }

  function goToSection(target) {
    const index = sectionToSlideIndex[target];
    if (swiper && index !== undefined) {
      swiper.slideTo(index);
      updateActiveNav(index); // 預先更新（有時 swiper transition 會延遲）
    }
  }

  function updateActiveNav(index) {
    const sectionId = slideIndexToSection[index];
    if (!sectionId) return;

    $('.menu-nav__item').removeClass('active');
    $(`.menu-nav__name[href="${sectionId}"]`).each(function () {
      $(this).closest('.menu-nav__item').addClass('active');
    });
  }

  function bindEvents() {
    $('.menu-nav__name, .kv-section__scroll').on('click', function (e) {
      e.preventDefault();
      goToSection($(this).attr('href'));
    });
  }

  // 播放影音彈窗
  $('.kv-section__btn').click(function(e) {
    e.preventDefault();
    
    $('.lightbox__black-overlay').fadeIn(300, function() {
      $(this).addClass('toggle__trigger');
    });
    
    $('.lightbox').fadeIn(300, function() {
      $(this).addClass('toggle__trigger');
    });

    var $iframe = $('.lightbox__video');
    var src = $iframe.attr('src');

    $iframe.attr('src', src.replace('autoplay=0', 'autoplay=1'));
  });


  $('.lightbox__closed, .lightbox__black-overlay').click(function(e) {
    e.preventDefault();
    
    $('.lightbox').removeClass('toggle__trigger').fadeOut(300);
    $('.lightbox__black-overlay').removeClass('toggle__trigger').fadeOut(300);

    var $iframe = $('.lightbox__video');
    var src = $iframe.attr('src');

    $iframe.attr('src', src.replace('autoplay=1', 'autoplay=0'));
  });

  function handleFooter() {
    $(".UNI-footer-clone").remove();
    const thirdSlide = document.querySelectorAll(".swiper-slide")[8];

    if (thirdSlide && !thirdSlide.querySelector(".UNI-footer-clone")) {
      $(".UNI-footer")
        .clone()
        .addClass("UNI-footer-clone")
        .appendTo(thirdSlide)
        .css({
          "z-index": 100,
          bottom: 0,
          position: "absolute",
          width: "100%",
          height: "80px",
        });
    }

    $(".UNI-footer-clone").fadeIn();
  }

  function handleResponsiveSwiper() {
    if (window.innerWidth > 1200) {
      if (!swiper) initSwiper();
    } else {
      destroySwiper();
    }
    handleFooter();
  }

  bindEvents();
  handleResponsiveSwiper();
  window.addEventListener("resize", handleResponsiveSwiper);
});


window.addEventListener("load", function () {
  function handleMobileScroll() {
    if (window.innerWidth <= 768) {
      $(".kv-section__scroll").click(function (event) {
        event.preventDefault();

        var target = $(this).attr("href");

        $("html, body").animate(
          {
            scrollTop: $(target).offset().top,
          },
          1000
        );
      });
    }
  }

  // 呼叫手機滾動效果
  handleMobileScroll();

  // 當窗口尺寸改變時重新檢查是否為手機版
  window.addEventListener("resize", handleMobileScroll);
});



// laoding 畫面
document.addEventListener("DOMContentLoaded", function() {
  var progressBar = document.querySelector('.loading__progress');

  // 設定進度條寬度
  setTimeout(function() {
    progressBar.style.width = '100%';
  }, 100);

  // 載入完成隱藏畫面
  setTimeout(function() {
    document.getElementById('loading').style.display = 'none';
  }, 600);
});


$('.menu-slide__button, .menu-slide__closed').click(function() {
  $('.menu-slide').toggleClass('open');
  $('.menu-slide__button').toggleClass('btn-menu');
});

