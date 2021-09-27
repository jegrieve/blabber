class Server < ApplicationRecord
    belongs_to :user
    has_many :channels, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :liking_users, :through => :likes, :source => :user, dependent: :destroy
    has_one_attached :server_image
    
    validates :name, presence: true, uniqueness: true
    validates :info, presence: true

    def unique_users
        unique_count = 0;
        self.channels.each do |channel|
            unique_count += channel.unique_users
        end
        unique_count;
      end
end
