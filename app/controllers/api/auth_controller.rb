class Api::AuthController < ApiController
    respond_to :json

    def index
        users = User.where(:user_name => params[:user_name])
        
        if (users.length)
            respond_with( users[0] )
        end
    end
end