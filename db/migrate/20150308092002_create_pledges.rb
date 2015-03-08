class CreatePledges < ActiveRecord::Migration
  def change
    create_table :pledges do |t|

      t.integer :pledger_id
      t.integer :project_id
      t.float :pledge_amount

      t.timestamps null: false
    end

  end
end
