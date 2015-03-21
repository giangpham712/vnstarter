(function ($) {
    $(function () {

        var current_tab = "#basic";

        $("#edit-tabs a[data-toggle=tab]").on('shown.bs.tab', function (e) {
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

        $("#save").click(function () {

            switch (current_tab) {
                case "#basic":
                case "#about_you":
                    $("#saving-layer").show();
                    submitFormAjax($(current_tab + " form")[0],
                        function (result) {
                            console.log(result);
                            $("#saving-layer").hide();
                        },
                        function (result) {
                            console.log(result);
                            $("#saving-layer").hide();
                        }
                    );
                    break;
                default:

                    break;
            }
        });

        $("#discard-changes").click(function () {
            switch (current_tab) {
                case "#basic":
                case "#about_you":
                    $(current_tab + " form")[0].reset();
                    break;
                default:
                    break;
            }
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

        $("#add-story-post").on("hide.bs.modal", function () {
            $("#add-story-post form")[0].reset();
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

        $("#pledge-money li").click(function (e) {
            var amount = $(e.target).data("amount");
            var project_slug = $("#slug").val();
            window.location.href = "/projects/" + project_slug + "/pledges/new?amount=" + amount;
        });

        $("#add-comment").click(function (event) {
            $('#new_comment').submit();
        });

        $('#new_comment').submit(function (e) {

            var form = this;

            var user_name = $(".user-navigation").find("input[name=user_name]").val();
            var user_image_url = $(".user-navigation").find("input[name=user_image_url]").val();

            $.ajax({
                url: $(this).attr('action'),
                type: 'POST',
                data: $(form).serialize(),
                success: function (data) {
<<<<<<< HEAD
                    $('.comments-list').append('<li class="comment"><div class="comment-content"><div class="comment-author-avatar"><img src="/media/comment.jpg" alt="John Doe" class="img-responsive"/></div><div class="comment-details"><div class="comment-author-name">' + $('#user-name').val() + ' <span></span><span class="comment-date">' + data.comment.created_at + '</span></div><div class="comment-body">' + data.comment.body + '</div></div></div></li>');
                    $('#comment-body').text(' ');
                    console.log(data);
=======
                    var html = "<li class='comment'>";
                    html += "<div class='comment-content'>";
                    html += "<div class='comment-author-avatar'>";
                    html += "<img src='" + user_image_url + "' alt='' class='circle avatar-small'/>";
                    html += "</div>";
                    html += "<div class='comment-details'>";
                    html += "<div class='comment-author-name'><span>" + user_name + "</span><span class='comment-date'>" + data.comment.created_at + "</span></div>";
                    html += "<div class='comment-body'>" + data.comment.body + "</div></div></div></li>";

                    $('.comments').append($(html));

                    form.reset();
>>>>>>> 8782e60f789b54ad47b769fd27dd77ed7e543a9b
                }
            });
            e.preventDefault();
        });

    });

    function addComment(form) {

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
                    precision: 0 });

                var html = "<div class='form-element'><div class='reward'>";
                html += "<div class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>" + "Phần thưởng " + (counter + 1) + "</div>";
                html += "<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8'>";
                html += "<h3>Góp <strong>" + amount + "</strong> hoặc nhiều hơn</h3>";
                html += "<p>" + result.reward.description + "</p>";
                html += "</div></div></div>";

                $("#rewards .rewards").append(html);
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

            $("#pledge-money li").click(function (e) {
                var amount = $(e.target).data("amount");
                var project_slug = $("#slug").val();
                window.location.href = "/projects/" + project_slug + "/pledges/new?amount=" + amount;
            });

        });
    }


    function addStoryPost(form) {
        submitFormAjax(form,
            function (result) {
                if (result.success) {
                    $(form).find(".errors").hide();

                    var html = "<div class='post'>";
                    html += "<div><h2>" + result.post.title + "</h2></div>";
                    html += "<div><p>" + result.post.body + "</p></div>";
                    html += "</div>";

                    $("#story .story-posts").append(html);
                    $("#add-story-post").modal('hide');
                } else {
                    $(form).find(".errors").show();
                    var $errors_list = $(form).find(".errors ul");
                    $errors_list.html("");
                    $.each(result.errors, function (i, e) {
                        $("<li>" + e + "</li>").appendTo($errors_list);
                    });
                }
            },
            function (result) {
                console.log(result);
            }
        )
    }

})(jQuery);


function submitFormAjax(form, done, fail) {
    var url = form.action;
    var method = form.method;
    var formData = new FormData($(form)[0]);

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
