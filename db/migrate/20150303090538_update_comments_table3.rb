class UpdateCommentsTable3 < ActiveRecord::Migration
  def change
    remove_column :comments, :commenter_id
    add_column :comments, :commenter_id, :integer, references: :user, index: true
  end
end
bin