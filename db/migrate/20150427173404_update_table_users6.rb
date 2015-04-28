class UpdateTableUsers6 < ActiveRecord::Migration
  def change
    add_column :users, :avatar, :string, null: true
  end
end
