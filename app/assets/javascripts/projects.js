var vst = vst | {};

(function ($) {
    $(function () {

        $("input.duration").autoNumeric('init', {
            aSep: ".",
            aDec: ",",
            mDec: 0,
            lZero: "deny",
            vMin: "1",
            vMax: "90"
        })

        $(".modal").on("hide.bs.modal", function () {
            $(this).find("form").trigger('reset')
        });

        $("#send-message form").submit(function (e) {
            e.preventDefault();
            var form = this;
            sendMessage(form);
        });

        $("#pledge_money li").click(function (e) {
            var amount = $(e.target).data("amount");
            var project_id = $("#project_id").val();
            window.location.href = "/projects/" + project_id + "/pledges/new?amount=" + amount;
        });

        $("#add_comment").click(function (e) {
            $('#new_comment').submit();
        });

        $('#new_comment').submit(function (e) {
            var form = this;

            var user_name = $(".user-menu").find("input[name=user_name]").val();
            var user_image_url = $(".user-menu").find("input[name=user_image_url]").val();

            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                data: $(form).serialize(),
                success: function (data) {
                    var html = "<li class='comment'>";
                    html += "<div class='comment-content'>";
                    html += "<div class='user-avatar'>";
                    html += "<img src='" + user_image_url + "' alt='' class='circle avatar-small'/>";
                    html += "</div>";
                    html += "<div class='comment-details'>";
                    html += "<div><span class='user-name'>" + user_name + "</span>";
                    html += "<span class='comment-date'>cách đây vài giây</span></div>";
                    html += "<div class='comment-body'>" + data.comment.body + "</div></div></div></li>";

                    $('.comments').append($(html));

                    form.reset();

                }
            });
            e.preventDefault();
        });

    });

    function sendMessage(form) {
        submitFormAjax(form, function (result) {

            if (result.success) {
                form.reset();
                $(form).find(".alert-success").show();
            } else {
                $(form).find(".errors").show();
                var $errors_list = $(form).find(".errors ul");
                $errors_list.html("");
                $.each(result.errors, function (i, e) {
                    $("<li>" + e + "</li>").appendTo($errors_list);
                });
            }

        }, function (result) {

        });
    }

})(jQuery);


function submitFormAjax(form, done, fail) {
    var url = form.action;
    var method = form.method;
    var formData = new FormData($(form)[0]);

    $(form).find(".alert").hide();

    var request = $.ajax({
        url: url,
        type: method,
        data: formData,
        cache: false,
        contentType: false,
        processData: false

    });


    request.done(done);
    request.fail(fail);
}
