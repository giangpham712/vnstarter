class Reward < ActiveRecord::Base

  validates_numericality_of :minimum_pledge_amount, greater_than_or_equal_to: 1000
  validates_presence_of :description

  belongs_to :project, :class_name => "Project", :foreign_key => :project_id

end
