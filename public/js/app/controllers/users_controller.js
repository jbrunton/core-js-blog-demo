define([
    'core/app',
    'text!app/templates/users/view-user.htm',
    'text!app/templates/users/edit-user.htm',
    'text!app/templates/blogs/blog-list.htm',
    'text!app/templates/blogs/blog-post-list.htm'
], function(app, viewUserTmpl, editUserTmpl, blogListTmpl, blogPostListTmpl) {

    var User;

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
                user: function(user_id, action) {
                    return "/users/" + user_id + "/" + action;
                }
            },
            
            "@Application.initialize": function(app) {
                this.ready();
            },
            
            new_user: function() {
                var user = new app.resources.new('user');
                
                app.core.extend(user, {
                    formExtender: {
                        submit: function() {
                            user.save(function(user) {
                                app.auth.signin(user.user_name(), null, function(user, action) {
                                    app.nav.to('/users/' + user.id() + '/' + action);
                                });
                            });
                        },
                        cancel: 'default'
                    }
                });
                
                app.tmpl.renderPage('edit-user-tmpl', user);
            },
            
            view_user: function(user_id) {
                app.tmpl.renderPage('view-user-tmpl',
                    app.resources.new('user').load(user_id, {
                        extensions: {
                            urlExtender: { edit: true, email: true }
                        },
                        includes: {
                            blogs: true,
                            recent_posts: {
                                includes: { tags: true }
                            }
                        }
                    })
                );
            },
            
            edit_user: function(user_id) {
                app.tmpl.renderPage('edit-user-tmpl',
                    app.resources.new('user').load(user_id, {
                        extensions: {
                            formExtender: {
                                submit: 'default',
                                cancel: 'default'
                            }
                        }
                    })
                );
            }
        };
        
        return module;
    });

});
