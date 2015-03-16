class Project < ActiveRecord::Base
  extend FriendlyId

  attr_accessor :image, :video
  has_attached_file :image, :styles => {
                        :small => "150x150",
                        :medium => "350x350",
                        :listing => "360x270#",
                        :large => "750x750"
                          }

  friendly_id :title, :use => :slugged

  validates_presence_of :title, :location, :slug
  validates_attachment_content_type :image,
                                    :content_type => /^image\/(png|gif|jpeg|jpg|bmp)/,
                                    :size => { :less_than => 5.megabytes },
                                    :message => "Only PNG, GIF, JPEG and BMP formats are supported"

  validates_length_of :short_description, maximum: 255

  belongs_to :user, :class_name => "User", :foreign_key => :creator_id
  belongs_to :category, :class_name => "Category", :foreign_key => :category_id

  has_many :comments
  has_many :pledges
  has_many :posts
  has_many :rewards

  def launched?
    launched_at != nil
  end

  def stopped?
    stopped_at != nil
  end

  def deleted?
    deleted_at != nil
  end

  def normalize_friendly_id(input)
    input.to_s.to_slug.normalize(transliterations: :vietnamese).to_s
  end

  def should_generate_new_friendly_id?
    title_changed?
  end

end
