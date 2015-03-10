require 'csv'
namespace :init_data do
  task :init_cities => :environment do
    csv_text = File.read(Rails.root.join('config', 'data', 'cities.csv'))
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      City.create(name: row)
    end
  end

  task :init_categories => :environment do
    csv_text = File.read(Rails.root.join('config', 'data', 'categories.csv'))
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      Category.create(name: row)
    end
  end
end