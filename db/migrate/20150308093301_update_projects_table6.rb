class UpdateProjectsTable6 < ActiveRecord::Migration
  def change
    add_index :projects, :creator_id, name: "index_projects_on_creator_id"
  end
end
