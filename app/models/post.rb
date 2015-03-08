class Post < ActiveRecord::Base

  has_attached_file :image

  belongs_to :project
end
