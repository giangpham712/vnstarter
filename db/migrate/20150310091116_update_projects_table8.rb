class UpdateProjectsTable8 < ActiveRecord::Migration
  def change
    add_column :projects, :category_id, :integer, index: true
    add_index :projects, :category_id, name: "index_projects_on_category_id"
  end
end
