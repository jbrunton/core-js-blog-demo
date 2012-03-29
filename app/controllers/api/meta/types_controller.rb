class Api::Meta::TypesController < ApiController
    respond_to :json

    def type_info(type)
        type_info = { :type_name => type.name.underscore, :properties => {} }
        
        type.columns.each{ |c|
            type_info[:properties][c.name] = { :type_name => c.type }
        }
        
        type.reflect_on_all_associations.each{ |a|
            type_info[:properties][a.name] =
                { :type_name => 'list', :item_type => a.class_name.underscore } if a.macro==:has_many
        }
        
        if (type_info[:type_name] == 'blog_post')
            type_info[:properties][:tags][:item_type] = 'string'
        end
        
        type_info
    end

    def index
        # types = [ type_info(User), type_info(Task) ]        
        types = [
            type_info(User),
            type_info(Blog),
            type_info(BlogPost)
        ]
        respond_with( types )
    end
end