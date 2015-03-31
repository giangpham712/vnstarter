class User < ActiveRecord::Base

  has_attached_file :image, :default_url => "/images/no-image-user.png", :styles => {
                              :small => "150x150#",
                              :medium => "350x350#",
                              :large => "750x750#"
                          }

  validates_presence_of :name
  validates_attachment_content_type :image,
                                    :content_type => /^image\/(png|gif|jpeg|jpg|bmp)/,
                                    :size => { :less_than => 5.megabytes },
                                    :message => "Only PNG, GIF, JPEG and BMP formats are supported"

  validates_length_of :biology, maximum: 225

  has_many :projects, :foreign_key => :creator_id
  has_many :comments, :foreign_key => :commenter_id
  has_many :sent_messages, :class_name => 'Message', :foreign_key => 'sender_id'
  has_many :received_messages, :class_name => 'Message', :foreign_key => 'receiver_id'

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable

end
