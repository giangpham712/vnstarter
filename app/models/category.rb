class Category < ActiveRecord::Base
  extend FriendlyId

  friendly_id :name, :use => :slugged

  has_many :projects, :foreign_key => :category_id

  def normalize_friendly_id(input)
    input.to_s.to_slug.normalize(transliterations: :vietnamese).to_s
  end
end
