(function($) {
    $(function() {

        var current_tab = "#basic";

        $("#edit-tabs a[data-toggle=tab]").on('shown.bs.tab', function (e) {
            var $tab = $(e.target);
            current_tab = $tab.attr("href");
            switch(current_tab) {
                case "#basic":
                case "#about_you":
                    $("#toolbar").show();
                    break;
                default:
                    $("#toolbar").hide();
                    break;
            }
        })

        $("#save").click(function() {

            switch (current_tab) {
                case "#basic":
                case "#about_you":
                    $("#saving-layer").show();
                    submitFormAjax($(current_tab + " form")[0],
                        function(result) {
                            console.log(result);
                            $("#saving-layer").hide();
                        },
                        function(result) {
                            console.log(result);
                            $("#saving-layer").hide();
                        }
                    );
                    break;
                default:

                    break;
            }
        });

        $("#discard-changes").click(function() {
            switch (current_tab) {
                case "#basic":
                case "#about_you":
                    $(current_tab + " form")[0].reset();
                    break;
                default:
                    break;
            }
        });

        $(".attachment_upload").each(function(i, o) {
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

        $("#add-story-post").on("hide.bs.modal", function() {
            $("#add-story-post form")[0].reset();
        });

        $("#add-story-post form").submit(function(e) {
            e.preventDefault();
            var form = this;

            submitFormAjax(this,
                function(result) {
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
                        $.each(result.errors, function(i, e) {
                            $("<li>" + e + "</li>").appendTo($errors_list);
                        });
                    }
                },
                function(result) {
                    console.log(result);
                }
            )
        });
    });

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


})(jQuery);
