class UpdateTablesCharacterSet < ActiveRecord::Migration
  def change
    ActiveRecord::Base.connection.tables.each do |table|
      execute "ALTER TABLE `#{table}` CONVERT TO CHARACTER SET utf8"
    end
  end
end
