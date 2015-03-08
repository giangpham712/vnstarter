class UpdateMessagesTable3 < ActiveRecord::Migration
  def change
    add_column :messages, :body, :text
  end
end
