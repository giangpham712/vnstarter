class Project < ActiveRecord::Base
  extend FriendlyId

  mount_uploader :image, ProjectImageUploader

  enum duration_type: { :duration => 0, :deadline => 1 }

  before_validation(on: [:create, :update]) do
    self.title = self.title.strip if attribute_present?("title")
    self.short_description = self.short_description.strip if attribute_present?("short_description")

    if attribute_present?("deadline")
      self.deadline = self.deadline.change(hour: 23, min: 59, sec: 59)
    end

  end

  friendly_id :title, :use => :slugged

  belongs_to :user, :class_name => "User", :foreign_key => :creator_id, :autosave => false
  belongs_to :category, :class_name => "Category", :foreign_key => :category_id

  has_many :comments
  has_many :pledges
  has_many :posts
  has_many :rewards

  validates_presence_of :title, :location, :slug
  validates_length_of :short_description, maximum: 200
  validates_numericality_of :funding_goal, minimum: 0

  # Overrides
  def normalize_friendly_id(input)
    input.to_s.to_slug.normalize(transliterations: :vietnamese).to_s
  end

  def should_generate_new_friendly_id?
    title_changed?
  end

  def unsuccessful?
    ended? && total_pledge_amount < funding_goal
  end

  def ended?
    launched? && !stopped? && deadline <= Time.zone.now
  end

  def funding?
    launched? && !stopped? && deadline > Time.zone.now
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





end
