class UpdateProjectsTable5 < ActiveRecord::Migration
  def change
    add_attachment :projects, :image
  end
end
