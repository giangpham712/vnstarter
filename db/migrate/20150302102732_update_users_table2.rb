class UpdateUsersTable2 < ActiveRecord::Migration
  def change
    remove_column :users, :password_digest
  end
end
