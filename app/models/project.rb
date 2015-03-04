class Project < ActiveRecord::Base
  extend FriendlyId

  attr_accessor :image

  friendly_id :title, :use => :slugged
  validates_presence_of :title, :location, :slug

  belongs_to :user
  has_many :comments
end
