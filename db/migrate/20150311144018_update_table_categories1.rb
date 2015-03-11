class UpdateTableCategories1 < ActiveRecord::Migration
  def change
    add_column :categories, :parent_id, :integer, null: false
    add_index :categories, :parent_id, name: "index_categories_on_parent_id"
  end
end
