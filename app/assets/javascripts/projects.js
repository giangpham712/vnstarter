(function($) {
    $(function() {

        var current_tab = "#basic";

        $("#edit-tabs a[data-toggle=tab]").on('shown.bs.tab', function (e) {
            var $tab = $(e.target);
            current_tab = $tab.attr("href");
        })

        $("#save").click(function() {

            switch (current_tab) {
                case "#basic":
                case "#about_you":
                    submitFormAjax($(current_tab + " form")[0]);
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

        $("#add-story-post form").submit(function(e) {
            e.preventDefault();
            console.log("Add story", this);
        });
    });

    function submitFormAjax(form) {

        if (form == undefined) {
            alert("Form not found");
            return false;
        }
        $("#saving-layer").show();
        var url = form.action;
        var method = form.method;

        var request = $.ajax({
            url: url,
            type: method,
            data: $(form).serialize()
        });

        request.done(function(result) {
            console.log(result);
            $("#saving-layer").hide();
        });

        request.fail(function(result) {
            console.log(result);
            $("#saving-layer").hide();
        });


    }

    function addStory() {

    }

})(jQuery);
