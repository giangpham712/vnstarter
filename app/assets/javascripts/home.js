//= require slick-carousel

$(document).ready(function () {
    $('.jumbotron.slider').slick({
        dots: !0,
        infinite: !0,
        speed: 800,
        fade: !0,
        autoplay: !0,
        pauseOnHover: !1,
        autoplaySpeed: 4500
    });

    // Create a clone of the menu, right next to original.


    $('.sticky-nav').addClass('original').clone().insertAfter('.sticky-nav').addClass('cloned').css('position', 'fixed').css('top', '0').css('margin-top', '0').css('z-index', '500').removeClass('original').hide();

    scrollIntervalID = setInterval(stickIt, 10);

    function stickIt() {

        if ($(".original").length > 0) {
            var orgElementPos = $('.original').offset();
            orgElementTop = orgElementPos.top;

            if ($(window).scrollTop() >= (orgElementTop)) {

                orgElement = $('.original');
                coordsOrgElement = orgElement.offset();
                leftOrgElement = coordsOrgElement.left;
                widthOrgElement = orgElement.css('width');
                $('.cloned').css('left', leftOrgElement + 'px').css('top', 0).css('width', widthOrgElement).show();
                $('.original').css('visibility', 'hidden');
            } else {

                $('.cloned').hide();
                $('.original').css('visibility', 'visible');
            }
        }

    }


});