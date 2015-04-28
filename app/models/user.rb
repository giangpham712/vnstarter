class User < ActiveRecord::Base

  mount_uploader :avatar, UserAvatarUploader

  validates_presence_of :name

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
