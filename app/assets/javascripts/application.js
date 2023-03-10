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
//= require angular
//= require angular-resource
//= require angular-route
//= require angularjs-rails-resource
//= require angular-rails-templates
//= require jquery.scrollTo/jquery.scrollTo
//= require jquery.localScroll/jquery.localScroll
//= require underscore
//= require moment
//= require moment-timezone
//= require moment/locale/vi
//= require bootstrap
//= require bootstrap3-datetimepicker
//= require accountingjs/accounting
//= require autoNumeric
//= require_directory .
//= require_tree ./angular
//= require_tree ../templates

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

        $.localScroll({
            filter:'.smoothScroll',
            offset: {
                top: -74
            }
        });
    });

})(jQuery);
