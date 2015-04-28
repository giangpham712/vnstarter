class UpdateProjectsTable12 < ActiveRecord::Migration
  def change
    add_column :projects, :image, :string, null: true
  end
end
