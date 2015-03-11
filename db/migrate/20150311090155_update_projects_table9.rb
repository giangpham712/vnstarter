class UpdateProjectsTable9 < ActiveRecord::Migration
  def change
    add_column :projects, :launched_at, :datetime
    add_column :projects, :deleted_at, :datetime
    add_column :projects, :stopped_at, :datetime
  end
end
