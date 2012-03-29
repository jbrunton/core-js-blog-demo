class Api::BlogPostsController < ApiController
    respond_to :json

    def index
        blog_posts = BlogPost.all
        respond_with( blog_posts )
    end
  
    def show
        blog_post = BlogPost.find(params[:id])
        respond_with( blog_post )
    end
    
    def update
        blog_post = BlogPost.find(params[:id])
        
        blog_post.tags.destroy_all
        blog_post.save
        
        params[:data][:tags] = params[:data][:tags].collect{ |tag| Tag.new(:tag => tag ) }
        
        if blog_post.update_attributes(params[:data])
            logger.info "*** success - blog_post: #{blog_post.to_yaml}"
            redirect_to :action => "show", :id => params[:id]
        else
            logger.info "*** errors: #{blog_post.errors}"
            # how to respond?
        end
    end
    
    def create
        blog_post = BlogPost.new(params[:data])
        
        if blog_post.save
            redirect_to :action => 'show', :id => blog_post.id
        else
            logger.info "*** errors: #{blog_post.errors}"
        end
    end
end