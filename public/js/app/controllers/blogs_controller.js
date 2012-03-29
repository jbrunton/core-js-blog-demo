/*define([
    'core/Application',
    'models/blog',
    'models/blog_post',
    'extenders/form_extender',
    'text!templates/blogs/view-blog.htm',
    'text!templates/blogs/edit-blog.htm',
    'text!templates/blogs/view-post.htm',
    'text!templates/blogs/edit-post.htm'
], function(app, Blog, BlogPost, formExtender, viewBlogTmpl, editBlogTmpl, viewPostTmpl, editPostTmpl) {

    var module = {
        //"@Router.ready": function(router) {
            // router.registerController(this);
            // this.publish('ready', [this]);
        //},
        
        "@Application.initialize": function(app) {
            // TODO: remove registerController function from app and automate based on, say, "@routes" attribute on module
            app.registerController(this);
            // TODO: figure out where to move this.
            app.registerTemplate('view-blog-tmpl', $(viewBlogTmpl));
            app.registerTemplate('edit-blog-tmpl', $(editBlogTmpl));
            app.registerTemplate('view-post-tmpl', $(viewPostTmpl));
            app.registerTemplate('edit-post-tmpl', $(editPostTmpl));
            this.publish('ready', [this]);
        },
        
        routes: {
            "blogs/new":                "new_blog",
            "blogs/:blog_id/view":      "view_blog",
            "blogs/:blog_id/edit":      "edit_blog",
            "blogs/:blog_id/compose":   "new_post",
            "posts/:post_id/view":      "view_post",
            "posts/:post_id/edit":      "edit_post"
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
            
            app.renderView('edit-blog-tmpl', blog);
        },
        
        view_blog: function(blog_id) {
            app.renderView('view-blog-tmpl', new Blog().load(blog_id));
        },
        
        edit_blog: function(blog_id) {
            var blog = new Blog().load(blog_id);
            
            formExtender.apply(blog, {
                submit: 'default',
                cancel: 'default'
            });
            
            app.renderView('edit-blog-tmpl', blog);
        },
        
        new_post: function(blog_id) {
            var post = new BlogPost({ blog_id: blog_id});
            
            formExtender.apply(post, {
                submit: 'default',
                cancel: function() {
                    app.navigate('/blogs/' + blog_id + '/view');
                }
            });
            
            app.renderView('edit-post-tmpl', post);
        },
        
        view_post: function(post_id) {
            app.renderView('view-post-tmpl', new BlogPost().load(post_id));
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
            
            app.renderView('edit-post-tmpl', post);
        }
    };
    
    return module;

});
*/
