// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-fileupload/basic
//= require bootstrap
//= require moment/min/moment-with-locales
//= require bootstrap3-datetimepicker
//= require angular
//= require angular-animate
//= require angular-ui-router
//= require accountingjs/accounting
//= require autoNumeric
//= require_tree .

(function ($) {

    $(function () {
        $(".user-menu > li > a").click(function () {
            $(this).toggleClass("active");
            $(".user-menu .user-dropdown").toggle();
        });

        $(document).mouseup(function(e) {

            var user_menu = $(".user-menu");
            if (!user_menu.is(e.target) && user_menu.has(e.target).length === 0)
            {
                $(".user-menu > li > a").removeClass("active")
                $(".user-menu .user-dropdown").hide();
            }
        });
    });

})(jQuery);
