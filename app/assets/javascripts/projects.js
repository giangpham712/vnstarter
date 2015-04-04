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

        $("#project_edit .launch").click(function () {

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

        $("#project_edit .options .option").each(function (i, o) {
            $(o).find("input").click(function () {
                $("#project_edit .options .option").removeClass("selected");
                $("#project_edit .options input[type=text]").prop('disabled', true);

                $(o).addClass("selected");
                $(o).find("input[type=text]").prop('disabled', false);
            });
        });

        $(".attachment_upload").each(function (i, o) {
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

        $(".datetimepicker").each(function (i, o) {

            var $target = $($(this).data("target"));
            var defaultDate = $target.val();

            var picker = $(o).datetimepicker({
                inline: true,
                locale: "vi",
                format: "DD-MM-YYYY HH:mm"
            });

            picker.data("DateTimePicker").date(defaultDate);

            picker.on("dp.change", function (e) {
                $target.val(e.date.format("DD-MM-YYYY HH:mm"));
            });

        });

        $(".limit-characters").each(function(i, e) {
            var $input = $(e).find("textarea");
            var $label = $(e).find("p");

            var max_characters = $input.prop("maxlength");

            $input.keyup(function() {
                var character_count = $input.val().length;
                $label.text((max_characters - character_count) + "/" + max_characters);
            })

            $input.trigger("keyup");
        });


        $("input.duration").autoNumeric('init', {
            aSep: ".",
            aDec: ",",
            mDec: 0,
            lZero: "deny",
            vMin: "1",
            vMax: "90"
        })

        $("input.currency").autoNumeric('init', {
            aSep: ".",
            aDec: ",",
            mDec: 0,
            lZero: "deny",
            pSign: "s",
            aSign: " vnđ",
            vMin: "1000000",
            vMax: "1000000000"
        });

        $(".modal").on("hide.bs.modal", function () {
            $(this).find("form").trigger('reset')
            $(this).find(".alert").hide();
        });

        $("#basic form").submit(function(e) {
            e.preventDefault();
            var form = this;
            $("#saving-layer").show();
            saveInfo(form);
        });

        $("#about_you form").submit(function(e) {
            e.preventDefault();
            var form = this;
            $("#saving-layer").show();
            saveInfo(form);
        });

        $("#add-reward form").submit(function (e) {
            e.preventDefault();
            var form = this;
            addReward(form);
        });

        $("#add-story-post form").submit(function (e) {
            e.preventDefault();
            var form = this;
            addStoryPost(form);
        });

        $("#story .story-posts .post .delete").click(deleteStoryPost);

        $("#rewards .rewards .reward .delete").click(deleteReward);

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

        $("#delete_project").click(function(e){
            var project_id = $("#project_id").val();

            var request = $.ajax({
                url: "/projects/" + project_id,
                type: "DELETE"
            });

            request.done(function(result) {

            });
        })

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

    function saveInfo(form) {
        submitFormAjax(form,
            function (result) {

                $("#saving-layer").hide();
                if (result.success)
                    displaySuccessMessage();
                else
                    displayErrorMessage(result.errors);
            },
            function (result) {

                $("#saving-layer").hide();
                displayErrorMessage();
            }
        );
    }

    function addReward(form) {

        submitFormAjax(form, function (result) {
            if (result.success) {
                $(form).find(".errors").hide();

                var counter = $("#rewards .rewards").find(".reward").length;

                var amount = accounting.formatMoney(result.reward.minimum_pledge_amount, {
                    symbol: "đồng",
                    format: "%v %s",
                    thousand: ".",
                    precision: 0
                });

                var html = "<div class='form-element'><div class='reward' data-reward-id='" + result.reward.id + "'>";
                html += "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>" + "Phần thưởng " + (counter + 1) + "</div>";
                html += "<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8'>";
                html += "<a class='btn btn-danger pull-right delete'><i class='fa fa-times'></i></a>";
                html += "<h3>Góp <b>" + amount + "</b> hoặc nhiều hơn</h3>";
                html += "<p>" + result.reward.description + "</p>";
                html += "</div></div></div>";

                var $reward = $(html);

                $reward.appendTo($("#rewards .rewards"));
                $reward.find(".delete").click(deleteReward);
                $("#add-reward").modal('hide');

            } else {
                $(form).find(".errors").show();
                var $errors_list = $(form).find(".errors ul");
                $errors_list.html("");
                $.each(result.errors, function (i, e) {
                    $("<li>" + e + "</li>").appendTo($errors_list);
                });
            }

        }, function (result) {

            $("#pledge_money li").click(function (e) {
                var amount = $(e.target).data("amount");
                var project_id = $("#project_id").val();
                window.location.href = "/projects/" + project_id + "/pledges/new?amount=" + amount;
            });

        });


    }

    function displaySuccessMessage(message) {
        var $message = $("#message_container .alert-success");
        $message.show();
        setTimeout(function() {
            $message.hide();
        }, 5000);
        $("#go_top").trigger('click');
    }

    function displayErrorMessage(errors) {
        var $message = $("#message_container .alert-danger");
        if (errors) {
            $message.find("ul").html("");
            $.each(errors, function(i, e) {
                $message.find("ul").append($("<li>" + e + "</li>"));
            });
        }
        $message.show();
        setTimeout(function() {
            $message.hide();
        }, 5000);
        $("#go_top").trigger('click');
    }

    function deleteReward(e) {

        var sure = confirm("Bạn có chắc chắn muốn xóa phần thưởng này?");

        if (!sure) {
            return false;
        }

        var $reward = $(this).parent().parent();
        var project_id = $("#project_id").val();
        var reward_id = $reward.data("reward-id");

        $reward.addClass("deleting");

        var request = $.ajax({
            url: "/projects/" + project_id + "/rewards/" + reward_id,
            type: "DELETE"
        });

        request.done(function (result) {
            if (result.success) {
                $reward.parent().remove();
            } else {
                $reward.removeClass("deleting");
            }
        });
    }

    function deleteStoryPost(e) {

        var sure = confirm("Bạn có chắc chắn muốn xóa câu chuyện này?");

        if (!sure) {
            return false;
        }

        var $post = $(this).parent();
        var project_id = $("#project_id").val();
        var post_id = $post.data("post-id");

        $post.addClass("deleting");

        var request = $.ajax({
            url: "/projects/" + project_id + "/posts/" + post_id,
            type: "DELETE"
        });

        request.done(function (result) {
            if (result.success) {
                $post.remove();
            } else {
                $post.removeClass("deleting");
            }
        });
    }

    function addStoryPost(form) {

        $("#add-story-post").addClass("processing");
        $("#add-story-post button").prop("disabled", true);
        submitFormAjax(form,
            function (result) {
                if (result.success) {
                    $(form).find(".errors").hide();

                    var html = "<div class='post' data-post-id='" + result.post.id + "'>";
                    html += "<a class='btn btn-primary pull-right edit hidden'><i class='fa fa-pencil'></i></a>";
                    html += "<a class='btn btn-danger pull-right delete'><i class='fa fa-times'></i></a>";
                    html += "<h3>" + result.post.title + "</h3>";
                    html += "<div class='image-container'><img src ='" + result.image_url + "' title='" + result.post.title + "' /></div>";
                    html += "<p>" + result.post.body + "</p>";
                    html += "</div>";

                    var $post = $(html);

                    $post.appendTo($("#story .story-posts"));
                    $post.find(".delete").click(deleteStoryPost);

                    $("#add-story-post").modal('hide');
                } else {
                    $(form).find(".errors").show();
                    var $errors_list = $(form).find(".errors ul");
                    $errors_list.html("");
                    $.each(result.errors, function (i, e) {
                        $("<li>" + e + "</li>").appendTo($errors_list);
                    });
                }
                $("#add-story-post").removeClass("processing");
                $("#add-story-post button").prop("disabled", false);
            },
            function (result) {
                console.log(result);
            }
        )
    }

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
