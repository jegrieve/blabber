class AddVideoLinkToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :video_link, :string
  end
end
