define([
    'core/app',
    'app/models/blog',
    'app/models/blog_post',
    'app/extenders/form_extender',
    'text!app/templates/blogs/view-blog.htm',
    'text!app/templates/blogs/edit-blog.htm',
    'text!app/templates/blogs/view-post.htm',
    'text!app/templates/blogs/edit-post.htm'
], function(app, Blog, BlogPost, formExtender, viewBlogTmpl, editBlogTmpl, viewPostTmpl, editPostTmpl) {

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
            
            "@Application.initialize": function(app) {
                this.ready();
            },
            
            new_blog: function() {
                var currentUser = app.auth.currentUser(),
                    blog = new Blog({ user_id: currentUser.id() });
                
                formExtender.apply(blog, {
                    submit: 'default',
                    cancel: function() {
                        app.nav.to(currentUser.viewHref());
                    }
                });
                
                app.tmpl.renderPage({ content: { name: 'edit-blog-tmpl', data: blog } });
            },
            
            view_blog: function(blog_id) {
                app.tmpl.renderPage({ content: { name: 'view-blog-tmpl', data: new Blog().load(blog_id) } });
            },
            
            edit_blog: function(blog_id) {
                var blog = new Blog().load(blog_id);
                
                formExtender.apply(blog, {
                    submit: 'default',
                    cancel: 'default'
                });
                
                app.tmpl.renderPage({ content: { name: 'edit-blog-tmpl', data: blog } });
            },
            
            new_post: function(blog_id) {
                var post = new BlogPost({ blog_id: blog_id});
                
                formExtender.apply(post, {
                    submit: 'default',
                    cancel: function() {
                        app.nav.to('/blogs/' + blog_id + '/view');
                    }
                });
                
                app.tmpl.renderPage({ content: { name: 'edit-post-tmpl', data: post } });
            },
            
            view_post: function(post_id) {
                app.tmpl.renderPage({ content: { name: 'view-post-tmpl', data: new BlogPost().load(post_id) } });
            },
            
            edit_post: function(post_id) {
                var post = new BlogPost().load(post_id);
                
                formExtender.apply(post, {
                    submit: 'default',
                    cancel: 'default'
                });
                
                app.tmpl.renderPage({ content: { name: 'edit-post-tmpl', data: post } });
            }
        };
        
        return module;
    });

});
