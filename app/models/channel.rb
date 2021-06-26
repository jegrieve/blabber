class Channel < ApplicationRecord
    belongs_to :server
    has_many :messages

    validates :name, presence: true, uniqueness: true
end
