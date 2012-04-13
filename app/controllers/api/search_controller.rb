class Api::SearchController < ApiController
    respond_to :json

    def tag
        blog_posts = BlogPost.joins(:tags).where(:tags => {:tag => params[:tag]})
        respond_with( blog_posts )
    end
    
    def trending
        tags = BlogPost.joins(:tags).
            select("tag, count(*) as count").
            group("tag").
            order("count DESC").
            limit(5)

        respond_with( tags )
    end

end