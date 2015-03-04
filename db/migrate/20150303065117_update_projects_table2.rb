class UpdateProjectsTable2 < ActiveRecord::Migration
  def change
    add_column :projects, :location, :string
    add_column :projects, :funding_goal, :float
    add_column :projects, :duration, :integer
    add_column :projects, :deadline, :datetime
  end
end
