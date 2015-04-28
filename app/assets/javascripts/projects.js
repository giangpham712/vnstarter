var vst = vst | {};

(function ($) {
    $(function () {

        var current_tab = "#basic";

        $("#edit_tabs a[data-toggle=tab]").on('shown.bs.tab', function (e) {
            var $tab = $(e.target);
            current_tab = $tab.attr("href");

            switch (current_tab) {
                case "#basic":
                case "#about_you":
                    $("#toolbar").show();
                    break;
                default:
                    $("#toolbar").hide();
                    break;
            }
        })

        $("#launch_project").click(function () {

            var project_id = $("#project_id").val();
            $("#saving-layer").show();
            var request = $.ajax({
                url: "/projects/" + project_id + "/launch_project",
                type: "POST"
            });

            request.done(function (result) {
                if (result.success) {
                    window.location.reload();
                } else {

                }
            });

            request.fail(function (result) {
                console.log(result);
            });
        });

        $(".attachment-upload").each(function (i, o) {
            var $ele = $(o).find("input.fileupload");
            var upload_url = $ele.data("upload-url");

            var $progress = $(o).find(".progress");
            var $error = $(o).find(".error");


            $ele.fileupload({
                url: upload_url,
                type: "POST",
                add: function (e, data) {
                    data.submit();
                },
                uploadTemplateId: null,
                downloadTemplateId: null,
                formData: function () {
                    return [];
                },
                start: function (e) {
                    $progress.removeClass("finished");
                    $(o).addClass("uploading");
                    $error.hide();
                },
                progressall: function (e, data) {
                    var progress = parseInt(data.loaded / data.total * 100, 10);

                    $progress.find(".bar").css("width", progress + "%");
                    if (progress == 100) {
                        $progress.addClass("finished");
                        $progress.find(".percentage").text("Processing...");
                    } else {
                        $progress.find(".percentage").text(progress + "%");
                    }
                },
                done: function (e, data) {
                    $(o).removeClass("uploading");
                    var image = $(o).find(".success img")[0];
                    if (image == undefined) {
                        image = $("<img />").appendTo($(o).find(".success"))[0];
                    }
                    image.src = data.result.image_url;
                    $(o).addClass("has_file");
                },
                fail: function (e, data) {
                    $(o).removeClass("uploading");
                    $error.show();
                    $error.find(".message").text("Error occurred");
                    console.log(data.result);
                }
            });
        });

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
