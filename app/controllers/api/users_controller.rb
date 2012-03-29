class Api::UsersController < ApiController
    respond_to :json

    def index
        users = User.all
        respond_with( users )
    end
  
    def show
        user = User.find(params[:id])
        respond_with( user )
    end
    
    def update
        user = User.find(params[:id])
        
        if user.update_attributes(params[:data])
            logger.info "*** success - user: #{user.to_yaml}"
            redirect_to :action => "show", :id => params[:id]
        else
            logger.info "*** errors: #{object.errors}"
            # how to respond?
        end
    end
    
    def create
        user = User.new(params[:data])
        
        if user.save
            redirect_to :action => 'show', :id => user.id
        else
            logger.info "*** errors: #{object.errors}"
        end
    end

end