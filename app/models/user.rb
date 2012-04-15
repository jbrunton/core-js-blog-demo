class User < ActiveRecord::Base
    has_many :blogs
    has_many :recent_posts, :through => :blogs, :source => :blog_posts

    def serializable_hash(options = nil)
        user = super(options ||= {})
        
        user[:type_name] = self.class.name.underscore
        
        if self.blogs.loaded?
            user[:blogs] = self.blogs
        end
        
        if self.recent_posts.loaded?
            user[:recent_posts] = self.recent_posts
        end
        
        # user[:recent_posts] = BlogPost.where(:blog_id => user.blog_id)
        
        user
    end
end
