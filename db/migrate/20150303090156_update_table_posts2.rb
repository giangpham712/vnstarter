class UpdateTablePosts2 < ActiveRecord::Migration
  def change
    add_reference :posts, :project, index: true
  end
end
