class UpdateUsersTable1 < ActiveRecord::Migration
  def change
    remove_column :users, :encrypted_password
    remove_column :users, :salt
    add_column :users, :password_digest, :string
  end
end
