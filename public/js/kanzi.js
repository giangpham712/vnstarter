"use strict";

jQuery(document).ready(function ($) {


    if (Function('/*@cc_on return document.documentMode===10@*/')()) {
        document.documentElement.className += ' ie10';
    }

    $('.searchbox .searchbox-icon,.searchbox .searchbox-inputtext').bind('click', function () {
        var $search_tbox = $('.searchbox .searchbox-inputtext');
        $search_tbox.css('width', '120px');
        $search_tbox.focus();
        $('.searchbox', this).addClass('searchbox-focus');
    });

    //Blur
    $('.top-bar .searchbox-inputtext,body').bind('blur', function () {
        var $search_tbox = $('.searchbox .searchbox-inputtext');
        $search_tbox.css('width', '0px');
        $('.searchbox', this).removeClass('searchbox-focus');
    });

    $("a[data-rel^='prettyPhoto']").prettyPhoto({
        animation_speed: 'fast', /* fast/slow/normal */
        slideshow: 5000, /* false OR interval time in ms */
        autoplay_slideshow: false, /* true/false */
        opacity: 0.80  /* Value between 0 and 1 */
    });


    $('.navigation').AXMenu({
        showArrowIcon: true, // true for showing the menu arrow, false for hide them
        firstLevelArrowIcon: '',
        menuArrowIcon: ""
    });

    $('.header .mobile-nav ').append($('.navigation').html());
    $('.header .mobile-nav li').bind('click', function (e) {

        var $this = $(this);
        var $ulKid = $this.find('>ul');
        var $ulKidA = $this.find('>a');

        if ($ulKid.length === 0 && $ulKidA[0].nodeName.toLowerCase() === 'a') {
            window.location.href = $ulKidA.attr('href');
        }
        else {
            $ulKid.toggle(0, function () {
                if ($(this).css('display') === 'block') {
                    $ulKidA.find('.icon-chevron-down').removeClass('icon-chevron-down').addClass('icon-chevron-up');
                }
                else {
                    $ulKidA.find('.icon-chevron-up').removeClass('icon-chevron-up').addClass('icon-chevron-down');
                }
            });
        }

        e.stopPropagation();

        return false;
    });

    $('body').append('<div id="to-top-button"> <i class="fa fa-angle-up"></i> </div>');

    $('#to-top-button').click(function () {
        $('body,html').animate({
            scrollTop: 0
        });
    });


    /* Info Box Listeners */
    $('.alert a.alert-remove').click(function () {
        $(this).parents('.alert').first().fadeOut();
        return false;
    });

    $(window).resize(function () {
        centeringBullets();
    });

    if ($("html").hasClass("lt-ie9")) {

        //bread crumb last child fix for IE8
        $('.breadcrumbs li:last-child').addClass('last-child');
        $('.navigation > li:last-child').addClass('last-child-nav');
        $('.flickr_badge_wrapper .flickr_badge_image').addClass('flicker-ie');
        $('.flickr_badge_wrapper .flickr_badge_image:nth-child(3n+1)').addClass('last-child-flicker');
        $('.content-style3 ').css('width', '100%').css('width', '-=28px');
        $('.section-subscribe input[type=text]').css('width', '100%').css('width', '-=40px');
        $('.blog-search .blog-search-input').css('width', '100%').css('width', '-=40px');

        $('.tab').click(function () {
            setTimeout(function () {
                $('.content-style3 ').css('width', '100%').css('width', '-=28px');
                $('.section-subscribe input[type=text]').css('width', '100%').css('width', '-=40px');
            }, 500);

        });
    }
    ;

    centeringBullets();
});


/* Portfolio */

var loaded = false, timeout = 20000;//loaded flag for timeout
setTimeout(function () {
    if (!loaded) {
        hideLoading();
    }
}, timeout);

$(window).load(function () {
    loaded = true;
    centeringBullets();
    hideLoading();
});


function hideLoading() {
    $('.loading-container').remove();
    $('.hide-until-loading').removeClass('hide-until-loading');
}

function centeringBullets() {
    //Bullets center fixing in revolution slide
    $('.simplebullets,.slider-fixed-frame .home-bullets').each(function () {
        var $this = $(this), w = $this.width();
        $this.css('margin-left', -(w / 2) + 'px');
    });
}
