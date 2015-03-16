class Post < ActiveRecord::Base

  attr_accessor :image_url

  has_attached_file :image, :styles => {
                              :medium => "350x350",
                              :large => "750x750"
                          }

  belongs_to :project

  validates_presence_of :title
  validates_presence_of :body

  validates_attachment_content_type :image,
                                    :content_type => /^image\/(png|gif|jpeg|jpg|bmp)/,
                                    :size => { :less_than => 5.megabytes },
                                    :message => "Only PNG, GIF, JPEG and BMP formats are supported"
end
