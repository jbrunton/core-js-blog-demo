define([], function() {

    var config = {
        resources: [
            {typeName: "user", collectionName: "users"},
            {typeName: "blog", collectionName: "blogs" },
            {typeName: "blog_post", collectionName: "blog_posts" }
        ]
    };
    
    return config;

});