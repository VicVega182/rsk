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

/* Функции для меню Амазон */

function activateSubmenu(row) {
    var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId);
    $submenu.css({
        display: "block"
    }).animateCss('fadeIn');
}

function deactivateSubmenu(row) {
    var $row = $(row),
            submenuId = $row.data("submenuId"),
            $submenu = $("#" + submenuId);
    $submenu.css("display", "none");
}

/* Функции для меню Амазон */

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


$(document).ready(function () {

    /* Меню как амазон */
    $menu = $('#mainUl');
    $menu.menuAim({
        activate: activateSubmenu,
        deactivate: deactivateSubmenu,
        enter: function (e) {
            var par = $("#" + e.id);
            par.find('.submenu').css('display', 'block');
        },
        exitMenu: function (e) {
            if (e.id == 'mainUl') {
                $('#mainUl .submenu').css('display', 'none');
            }
        },
        rowSelector: '> li',
        submenuDirection: "below"
    });

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
});
