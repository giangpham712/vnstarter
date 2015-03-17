(function ($) {

    $(document).ready(function () {

        $("#pledge-confirmation").on("", function() {

        });

        $('#project_pledge form').submit(function (e) {
            e.preventDefault();

            var form = this;
            submitFormAjax(form, function (result) {
                if (result.success) {
                    $("#pledge-confirmation").modal("show");
                }

            }, function (result) {
                console.log(result);

            });

        });

    });

})(jQuery);
