class ApiController < ApplicationController
  before_filter :default_format_json
 
    def includes_hash(query_str)
        includes = {}
        
        query_str.split(",").each{ |x|
            ref = includes;
            x.split(".").each{ |z|
                if !ref.include?(z)
                    ref[z] = {}
                end
                ref = ref[z]
            }
        }
        
        includes
    end
    
    def default_format_json
      request.format = "json" unless params[:format]
    end
end
