class AddGifToMessages < ActiveRecord::Migration[6.1]
  def change
    add_column :messages, :gif, :string
  end
end
