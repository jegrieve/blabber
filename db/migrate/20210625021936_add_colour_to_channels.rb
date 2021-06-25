class AddColourToChannels < ActiveRecord::Migration[6.1]
  def change
    add_column :channels, :colour, :string
  end
end
