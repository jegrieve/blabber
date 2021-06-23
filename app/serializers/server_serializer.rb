class ServerSerializer < ActiveModel::Serializer
  attributes :id, :name, :info, :channels, :server_image

  def server_image
    if object.server_image.attached?
      {
        url: rails_blob_url(object.server_image)
      }
    end
  end
end
