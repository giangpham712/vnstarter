class UpdateTableUsers4 < ActiveRecord::Migration
  def change
    add_column :users, :biology, :text, null: true
  end
end
