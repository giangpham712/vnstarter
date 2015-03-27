class UpdateTableCategories4 < ActiveRecord::Migration
  def change
    add_column :categories, :icon_class, :string, null: true
  end
end
