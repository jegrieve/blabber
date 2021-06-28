class ChangeServerInfo < ActiveRecord::Migration[6.1]
  def change
    change_column :servers, :info, :text
  end
end
