# config/initializers/paperclip.rb
=begin

Paperclip::Attachment.default_options.merge!(
    url:                  ':s3_domain_url',
    path:                 ':class/:attachment/:id/:style/:filename',
    storage:              :s3,
    s3_credentials:       Rails.configuration.aws,
    s3_permissions:       :private,
    s3_protocol:          'https'
)

=end

Paperclip::Attachment.default_options.merge!(
    url:                  '/users/:id/:style/:basename.:extension',
    path:                 ':rails_root/public/users/:id/:style/:basename.:extension',
    storage:              :fog,
    fog_credentials:      Rails.configuration.gce,
    fog_public: true,
    fog_directory: "kickstarter-dev"
)


Paperclip.options[:content_type_mappings] = { jpeg: 'image/jpeg', jpg: 'image/jpeg' }