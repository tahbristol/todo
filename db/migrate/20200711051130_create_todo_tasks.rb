class CreateTodoTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :todo_tasks do |t|
      t.string :description
      t.integer :user_id

      t.timestamps
    end
  end
end
