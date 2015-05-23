require 'csv'
namespace :init_data do
  task :init_cities => :environment do
    csv_text = File.read(Rails.root.join('config', 'data', 'cities.csv'))
    csv = CSV.parse(csv_text, :headers => false)
    csv.each do |row|
      City.create(name: row[0].strip)
    end
  end

  task :init_categories => :environment do
    csv_text = File.read(Rails.root.join('config', 'data', 'categories.csv'))
    csv = CSV.parse(csv_text, :headers => false, :col_sep => ",")
    csv.each do |row|
      Category.create(name: row[0].strip, icon_class: row[1].strip)
    end
  end

  task :init_users => :environment do
    csv_text = File.read(Rails.root.join('config', 'data', 'test', 'users.csv'))
    csv = CSV.parse(csv_text, :headers => false, :col_sep => ",")
    csv.each do |row|
      email = row[0].strip
      name = row[1].strip
      password = row[2].strip
      user = User.new(:email => email, :name => name, :password => password, :password_confirmation => password)
      user.save
    end
  end
end