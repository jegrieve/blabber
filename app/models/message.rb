class Message < ApplicationRecord
    belongs_to :user
    belongs_to :channel
    validates :body, presence: true
    has_one_attached :message_image

    def created_at
        attributes['created_at'].strftime("%b %d %Y at %l:%M%p")
    end
end
