class Pledge < ActiveRecord::Base
  belongs_to :user, :class_name => "User", :foreign_key => :pledger_id
  belongs_to :project, :class_name => "Project", :foreign_key => :project_id
end
