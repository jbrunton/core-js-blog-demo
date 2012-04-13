define([
    'core/app',
    'text!app/templates/home/index.htm',
    'text!app/templates/header.htm',
    'text!app/templates/blogs/blog-post-list.htm',
    'app/models/blog_post'
], function(app, homeIndexTmpl, headerTmpl, blogPostListTmpl, BlogPost) {

    var HomeViewModel = function() {
        this.recentPosts = ko.observableArray([]);
        
        this.trendingTags = ko.observableArray([]);
        
        this.user = ko.observable();

        this.authorized = ko.computed(function() {
            return this.user() != null;
        }, this);
        
        var self = this;
        
        this["@AuthModule.success"] = function(user) {
            self.user(user);
            console.log("authorized: " + self.authorized());
        };
        
        this["@AuthModule.signout"] = function() {
            self.user(null);
            console.log("authorized: " + self.authorized());
        };
    };
    
    HomeViewModel.prototype.refresh = function() {
        var self = this;
        
        BlogPost.loadCollection({ action: 'recent_posts' }, function(posts) {
            self.recentPosts(posts);
        });
        
        $.ajax({
            type: 'GET',
            url: '/api/search/trending',
            success: function(tags) {
                self.trendingTags(_.map(tags, function(tag) {
                    return tag.tag;
                }));
            },
            dataType: 'json'
        });
    };
    
    app.core.define('HomeController', function(sandbox) {

        var home = new HomeViewModel();
        sandbox.bindSubscriptions(home);

        var module = {
            //"@Router.ready": function(router) {
                // router.registerController(this);
                // this.publish('ready', [this]);
            //},
            
            "!!Application.controller()": {
                routes: {
                    "": "index"
                },
                
                templates: {
                    "home-index-tmpl": $(homeIndexTmpl),
                    // TODO: find somewhere better to load this
                    "header-tmpl": $(headerTmpl),
                    "blog-post-list-tmpl": $(blogPostListTmpl)
                }
            },
            
            "@Application.initialize": function(app) {
                this.ready();
            },
            
            index: function() {
                home.refresh();
                app.tmpl.renderPage('home-index-tmpl', home);
            }
        };
        
        return module;
    });

});
