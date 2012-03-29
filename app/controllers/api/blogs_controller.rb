class Api::BlogsController < ApiController
    respond_to :json

    def index
        blogs = Blog.all
        respond_with( blogs )
    end
  
    def show
        blog = Blog.find(params[:id])
        respond_with( blog )
    end
    
    def update
        blog = Blog.find(params[:id])
        
        if blog.update_attributes(params[:data])
            redirect_to :action => "show", :id => params[:id]
        else
            logger.info "*** errors: #{blog.errors}"
            # how to respond?
        end
    end
end