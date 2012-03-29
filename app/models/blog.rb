class Blog < ActiveRecord::Base
    belongs_to :user
    has_many :blog_posts

    def serializable_hash(options = nil)
        blog = super(options ||= {})
        
        blog[:type_name] = self.class.name.underscore
        
        if !self.blog_posts.nil?
            blog[:blog_posts] = self.blog_posts
        end
        
        blog
    end
end
