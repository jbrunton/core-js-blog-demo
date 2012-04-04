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
                        app.navigate(currentUser.viewHref());
                    }
                });
                
                app.tmpl.renderView('edit-blog-tmpl', blog);
            },
            
            view_blog: function(blog_id) {
                app.tmpl.renderView('view-blog-tmpl', new Blog().load(blog_id));
            },
            
            edit_blog: function(blog_id) {
                var blog = new Blog().load(blog_id);
                
                formExtender.apply(blog, {
                    submit: 'default',
                    cancel: 'default'
                });
                
                app.tmpl.renderView('edit-blog-tmpl', blog);
            },
            
            new_post: function(blog_id) {
                var post = new BlogPost({ blog_id: blog_id});
                
                formExtender.apply(post, {
                    submit: 'default',
                    cancel: function() {
                        app.navigate('/blogs/' + blog_id + '/view');
                    }
                });
                
                app.tmpl.renderView('edit-post-tmpl', post);
            },
            
            view_post: function(post_id) {
                app.tmpl.renderView('view-post-tmpl', new BlogPost().load(post_id));
            },
            
            edit_post: function(post_id) {
                var post = new BlogPost().load(post_id);
                
                post.tagsContent = ko.computed({
                    read: function() {
                        return post.tags().join(", ");
                    },
                    write: function(content) {
                        var tags = _.map(content.split(","), function(tag) {
                            return tag.replace(/\s/g, "");
                        });
                        this.tags(tags);
                    },
                    owner: post
                });
                
                formExtender.apply(post, {
                    submit: 'default',
                    cancel: 'default'
                });
                
                app.tmpl.renderView('edit-post-tmpl', post);
            }
        };
        
        return module;
    });

});
