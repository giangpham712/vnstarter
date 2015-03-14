class UpdateTableCategories2 < ActiveRecord::Migration
  def change
    change_column :categories, :parent_id, :integer, null: true
  end
end
