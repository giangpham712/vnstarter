"use strict";

jQuery(document).ready(function ($) {


    if (Function('/*@cc_on return document.documentMode===10@*/')()) {
        document.documentElement.className += ' ie10';
    }

    $('.navigation').AXMenu({
        showArrowIcon: true, // true for showing the menu arrow, false for hide them
        firstLevelArrowIcon: '',
        menuArrowIcon: ""
    });

    if ($("html").hasClass("lt-ie9")) {

        //bread crumb last child fix for IE8
        $('.navigation > li:last-child').addClass('last-child-nav');
    }

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

    hideLoading();
});


function hideLoading() {
       $('.hide-until-loading').removeClass('hide-until-loading');
}

