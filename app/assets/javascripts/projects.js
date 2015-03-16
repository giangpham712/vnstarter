(function($) {
    $(function() {

        var current_tab = "basic";

        $("#edit-tabs a[data-toggle=tab]").on('shown.bs.tab', function (e) {
            var $tab = $(e.target);
            current_tab = $tab.data('edit-info');
        })

        $("#save").click(function() {
            switch (current_tab)
                case "basic":
                    break;
                case "profile":
                    break;
                default:
                    break;
        });

        $(".attachment_upload").each(function(i, o) {
            var $ele = $(o).find("input.fileupload");
            var upload_url = $ele.data("upload-url");

            var $progress = $(o).find(".progress");
            var $error = $(o).find(".error");
            var $image = $(o).find(".success img");

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
                    $image.attr("src", data.result.image_url);
                },
                fail: function (e, data) {
                    $(o).removeClass("uploading");
                    $error.show();
                    $error.find(".message").text("Error occurred");
                    console.log(data.result);
                }
            });
        });
    });
})(jQuery);
