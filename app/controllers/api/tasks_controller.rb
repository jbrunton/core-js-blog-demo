class Api::TasksController < ApiController
    respond_to :json

    def index
        tasks = Task.all
        respond_with( tasks )
    end
  
    def show
        task = Task.find(params[:id])
        respond_with( task )
    end
end