class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :email, :bio, :created_at, :user_image

  def user_image
    if object.user_image.attached?
      {
        url: rails_blob_url(object.user_image)
      }
    end
  end
end
