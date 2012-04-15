define([
    'core/app',
    'app/models/user',
    'app/extenders/url_extender',
    'text!app/templates/users/view-user.htm',
    'text!app/templates/users/edit-user.htm',
    'text!app/templates/blogs/blog-list.htm',
    'text!app/templates/blogs/blog-post-list.htm'
], function(app, User, urlExtender, viewUserTmpl, editUserTmpl, blogListTmpl, blogPostListTmpl) {


    app.core.define('UsersModule', function(sandbox) {
        var module = {
            //"@Router.ready": function(router) {
                // router.registerController(this);
                // this.publish('ready', [this]);
            //},
            
            "!!Application.controller()": {
                routes: {
                    "users/new":            "new_user",
                    "users/:user_id/view":  "view_user",
                    "users/:user_id/edit":  "edit_user"
                },
                
                templates: {
                    'view-user-tmpl': $(viewUserTmpl),
                    'edit-user-tmpl': $(editUserTmpl),
                    'blog-list-tmpl': $(blogListTmpl),
                    'blog-post-list-tmpl': $(blogPostListTmpl)
                }
            },
            
            "!!Application.mapResource()": {
                user: function(user, action) {
                    return "/users/" + user.id() + "/" + action;
                }
            },
            
            "@Application.initialize": function(app) {
                this.ready();
            },
            
            
            new_user: function() {
                var user = new User();
                
                user.submit = function() {
                    user.save(function(user) {
                        app.auth.signin(user.user_name(), null, function(user, action) {
                            app.nav.to('/users/' + user.id() + '/' + action);
                        });
                    });
                };
                
                user.cancel = function() {
                    app.nav.to('/');
                };
                
                app.tmpl.renderPage('edit-user-tmpl', user);
            },
            
            view_user: function(user_id) {
                var user = new User().load(user_id, {
                    extensions: {
                        urlExtender: { edit: true }
                    },
                    includes: {
                        blogs: true,
                        recent_posts: {
                            includes: { tags: true }
                        }
                    }
                });
                app.tmpl.renderPage('view-user-tmpl', user);
            },
            
            edit_user: function(user_id) {
                var user = new User().load(user_id);
                
                user.submit = function() {
                    user.save(function() {
                        app.nav.to(app.nav.urlFor(user));
                    }, { recursive: false });
                };
                
                user.cancel = function() {
                    // TODO: maybe move toward an app.urlFor(user) kinda paradigm?
                    app.nav.to(app.nav.urlFor(user));
                };
                
                app.tmpl.renderPage('edit-user-tmpl', user);
            }
        };
        
        return module;
    });

});
