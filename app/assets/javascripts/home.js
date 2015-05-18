//= require slider-revolution/src/js/jquery.themepunch.plugins.min
//= require slider-revolution/src/js/jquery.themepunch.revolution
//= require slick-carousel

$(document).ready(function () {


    jQuery('.fullwidthbanner').show().revolution(
        {
            dottedOverlay:"none",
            delay: 9000,
            startwidth: 1170,
            startheight: 470,
            hideThumbs:200,

            thumbWidth:100,
            thumbHeight:50,
            thumbAmount:5,

            navigationType:"none",
            navigationArrows:"solo",
            navigationStyle:"square",

            touchenabled:"on",
            onHoverStop:"on",

            swipe_velocity: 0.7,
            swipe_min_touches: 1,
            swipe_max_touches: 1,
            drag_block_vertical: false,

            parallax:"mouse",
            parallaxBgFreeze:"on",
            parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

            keyboardNavigation:"off",

            navigationHAlign:"center",
            navigationVAlign:"bottom",
            navigationHOffset:0,
            navigationVOffset:20,

            soloArrowLeftHalign:"left",
            soloArrowLeftValign:"center",
            soloArrowLeftHOffset:0,
            soloArrowLeftVOffset:0,

            soloArrowRightHalign:"right",
            soloArrowRightValign:"center",
            soloArrowRightHOffset:0,
            soloArrowRightVOffset:0,

            shadow:0,
            fullWidth:"on",
            fullScreen:"off",

            spinner:"spinner4",

            stopLoop:"off",
            stopAfterLoops:-1,
            stopAtSlide:-1,

            shuffle:"off",

            autoHeight:"off",
            forceFullWidth:"off",



            hideThumbsOnMobile:"off",
            hideNavDelayOnMobile:1500,
            hideBulletsOnMobile:"off",
            hideArrowsOnMobile:"off",
            hideThumbsUnderResolution:0,

            hideSliderAtLimit:0,
            hideCaptionAtLimit:0,
            hideAllCaptionAtLilmit:0,
            startWithSlide:0,
            videoJsPath:"js/revolution-slider/videojs/",
            fullScreenOffsetContainer: ""
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