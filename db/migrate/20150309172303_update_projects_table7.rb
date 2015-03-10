class UpdateProjectsTable7 < ActiveRecord::Migration
  def change
    add_column :projects, :launched, :boolean, default: false
    add_column :projects, :funding_status, :integer, default: 1
  end
end
