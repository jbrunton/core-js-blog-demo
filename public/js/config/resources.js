define([
    'app/models/user',
    'app/models/blog',
    'app/models/blog_post'
], function(User, Blog, BlogPost) {

    var config = {
        resources: [
            { typeName: "user", collectionName: "users", objCtor: User },
            { typeName: "blog", collectionName: "blogs", objCtor: Blog },
            { typeName: "blog_post", collectionName: "blog_posts", objCtor: BlogPost }
        ]
    };
    
    return config;

});