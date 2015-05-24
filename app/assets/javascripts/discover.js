(function($) {

    $(function() {

        var sliderContainer = $(".slider-container");
        var slider = sliderContainer.find(".slider-vertical");
        var sliderNavigation = sliderContainer.find(".slider-nav");

        slider.slick({
            vertical: true,
            arrows: false
        });

        sliderNavigation.find("li").click(function() {
            var itemIndex = $(this).data("item-index");
            slider.slick("slickGoTo", itemIndex);
        });

    });

})(jQuery)