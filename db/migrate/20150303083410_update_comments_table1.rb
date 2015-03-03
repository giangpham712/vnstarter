class UpdateCommentsTable1 < ActiveRecord::Migration
  def change
    add_column :comments, :commenter_id, :string, references: :users, :index => true
  end
end
