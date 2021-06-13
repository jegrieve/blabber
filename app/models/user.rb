class User < ApplicationRecord
    has_secure_password
    has_many :messages
    has_many :servers
    has_one_attached :user_image
    
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password_digest, presence: true
end
