/* Функция проверки существования элемента */
$.fn.ex = function () {
    return $(this).length;
};
/* Функция проверки существования элемента */

/* Функция для animate.css */
$.fn.extend({
    animateCss: function (animationName) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function () {
            $(this).removeClass('animated ' + animationName);
        });
    }
});
/* Функция для animate.css */

/* Функция для переключения текста */
$.fn.extend({
    toggleText: function (a, b) {
        var that = this;
        if (that.text() != a && that.text() != b) {
            that.text(a);
        } else
        if (that.text() == a) {
            that.text(b);
        } else
        if (that.text() == b) {
            that.text(a);
        }
        return this;
    }
});
/* Функция для переключения текста */


/* Функция определения направления скролла */

function addEvent(elem, type, handler) {
    if (elem.addEventListener) {
        elem.addEventListener(type, handler, false);
    } else {
        elem.attachEvent('on' + type, handler);
    }
    return false;
}
function scrollDirection() {
    var weelEvt = (/Firefox/i.test(navigator.userAgent)) ? 'DOMMouseScroll' : 'mousewheel',
            el = document.body;
    addEvent(el, weelEvt, function (e) {
        var evt = e.originalEvent ? e.originalEvent : e,
                delta = evt.detail ? evt.detail * (-40) : evt.wheelDelta
        $scrollDirection = delta > 0 ? 'up' : 'down';
    });
}

/* Функция определения направления скролла */

/* Анимация цифр */

function numberAnimation() {
    $('.number-animation').prop('contador', 0).animate({
        contador: $('.number-animation').text()
    }, {
        duration: 1000,
        easing: 'swing',
        step: function (now) {
            // Verificar si es decimal o no
            var numText = ($('.number-animation').text() % 1 !== 0 ? now.toFixed(1) : Math.round(now));
            $('.number-animation').text(numText);
        }
    });
}

/* Анимация цифр */

$(document).ready(function () {

    $fixed = false;
    $subFixed = false;
    $scroll = 0;

    /* Foundation */
    $(document).foundation();

    $('[data-drilldown]').on('open.zf.drilldown', function () {
        var $this = $(this);
        var opened = $this.find('.is-active');
        opened.find('.menu-category').text(opened.attr('data-title'));
        $this.closest('.is-drilldown').css('min-height', opened.outerHeight() + 'px');
        $('.all-menu, .mobile-nav .header-phones').hide();
    });
    $('[data-drilldown]').on('hide.zf.drilldown', function () {
        var $this = $(this);
        $('.all-menu, .mobile-nav .header-phones').show();
        $this.closest('.is-drilldown').css('min-height', '0px');
    });

    /* Параллакс баннер */
    if ($('.parallax-bg').ex()) {
        $('.parallax-bg').parallaxBackground();
    }

    /* Главный баннер */
    if ($('.banner-slider').ex()) {
        $('.banner-slider').slick({
            prevArrow: '.banner-controls__prev',
            nextArrow: '.banner-controls__next'
        });
    }

    /* Слайдер работ на главной */
    if ($('.works-main__slider').ex()) {
        $('.works-main__slider').slick({
            prevArrow: '.works-main__prev',
            nextArrow: '.works-main__next',
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    /* Табы на мобиле */
    if (device.mobile() && $('.guide').ex()) {
        $('.guide .tabs').slick({
            variableWidth: true,
            arrows: false,
            infinite: false
        });
    }

    /* Сабкатегории на мобиле */
    if (device.mobile() && $('.category-submenu').ex()) {
        $('.category-submenu ul').slick({
            variableWidth: true,
            arrows: false,
            infinite: false
        });
    }

    /* Фильтр новостей на мобиле */
    if (device.mobile() && $('.news-filter').ex()) {
        $('.news-filter .container').slick({
            variableWidth: true,
            arrows: false,
            infinite: false
        });
    }

    /* Фильтр на мобиле */
    if (device.mobile() && $('.faq-sort').ex()) {
        $('.faq-sort .container').slick({
            variableWidth: true,
            arrows: false,
            infinite: false
        });
    }

    /* Меняем текст на кнопке */
    if (device.mobile() && $('.callback-main').ex()) {
        $('.callback-main').find('input[type="submit"]').val('Заказать');
    }

    /* Object fit for IE */
    $(function () {
        objectFitImages();
    });

    /*Выравнивание в рассчете колонок*/
    if ($('.calculation-form').ex()) {
        $('.calculation-form .left, .calculation-form .right').matchHeight();
    }

    /* Направление скролла */
    $(function () {
        scrollDirection();
    });

    /* Отметки проскролливания страницы */
    if ($('.scrollDetect').ex() && !device.mobile()) {
        $('.scrollDetect').find('li').each(function () {
            var $this = $(this);
            var ind = 'li:nth-child(' + ($this.index() + 1) + ')';
            var li = $('.scrollWidth').find(ind);
            $this.css({
                zIndex: $this.index(),
                width: li.offset().left + ((li.width() / 2) - 20) + 'px'
            });
            if ($this.index() + 1 == $('.scrollDetect').find('li').length) {
                $this.css('width', '100%');
            }
        });
    }

    /* Выравнивание кнопок в банере на мобиле */
    if (device.mobile() && $('.banner-text').ex()) {
        var btn = $('.banner-text').find('.btn');
        if (btn.length >= '2') {
            var width = 0;
            btn.each(function () {
                var current = $(this);
                if (current.outerWidth() > width) {
                    width = current.outerWidth();
                }
            });
            if (width > (($(window).width() - 60) / 2)) {
                btn.css('width', width + 'px').addClass('aligned');
            }
        }
    }

    /* Слайдер в карточках */
    if ($('.works-item__img.slides').ex()) {
        $('.works-item__img.slides').slick({
            slidesToShow: 1,
            arrows: false,
            dots: true
        });
    }

    /* Слайдер в отзывах */
    if ($('.reviews-item__img.slides').ex()) {
        $('.reviews-item__img.slides').slick({
            slidesToShow: 1,
            arrows: false,
            dots: true
        });
    }

    /* Слайдер в проекте */
    if ($('.project-images').ex() && device.mobile()) {
        $('.project-images').slick({
            slidesToShow: 1,
            arrows: true,
            dots: false,
            prevArrow: '<button type="button" class="slick-prev"><i class="icon-arrow-left"></i></button>',
            nextArrow: '<button type="button" class="slick-next"><i class="icon-arrow-right"></i></button>'
        });
    }

    /* Слайдер текстовый */
    if ($('.text-slider').ex()) {
        $('.text-slider__slider').slick({
            slidesToShow: 3,
            variableWidth: true,
            infinite: true,
            dots: false,
            centerMode: false,
            prevArrow: '.text-slider__controls__prev',
            nextArrow: '.text-slider__controls__next',
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: false,
                        adaptiveHeight: true
                    }
                }
            ]
        });
    }

    /* Сравнение картинок */
    if ($('.twentytwenty-start').ex()) {
        $(".twentytwenty-start").twentytwenty();
    }

}).on('init', '.text-slider__slider', function (slick) {
    var $this = $(this);
    $this.find('.slick-list').css('padding-left', $('.container').offset().left + 'px');
    if (!device.mobile()) {
        $this.find('.slick-slide').matchHeight();
    }
}).on('afterChange', '.text-slider__slider', function (slick, currentSlide) {
    var $this = $(this);
    $this.closest('.text-slider').find('.text-slider-count').text(+$this.find('.slick-current').attr('data-slick-index') + 1);
}).on('afterChange', '.banner-slider', function (slick, currentSlide) {
    var $this = $(this);
    $this.closest('.banner').find('.banner-count').text(+$this.find('.slick-current').attr('data-slick-index') + 1);
}).on('change', '.checkbox input', function () {
    var $this = $(this);
    $this.closest('label').toggleClass('checked');
}).on('scroll', document, function () {
    var $this = $(this);
    var header = $('.header');
    if ($this.scrollTop() >= header.outerHeight() && !$fixed) {
        header.addClass('fixed');
        $('body').css('padding-top', header.outerHeight() + "px");
        $fixed = true;
    } else if ($this.scrollTop() < header.outerHeight() && $fixed) {
        header.removeClass('fixed');
        $('body').css('padding-top', "0px");
        $fixed = false;
    }
    if ($('.category-submenu').ex() && !$subFixed && $this.scrollTop() >= $('.category-submenu').position().top) {
        $subs = $('.category-submenu');
        $offSub = $('.category-submenu').position().top;
        $subs.addClass('fixed').css('top', $('.header').outerHeight() + 'px');
        $subFixed = true;
    } else if ($subFixed && $this.scrollTop() < $offSub) {
        $subs.removeClass('fixed');
        $subFixed = false;
    }
}).on('click', '.menu-toggle', function (e) {
    var $this = $(this);
    $('body').toggleClass('stop');
    $('.mobile-nav').toggleClass('is-open');
    e.preventDefault();
}).on('click', '.minus', function () {
    var $this = $(this);
    $this.closest('div').find('input').val(+$this.closest('div').find('input').val() - 1);
}).on('click', '.plus', function () {
    var $this = $(this);
    $this.closest('div').find('input').val(+$this.closest('div').find('input').val() + 1);
}).on('click', '.block input', function () {
    $(this).select();
}).on('down.zf.accordion', '.accordion', function () {
    var $this = $(this);
    $this.find('.accordion-item').not('.is-active').find('.accordion-title span').removeClass('hidden');
    $this.find('.is-active').find('.accordion-title span').addClass('hidden');
}).on('click', '.close-accordion', function () {
    var $this = $(this);
    var content = $this.closest('.accordion-content');
    var accordion = $this.closest('.accordion');
    $this.closest('.accordion-item').find('.accordion-title span').removeClass('hidden')
    $(accordion).foundation('up', content);
}).on('update.zf.magellan', function (e) {
    if ($(document).scrollTop() >= $scroll) {
        $('.scrollDetect').find('.is-active').css('background', '#000');
    } else if ($(document).scrollTop() < $scroll) {
        $('.scrollDetect').find('.is-active').css('background', 'transparent');
    }
    $scroll = $(document).scrollTop();
}).on('touchstart', '.works-filter__header p', function () {
    var $this = $(this);
    $this.closest('.works-filter').find('.works-filter__body').slideToggle();
    $('.clear-filter__mobile').slideToggle();
}).on('click tap', '.js-form__toggle', function () {
    var $this = $(this);
    $this.closest('form').find('.js-form__toggled').slideToggle();
    $this.find('span').toggleText('Добавить данные о заказе — размеры, примеры и тп', 'Скрыть даннные');
}).on('click', '.js-show-block', function (e) {
    var $this = $(this);
    $this.closest('div').find($this.attr('data-show-block')).toggleClass('active');
}).on('change', '.add-file input', function (e) {
    var $this = $(this);
    $this.closest('.add-file').find('span').text(e.target.files[0].name);
}).on('click', '.mobile-nav', function (e) {
    var $this = $(this);
    var menu = $('.mobile-menu');
    if (!menu.is(e.target)
            && menu.has(e.target).length === 0) {
        $this.removeClass('is-open');
    }
}).on('change', '.calculation-form input', function () {
    numberAnimation();
});
