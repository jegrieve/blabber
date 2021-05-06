class Server < ApplicationRecord
    belongs_to :user
    has_many :channels
    #has_one_attached :server_image
    validates :name, presence: true, uniqueness: true
    validates :info, presence: true
end
