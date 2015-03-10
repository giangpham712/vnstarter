class UpdateTableUsers2 < ActiveRecord::Migration
  def change
    add_column :users, :website, :string
  end
end
