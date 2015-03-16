class Post < ActiveRecord::Base

  has_attached_file :image

  belongs_to :project

  validates_presence_of :title
  validates_presence_of :body
end
