class TodoTasksController < ApplicationController

  def index
    todos = current_user.todo_tasks
    render json: todos
  end

  def create
    todo = TodoTask.create(todo_params.merge(user_id: current_user.id))
    render json: todo
  end


  def destroy
    todo = TodoTask.find(params[:id])
    todo.destroy
    render json: {}
  end
  private

  def todo_params
    params.require(:todo_task).permit(:description)
  end
end
