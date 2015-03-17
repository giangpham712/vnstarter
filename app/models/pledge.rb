class Pledge < ActiveRecord::Base

  belongs_to :user, :class_name => "User", :foreign_key => :pledger_id
  belongs_to :project, :class_name => "Project", :foreign_key => :project_id
  belongs_to :reward, :class_name => "Reward", :foreign_key => :reward_id

  validates_presence_of :pledge_amount
  
end
