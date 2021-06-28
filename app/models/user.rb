class User < ApplicationRecord
    has_secure_password
    has_many :messages, dependent: :destroy
    has_many :servers, dependent: :destroy
    has_one_attached :user_image
    
    validates :email, presence: true, uniqueness: true
    validates :username, presence: true, uniqueness: true
    validates :password_digest, presence: true
end
