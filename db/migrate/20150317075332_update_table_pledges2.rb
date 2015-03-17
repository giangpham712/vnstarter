class UpdateTablePledges2 < ActiveRecord::Migration
  def change
    add_column :pledges, :reward_id, :integer, null: true
    add_index :pledges, :reward_id, name: "index_pledges_on_reward_id"
  end
end
