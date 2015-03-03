class UpdateTablePosts1 < ActiveRecord::Migration
  def change
    remove_column :posts, :projects_id
  end
end
