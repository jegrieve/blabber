class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :bio, :created_at
end
