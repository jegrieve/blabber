class Channel < ApplicationRecord
    belongs_to :server
    has_many :messages, dependent: :destroy

    validates :name, presence: true, uniqueness: true
end
