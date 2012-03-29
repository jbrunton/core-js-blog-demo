class ApiController < ApplicationController
  before_filter :default_format_json
 
    def default_format_json
      request.format = "json" unless params[:format]
    end
end
