class Comment < ActiveRecord::Base
  belongs_to :project, :class_name => "Project", :foreign_key => :project_id
  belongs_to :user, :class_name => "User", :foreign_key => :commenter_id
end
