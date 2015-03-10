require 'csv'
namespace :import_cities do
  task :create_cities => :environment do
    csv_text = File.read(Rails.root.join('config', 'data', 'cities.csv'))
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      City.create(name: row)
    end
  end
end