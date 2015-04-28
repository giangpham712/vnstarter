class UpdateProjectsTable10 < ActiveRecord::Migration
  def change
    add_column :projects, :duration_type, :integer, default: 0
  end
end
