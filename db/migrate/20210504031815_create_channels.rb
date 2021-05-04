class CreateChannels < ActiveRecord::Migration[6.1]
  def change
    create_table :channels do |t|
      t.string :name, null: false, unique: true
      t.references :server, null: false, foreign_key: true

      t.timestamps
    end
  end
end
