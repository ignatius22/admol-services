/*-----------------------------------------------------------------------------------

    Template Name: Boltx

    Note: This is Custom Js file

-----------------------------------------------------------------------------------

    [Table of contents]

      01. mobile-nav
      02. search-box-outer
      03. countTo
      04. accordion-item 
      05. progress
      06. scrollTop
      07. #desktop-menu
      08. c-slider
      09. hero-one-slider
      10. clients-slider
      11. project-slider
      12. latest-projects-slider
      13. hero-three-slider
      14. hero-two-slider
      15. client-reviews-slider
      16. progressbar
      17. progress_bar 

-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($){
/*-------------------- 01. mobile-nav ----------------------------*/
jQuery('.mobile-nav .menu-item-has-children').on('click', function(e) {
      if ( jQuery( this ).hasClass('active') ) {
            jQuery(this).removeClass('active');
          } else {
            jQuery( '.mobile-nav .menu-item-has-children' ).removeClass('active');
            jQuery(this).addClass('active');
          }
        }); 
        jQuery('#nav-icon4').click(function($){
            jQuery('#mobile-nav').toggleClass('open');
        });
        jQuery('#res-cross').click(function($){
           jQuery('#mobile-nav').removeClass('open');
        });
          jQuery('.bar-menu').click(function($){
            jQuery('#mobile-nav').toggleClass('open');
            jQuery('#mobile-nav').toggleClass('hmburger-menu');
            jQuery('#mobile-nav').show();
        });
        jQuery('#res-cross').click(function($){
           jQuery('#mobile-nav').removeClass('open');
        });
});
/*-------------------- 02. search-box-outer ----------------------------*/ 
    if($('.search-box-outer').length) {
        $('.search-box-outer').on('click', function() {
            $('body').addClass('search-active');
        });
        $('.close-search').on('click', function() {
            $('body').removeClass('search-active');
        });
    }
/*-------------------- 03. countTo ----------------------------*/
/* 07. countTo */ 
  $.fn.countTo = function(options) {
    options = options || {};

    return $(this).each(function() {
      
      var settings = $.extend(
        {},
        $.fn.countTo.defaults,
        {
          from: $(this).data("from"),
          to: $(this).data("to"),
          speed: $(this).data("speed"),
          refreshInterval: $(this).data("refresh-interval"),
          decimals: $(this).data("decimals")
        },
        options
      );
      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data("countTo") || {};

      $self.data("countTo", data);

      if (data.interval) {
        clearInterval(data.interval);
      }
      data.interval = setInterval(updateTimer, settings.refreshInterval);

      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;

        render(value);

        if (typeof settings.onUpdate === "function") {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          // remove the interval
          $self.removeData("countTo");
          clearInterval(data.interval);
          value = settings.to;

          if (typeof settings.onComplete === "function") {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0, // the number the element should start at
    to: 0, // the number the element should end at
    speed: 1000, // how long it should take to count between the target numbers
    refreshInterval: 100, // how often the element should be updated
    decimals: 0, // the number of decimal places to show
    formatter: formatter, // handler for formatting the value before rendering
    onUpdate: null, // callback method for every time the element is updated
    onComplete: null // callback method for when the element finishes updating
  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }

jQuery(function($) {
  // custom formatting example
  $(".count-number").data("countToOptions", {
    formatter: function(value, options) {
      return value
        .toFixed(options.decimals)
        .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
    }
  });

  /* start all the timers */
  $(".timer").each(count);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data("countToOptions") || {});
    $this.countTo(options);
  }
});

// count end

/*-------------------- 04. accordion-item ----------------------------*/ 

  $('.accordion-item .heading').on('click', function(e) {
    e.preventDefault();

    if($(this).closest('.accordion-item').hasClass('active')) {
        $('.accordion-item').removeClass('active');
    } else {
        $('.accordion-item').removeClass('active');

        $(this).closest('.accordion-item').addClass('active');
    }
    var $content = $(this).next();
    $content.slideToggle(100);
    $('.accordion-item .content').not($content).slideUp('fast');
  });

// end
/*-------------------- 05. progress ----------------------------*/ 
var bars = document.querySelectorAll('.meter > span');

setInterval(function(){
  bars.forEach(function(bar){
    var getWidth = parseFloat(bar.dataset.progress);
    
    for(var i = 0; i < getWidth; i++) {
      bar.style.width = i + '%';
    }
  });
}, 700);
// progress end
 
/*-------------------- 06. scrollTop ----------------------------*/
function inVisible(element) {
  var WindowTop = $(window).scrollTop();
  var WindowBottom = WindowTop + $(window).height();
  var ElementTop = element.offset().top;
  var ElementBottom = ElementTop + element.height();
  if ((ElementBottom <= WindowBottom) && ElementTop >= WindowTop)
    animate(element);
}

function animate(element) {
  if (!element.hasClass('ms-animated')) {
    var maxval = element.data('max');
    var html = element.html();
    element.addClass("ms-animated");
    $({
      countNum: element.html()
    }).animate({
      countNum: maxval
    }, {
      duration: 5000,
      easing: 'linear',
      step: function() {
        element.html(Math.floor(this.countNum) + html);
      },
      complete: function() {
        element.html(this.countNum + html);
      }
    });
  }

}
/*-------------------- 07. #desktop-menu ----------------------------*/ 

$('#desktop-menu').click(function(){
        $(this).toggleClass('open');
        $('.desktop-menu').toggleClass('open');
    });
 
$(function() {
  $(window).scroll(function() {
    $("h2[data-max]").each(function() {
      inVisible($(this));
    });
  })
});
 let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  scrollProgress.addEventListener("click", () => {
    document.documentElement.scrollTop = 0;
  });
  scrollProgress.style.background = `conic-gradient(#009a4e ${scrollValue}%, #fff ${scrollValue}%)`;
};

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
// end

/*-------------------- 08. c-slider ----------------------------*/ 
    if ($(".c-slider")[0]){
        $('.c-slider').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
          draggable: false,
          waitForAnimate: true,
          lazyLoad: 'ondemand',
          fade: false,
          speed: 30000
        });
    }
    // C-Slider

    $('.next-slide').on('click', function() {
      var img_src = "";
      $('.next-slide.nav-active').removeClass('nav-active');
      $(this).addClass('nav-active');
      img_src = $(this).html();
      $('.slider-main-img').html(img_src);
      var slideno = $(this).data('slide');
      $('.c-slider').slick('slickGoTo', slideno - 1, true);
    });


/*-------------------- 09. hero-one-slider ----------------------------*/
    if (typeof Swiper !== 'undefined') {
      var swiper = new Swiper(".hero-one-slider", {
      slidesPerView: 1,
      loop: true,
      speed:1000,
      freeMode: true,
      effect: "fade",
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
/*-------------------- 10. clients-slider ----------------------------*/
    var swiper = new Swiper(".clients-slider", {
      slidesPerView: 5,
      spaceBetween: 30,
      loop: true,
      speed:1000,
      freeMode: true,
      autoplay: {
        delay: 2000,
      },
      breakpoints: {
        10: {
          slidesPerView: 1,
        },
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 6,
        },
      },
    });
/*-------------------- 11. project-slider ----------------------------*/
    var swiper = new Swiper(".project-slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      loop: true,
      speed:1000,
      freeMode: true,
      autoplay: {
        delay: 2000,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        1: {
          slidesPerView: 1,
        },
        556: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1200: {
          slidesPerView: 4,
        },
      },
    });
/*-------------------- 12. latest-projects-slider ----------------------------*/
    var swiper = new Swiper(".latest-projects-slider", {
      slidesPerView: 2,
      spaceBetween: 30,
      loop: true,
      speed:1000,
      freeMode: true,
      autoplay: {
        delay: 2000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        10: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
      },
    });
/*-------------------- 13. hero-three-slider ----------------------------*/
    var swiper = new Swiper(".hero-three-slider", {
      slidesPerView: 1,
      loop: true,
      speed:1000,
      freeMode: true,
      effect: "fade",
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
/*-------------------- 14. hero-two-slider ----------------------------*/
     if ($(".hero-two-slider")[0]){
      $('.hero-two-slider').slick({
        infinite: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2400,
        slidesToScroll: 1
      });
    }
/*-------------------- 15. client-reviews-slider ----------------------------*/
    var swiper = new Swiper(".client-reviews-slider", {
      slidesPerView: 1,
      loop: true,
      speed:1000,
      freeMode: true,
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

/*-------------------- 16. progressbar ----------------------------*/ 
  {
    function animateElements() {
      $('.progressbar').each(function () {
        var elementPos = $(this).offset().top;
        var topOfWindow = $(window).scrollTop();
        var percent = $(this).find('.circle').attr('data-percent');
        var percentage = parseInt(percent, 10) / parseInt(100, 10);
        var animate = $(this).data('animate');
        if (elementPos < topOfWindow + $(window).height() - 10 && !animate) {
          $(this).data('animate', true);
          $(this).find('.circle').circleProgress({
            startAngle: -Math.PI / 2,
            value: percent / 100,
            size: 180,
            thickness: 10,
            emptyFill: "rgba(250,250,250, .0)",
            fill: {
              color: '#009A4E'
            }
          }).on('circle-animation-progress', function (event, progress, stepValue) {
            $(this).find('div').text((stepValue*100).toFixed() + "%");
          }).stop();
        }
      });
    }

    // Show animated elements
    animateElements();
    $(window).scroll(animateElements);
  };

  //  progress_bar
/*-------------------- 17. progress_bar ----------------------------*/
$(document).ready(function(){
  progress_bar();
});

function progress_bar() {
  var speed = 30;
  var items = $('.progress_bar').find('.progress_bar_item');
  
    items.each(function() {
        var item = $(this).find('.progress');
        var itemValue = item.data('progress');
        var i = 0;
        var value = $(this);
    
        var count = setInterval(function(){
            if(i <= itemValue) {
                var iStr = i.toString();
                item.css({
                    'width': iStr+'%'
                });
                value.find('.item_value').html(iStr +'%');
            }
            else {
                clearInterval(count);
            }
            i++;
        },speed);
    });
}