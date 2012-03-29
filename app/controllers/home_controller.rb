class HomeController < ApplicationController
    protect_from_forgery
  
    def index
        respond_to do |format|
            format.html  # index.html.erb
        end
    end
  
end
