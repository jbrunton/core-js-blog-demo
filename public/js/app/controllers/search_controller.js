define([
    'core/app',
    'app/models/blog_post',
    'text!app/templates/search/tag-search.htm',
], function(app, BlogPost, tagSearchTmpl) {

    var TagQuery = function(tag) {
        this.tag = ko.observable();
        this.results = ko.observableArray();
        
        this.search(tag);
    };
    
    TagQuery.prototype.search = function(tag) {
        this.tag(tag);

        var self = this;
        
        BlogPost.loadCollection({ url: '/api/search/tag/' + tag }, function(posts) {
            self.results(posts);
        });
    };

    app.core.define('SearchModule', function(sandbox) {
        var module = {
            "!!Application.controller()": {
                routes: {
                    "search/tag/:tag":  "search_tag"
                },
                
                templates: {
                    'tag-search-tmpl': $(tagSearchTmpl)
                }
            },
            
            "!!Application.mapResource()": {
                tag: function(tag, action) {
                    return "/search/tag/" + tag.tag();
                }
            },
            
            "@Application.initialize": function(app) {
                this.ready();
            },
            
            
            search_tag: function(tag) {
                var results = new TagQuery(tag);
                app.tmpl.renderPage('tag-search-tmpl', results);
            }
        };
        
        return module;
    });

});
