class CreateRewards < ActiveRecord::Migration
  def change
    create_table :rewards do |t|

      t.float :minimum_pledge_amount, null: false
      t.text :description, null: false
      t.integer :limit_quantity, default: 0

      t.timestamps null: false
    end
  end
end
