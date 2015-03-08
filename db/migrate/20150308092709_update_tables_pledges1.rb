class UpdateTablesPledges1 < ActiveRecord::Migration
  def change
    add_index :pledges, :pledger_id, name: "index_pledges_on_pledger_id"
    add_index :pledges, :project_id, name: "index_pledges_on_project_id"
  end
end
