class UpdateDatabaseTablesCharacterSet < ActiveRecord::Migration
  def change

    case ActiveRecord::Base.connection.adapter_name
      when "MySQL", "Mysql2"
        execute "ALTER DATABASE #{current_database} DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_unicode_ci"
      when "SQLite"
        # do nothing since SQLite does not support changing the database encoding and only supports unicode charsets
      when "PostgreSQL"
        # do nothing since PostgreSQL does not support changing the database encoding
    end

    ActiveRecord::Base.connection.tables.each do |table|
      execute "ALTER TABLE `#{table}` CONVERT TO CHARACTER SET utf8"
    end
  end
end
