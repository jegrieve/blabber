class ChangeUserBio < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :bio, :text
  end
end
