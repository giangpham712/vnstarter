# encoding: utf-8

class PostImageUploader < CarrierWave::Uploader::Base

  include Cloudinary::CarrierWave

  def default_url(*args)
    ActionController::Base.helpers.asset_path("/images/no-image-project.png")
  end

  process :tags => ['post_image']

  version :large do
    resize_to_fill(1200, 900)
  end

  version :medium do
    resize_to_fill(600, 450)
  end

  version :small do
    resize_to_fill(360, 270)
  end

end
