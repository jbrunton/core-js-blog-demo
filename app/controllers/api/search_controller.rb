class Api::SearchController < ApiController
    respond_to :json

    def tag
        blog_posts = BlogPost.joins(:tags).where(:tags => {:tag => params[:tag]})
        respond_with( blog_posts )
    end

end