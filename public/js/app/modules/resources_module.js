define([
    'core/app',
    'app/models/user',
    'app/models/blog',
    'app/models/blog_post'
], function(app, User, Blog, BlogPost) {
    
    app.core.define('ResourcesModule', function(sandbox) {
        var module = {
            "@TypesModule.ready": function(typesModule) {
                var resources = [
                    {objCtor: User, typeName: "user", collectionName: "users"},
                    {objCtor: Blog, typeName: "blog", collectionName: "blogs" },
                    {objCtor: BlogPost, typeName: "blog_post", collectionName: "blog_posts" }
                ];
                
                _.each(resources, function(resource) {
                    typesModule.registerResource(resource);
                });
                
                /*User.load(1, function(user) {
                    alert(JSON.stringify(user));
                });*/
                
                this.publish('ready', [this]);
            }
        };
        
        return module;
    });
    
});
