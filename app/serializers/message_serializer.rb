class MessageSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :body, :user, :created_at, :message_image, :video_link, :user_id, :gif
  def message_image
    if object.message_image.attached?
      {
        url: rails_blob_url(object.message_image)
      }
    end
  end
end
