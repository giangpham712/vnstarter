# encoding: utf-8

class UserAvatarUploader < CarrierWave::Uploader::Base

  include Cloudinary::CarrierWave

  def default_url(*args)
    ActionController::Base.helpers.asset_path("/images/no-image-user.png")
  end

  process :convert => 'png'
  process :tags => ['user_avatar']

  version :standard do
    process :resize_to_fill => [150, 150, :north]
  end

  version :thumbnail do
    resize_to_fill(50, 50)
  end

end
