window.addEventListener("load", function () {
  let swiper = null;

  function handleSwiper() {
    if (window.innerWidth > 768) {
      if (!swiper) {
        swiper = new Swiper(".section-slide", {
          direction: "vertical",
          slidesPerView: 1,
          spaceBetween: 0,
          mousewheel: true,
          autoHeight: true,
          pagination: {
            el: ".swiper-pagination",
            clickable: true,
          },
          on: {
            init: function () {
              handleSlideAnimations(this.activeIndex);
            },
            slideChangeTransitionStart: function () {
              handleSlideAnimations(this.activeIndex);
            },
          },
        });
      }
    } else {
      if (swiper) {
        swiper.destroy(true, true);
        swiper = null;
      }
    }
  }

  function handleSlideAnimations(activeIndex) {
    const slides = document.querySelectorAll(".swiper-slide");

    slides.forEach((slide, index) => {
      const animatedElements = slide.querySelectorAll(".animate");

      if (index === activeIndex) {
        animatedElements.forEach((el) => {
          el.classList.add("animate_active");
        });
      } else {
        animatedElements.forEach((el) => {
          el.classList.remove("animate_active");
        });
      }
    });
  }

  // 點擊連結後滑動到對應的 Swiper 頁面
  $(".kv-section__scroll").click(function (event) {
    event.preventDefault();

    var target = $(this).attr("href");

    if (swiper && target === "#sectionSec") {
      swiper.slideTo(1);
    }
  });

  handleSwiper();

  window.addEventListener("resize", handleSwiper);
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

