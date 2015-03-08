class UpdateMessagesTable1 < ActiveRecord::Migration
  def change
    add_column :messages, :sender_id, :integer, references: :users, index: true
    add_column :messages, :receiver_id, :integer, references: :users, index: true
  end
end
