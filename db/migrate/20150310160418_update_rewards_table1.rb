class UpdateRewardsTable1 < ActiveRecord::Migration
  def change
    add_column :rewards, :project_id, :integer, null: false, index: true
    add_index :rewards, :project_id, name: "index_rewards_on_project_id"
  end
end
