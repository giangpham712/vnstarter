class Project < ActiveRecord::Base
  extend FriendlyId

  attr_accessor :image, :video, :duration_type

  before_validation(on: [:create, :update]) do
    self.title = self.title.strip if attribute_present?("title")
    self.short_description = self.short_description.strip if attribute_present?("short_description")
  end

  has_attached_file :image, :default_url => "/images/no-image-project.png",
                    :styles => {
                        :tiny => "240x180#",
                        :small => "360x270#",
                        :medium => "600x450#",
                        :large => "1200x900#"
                          }

  friendly_id :title, :use => :slugged

  validates_presence_of :title, :location, :slug
  validates_attachment_content_type :image,
                                    :content_type => /^image\/(png|gif|jpeg|jpg|bmp)/,
                                    :size => { :less_than => 5.megabytes },
                                    :message => "Only PNG, GIF, JPEG and BMP formats are supported"

  validates_length_of :short_description, maximum: 225

  belongs_to :user, :class_name => "User", :foreign_key => :creator_id
  belongs_to :category, :class_name => "Category", :foreign_key => :category_id

  has_many :comments
  has_many :pledges
  has_many :posts
  has_many :rewards


  def unsuccessful?
    ended? && total_pledge_amount < funding_goal
  end

  def ended?
    launched? && deadline <= Time.zone.now
  end

  def total_pledge_amount
    pledges.sum(:pledge_amount)
  end

  def remaining_days
    [(deadline - Time.zone.now).to_i / 1.day, 0].max
  end

  def has_video?
    return false
  end

  def launched?
    launched_at != nil
  end

  def stopped?
    stopped_at != nil
  end

  def deleted?
    deleted_at != nil
  end

  def initiating?
    !launched? && !stopped? && !deleted?
  end

  def normalize_friendly_id(input)
    input.to_s.to_slug.normalize(transliterations: :vietnamese).to_s
  end

  def should_generate_new_friendly_id?
    title_changed?
  end

end
