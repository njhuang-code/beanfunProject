// Swiper js

var swiper = new Swiper(".swiper-container", {
  slidesPerView: 4,
  spaceBetween: 16,
});

$(function () {
  $("#gotop").click(function () {
      jQuery("html,body").animate({
          scrollTop: 0
      }, 500);
  });
  $(window).scroll(function () {
      if ($(this).scrollTop() > 0) {
          $('#gotop').fadeIn("slow");
      } else {
          $('#gotop').stop().fadeOut("slow");
      }
  });
});





// laoding 畫面
// document.addEventListener("DOMContentLoaded", function() {
//   var progressBar = document.querySelector('.loading__progress');

//   // 設定進度條寬度
//   setTimeout(function() {
//     progressBar.style.width = '100%';
//   }, 100);

//   // 載入完成隱藏畫面
//   setTimeout(function() {
//     document.getElementById('loading').style.display = 'none';
//   }, 600);
// });

$(document).ready(function() {

  function scrollToSection(section) {
    $("html, body").animate({
      scrollTop: $(section).offset().top
    }, 500);
  }

  function updateActiveNav(index) {
    $('.menu-nav__item').removeClass('active');
    $('.menu-nav__item').eq(index).addClass('active');
  }

  $('.menu-nav__name').click(function(e) {
    e.preventDefault();
    
    var $this = $(this);
    var section = $this.attr("href");
    var index = $this.index('.menu-nav__name');

    scrollToSection(section);
    updateActiveNav(index);
  });

  $('.kv-section__scroll-down').click(function(e) {
    e.preventDefault();
    
    var section = '#sectionResent'; 
    var targetIndex = $('.menu-nav__name[href="' + section + '"]').index('.menu-nav__name');

    scrollToSection(section);
    updateActiveNav(targetIndex);
  });

  $(window).scroll(function() {
    var scrollPosition = $(window).scrollTop();

    $('.menu-nav__name').each(function(index) {
      var section = $($(this).attr('href'));
      var sectionTop = section.offset().top - 10;
      var sectionHeight = section.outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        updateActiveNav(index);
        return false;
      }
    });
  });

  $(window).on('scroll', function() {
    var sectionPowerTop = $('#sectionPower').offset().top;
    var sectionPowerBottom = sectionPowerTop + $('#sectionPower').outerHeight();
    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height();
    var video = $('.s3-section__video').get(0);

    if (scrollTop + windowHeight >= sectionPowerTop && scrollTop <= sectionPowerBottom) {
        if (video && video.paused) {
            video.currentTime = 0; // 將播放位置重設為 0
            video.play();
        }
    } else {
        if (video && !video.paused) {
            video.pause();
        }
    }
});



  $('.menu-slide__button, .menu-slide__closed').click(function() {
    $('.menu-slide').toggleClass('open');
    $('.menu-slide__button').toggleClass('btn-menu');
  });

  // 播放影音彈窗
  $('.kv-section__play-btn').click(function(e) {
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

});

$(document).ready(function() {

  var $bgMap = $('.s4-section__bg-map');
  var isDragging = false;
  var startX, offsetX;
  var translateX = -932; // 起始顯示位置 translateX 值
  var imageWidth = 2560; 
  var imageHeight = 1393; 

  function setDimensions() {
    $bgMap.css({
      'width': imageWidth + 'px',
      'height': imageHeight + 'px',
      'overflow': 'hidden'
    });
  }

  function updateTranslateX() {
    var containerWidth = $bgMap.parent().width();
    var maxTranslateX = 0;
    var minTranslateX = containerWidth - imageWidth;

    translateX = Math.min(maxTranslateX, Math.max(minTranslateX, translateX));
    $bgMap.css('transform', 'translate3d(' + translateX + 'px, 0px, 0px)');
  }

  function calculateTranslateX() {
    var width = window.innerWidth;
    // 根據裝置尺寸定位起始位置
    if (width > 1440) {
      translateX = -900; 
    } else if (width > 1200) {
      translateX = -800; 
    } else if (width > 960) {
      translateX = -1077; 
    } else {
      translateX = 0;
    }

    updateTranslateX();
  }

  function enableDragging() {
    $bgMap.on('mousedown touchstart', function(e) {
      isDragging = true;
      startX = e.clientX || e.originalEvent.touches[0].clientX;
      $('.s4-section__bg-map').css('cursor', 'grabbing');
    });

    $(document).on('mousemove touchmove', function(e) {
      if (isDragging) {
        e.preventDefault();
        offsetX = (e.clientX || e.originalEvent.touches[0].clientX) - startX;
        startX = e.clientX || e.originalEvent.touches[0].clientX;
        translateX += offsetX;
        updateTranslateX();
      }
    });

    $(document).on('mouseup touchend', function() {
      isDragging = false;
      $('.s4-section__bg-map').css('cursor', 'grab');
    });
  }

  function disableDragging() {
    $bgMap.off('mousedown touchstart mousemove touchmove mouseup touchend');
    $('.s4-section__bg-map').css('cursor', 'default');
    $bgMap.css({ 'width': '', 'height': '', 'transform': '' });
  }
  // 大於 960 px 以上，可以拖移
  function checkScreenWidth() {
    if (window.innerWidth > 960) { 
      setDimensions();
      calculateTranslateX();
      enableDragging();
    } else {
      disableDragging();
    }
  }

  checkScreenWidth();
  $(window).resize(checkScreenWidth);

  var $background = $('.s4-section__bg');
    var backgroundOffset = $background.offset().top;

    $(window).on('scroll', function() {
        var scrollTop = $(this).scrollTop();

        if (scrollTop + $(window).height() > backgroundOffset) {
            $background.addClass('active');
        } else {
            $background.removeClass('active');
        }
    });
});