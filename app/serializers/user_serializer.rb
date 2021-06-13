class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :bio, :created_at, :user_image

  def user_image
    if object.user_image.attached?
      {
        url: rails_blob_url(object.user_image)
      }
    end
  end
end
