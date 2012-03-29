class BlogPost < ActiveRecord::Base
    belongs_to :blog
    has_many :tags
    
    def serializable_hash(options = nil)
        blog_post = super(options ||= {})
        
        blog_post[:type_name] = self.class.name.underscore
        
        if !self.tags.nil?
            blog_post[:tags] = self.tags.collect{ |tag| tag.tag }
        end
        
        blog_post
    end
end
