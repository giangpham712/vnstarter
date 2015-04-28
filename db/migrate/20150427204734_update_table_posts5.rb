class UpdateTablePosts5 < ActiveRecord::Migration
  def change
    add_column :posts, :image, :string, null: true
  end
end
