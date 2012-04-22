define([
    'core/app',
    'text!app/templates/blogs/view-blog.htm',
    'text!app/templates/blogs/edit-blog.htm',
    'text!app/templates/blogs/view-post.htm',
    'text!app/templates/blogs/edit-post.htm'
], function(app, viewBlogTmpl, editBlogTmpl, viewPostTmpl, editPostTmpl) {

    app.core.define('BlogsModule', function(sandbox) {

        var module = {
            //"@Router.ready": function(router) {
                // router.registerController(this);
                // this.publish('ready', [this]);
            //},
            
            "!!Application.controller()": {
                templates: {
                    'view-blog-tmpl': $(viewBlogTmpl),
                    'edit-blog-tmpl': $(editBlogTmpl),
                    'view-post-tmpl': $(viewPostTmpl),
                    'edit-post-tmpl': $(editPostTmpl)
                },
                
                routes: {
                    "blogs/new":                "new_blog",
                    "blogs/:blog_id/view":      "view_blog",
                    "blogs/:blog_id/edit":      "edit_blog",
                    "blogs/:blog_id/compose":   "new_post",
                    "posts/:post_id/view":      "view_post",
                    "posts/:post_id/edit":      "edit_post"
                }
            },
            
            "!!Application.mapResource()": {
                blog: function(blog, action) {
                    return "/blogs/" + blog.id() + "/" + action;
                },
                blog_post: function(blog_post, action) {
                    return "/posts/" + blog_post.id() + "/" + action;
                }
            },
            
            "@Application.initialize": function(app) {
                this.ready();
            },
            
            new_blog: function() {
                var currentUser = app.auth.currentUser(),
                    blog = app.resources.new('blog', { user_id: currentUser.id() });
                
                formExtender.apply(blog, {
                    submit: 'default',
                    cancel: function() {
                        app.nav.to(currentUser.viewHref());
                    }
                });
                
                app.tmpl.renderPage('edit-blog-tmpl', blog);
            },
            
            view_blog: function(blog_id) {
                app.tmpl.renderPage('view-blog-tmpl',
                    app.resources.new('blog').load(blog_id, {
                        extensions: {
                            urlExtender: { edit: true }
                        }
                    })
                );
            },
            
            edit_blog: function(blog_id) {
                app.tmpl.renderPage('edit-blog-tmpl',
                    app.resources.new('blog').load(blog_id, {
                        extensions: {
                            formExtender: {
                                submit: 'default',
                                cancel: 'default'
                            } 
                        }
                    })
                );
            },
            
            new_post: function(blog_id) {
                // TODO: parameterize resource constructors to be
                // constructor(data, extensions).
                // maybe consider separating extensions and includes in request params?
                var post = new app.resources.new('blog_post', { blog_id: blog_id});
                
                formExtender.apply(post, {
                    submit: 'default',
                    cancel: function() {
                        app.nav.to('/blogs/' + blog_id + '/view');
                    }
                });
                
                app.tmpl.renderPage('edit-post-tmpl', post);
            },
            
            view_post: function(post_id) {
                app.tmpl.renderPage('view-post-tmpl',
                    app.resources.new('blog_post').load(post_id, {
                        extensions: {
                            urlExtender: { edit: true },
                            blogPostExtensions: { contentHtml: true }
                        }
                    })
                );
            },
            
            edit_post: function(post_id) {
                var post = new app.resources.new('blog_post');
                
                post.load(post_id, {
                    extensions: {
                        formExtender: {
                            submit: 'default',
                            cancel: 'default'
                        },
                        blogPostExtensions: { tagsContent: true }
                    }
                });
                
                app.tmpl.renderPage('edit-post-tmpl', post);
            }
        };
        
        return module;
    });

});
