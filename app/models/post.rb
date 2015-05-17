class Post < ActiveRecord::Base

  mount_uploader :image, PostImageUploader

  belongs_to :project

  validates_presence_of :title
  validates_presence_of :body
  validates_length_of :body, maximum: 500

end
