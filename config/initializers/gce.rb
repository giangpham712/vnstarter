Rails.configuration.gce = YAML.load(ERB.new(File.read("#{Rails.root}/config/gce.yml")).result)[Rails.env].symbolize_keys!
AWS.config(Rails.configuration.gce)