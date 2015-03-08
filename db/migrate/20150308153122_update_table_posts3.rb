class UpdateTablePosts3 < ActiveRecord::Migration
  def change
    add_attachment :posts, :image
  end
end
