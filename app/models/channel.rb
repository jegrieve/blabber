class Channel < ApplicationRecord
    belongs_to :server
    has_many :messages, dependent: :destroy
    has_many :users, through: :messages

    validates :name, presence: true, uniqueness: true

  def unique_users
    if self.users.uniq
      self.users.uniq.length
    else
      0
    end
  end
end
