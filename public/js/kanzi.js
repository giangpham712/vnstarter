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

