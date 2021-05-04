class ServerSerializer < ActiveModel::Serializer
  attributes :id, :name, :info, :channels
end
