class User < ActiveRecord::Base

  attr_accessor :password, :password_confirmation

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :email, confirmation: true
  validates :email_confirmation, presence: true
  validates :email, uniqueness: true

  validates_length_of :password, minimum: 6
  validates_confirmation_of :password
end
