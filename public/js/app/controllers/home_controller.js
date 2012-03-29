define([
    'core/app',
    'text!app/templates/home/index.htm',
    'text!app/templates/header.htm',
    'text!app/templates/blogs/blog-post-list.htm',
    'app/models/blog_post'
], function(app, homeIndexTmpl, headerTmpl, blogPostListTmpl, BlogPost) {

    var HomeViewModel = function() {
        var recentPosts = ko.observableArray([]);
        
        BlogPost.loadCollection({ action: 'recent_posts' }, function(posts) {
            recentPosts(posts);
        });
        
        this.recentPosts = recentPosts;
        
        //this.user = ko.observable(app.auth.currentUser());

        this.authorized = ko.computed(function() {
            return false; // this.user() != null;
        }, this);
        
        var self = this;
        
        /*app.subscribe('Auth.success', function(user) {
            self.user(user);
            console.log("authorized: " + self.authorized());
        });
        
        app.subscribe('Auth.signout', function() {
            self.user(null);
            console.log("authorized: " + self.authorized());
        });*/
    };
    
    app.core.define('HomeController', function(sandbox) {

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
                app.tmpl.renderView('home-index-tmpl', new HomeViewModel());
            }
        };
        
        return module;
    });

});
