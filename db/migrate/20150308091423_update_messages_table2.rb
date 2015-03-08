class UpdateMessagesTable2 < ActiveRecord::Migration
  def change
    add_index :messages, :sender_id, name: "index_messages_on_sender_id"
    add_index :messages, :receiver_id, name: "index_messages_on_receiver_id"
  end
end
