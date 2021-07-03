class ChannelSerializer < ActiveModel::Serializer
  attributes :id, :name, :messages, :colour, :server
end
