class MessageSerializer < ActiveModel::Serializer
  attributes :id, :body, :user, :created_at
end
