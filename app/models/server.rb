class Server < ApplicationRecord
    belongs_to :user
    has_many :channels
    #has_one_attached :server_image
    #has_many :channels
    validates :name, presence: true
    validates :info, presence: true
end
