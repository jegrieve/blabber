class CreateServers < ActiveRecord::Migration[6.1]
  def change
    create_table :servers do |t|
      t.string :name, null: false, unique: true
      t.string :info, null: false
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
