class UpdateTableCategories3 < ActiveRecord::Migration
  def change
    add_column :categories, :slug, :string, index: true
  end
end
