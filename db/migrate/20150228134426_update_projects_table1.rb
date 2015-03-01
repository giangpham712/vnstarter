class UpdateProjectsTable1 < ActiveRecord::Migration
  def change
    change_column :projects, :title, :string, :limit => 100
    change_column :projects, :short_description, :string, :limit => 255
  end
end
