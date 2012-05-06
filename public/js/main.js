require([
    'core/app',
    
    'config/routing',
    'config/templating',
    'config/auth',
    'config/resources',
    
    'app/controllers/home_controller',
    'app/controllers/blogs_controller',
    'app/controllers/auth_controller',
    'app/controllers/users_controller',
    'app/controllers/search_controller',
    
    'app/modules/header_module',
    
    'app/extenders/fm_timestamp_extender',
    'app/extenders/url_extender',
    'app/extenders/form_extender',
    'app/extenders/blog_post_extender',
    
    'infrastructure/auth_module',
    'infrastructure/routing_module',
    'infrastructure/templating_module',
    'infrastructure/types_module',
    
    'util/util'
], function(app, routingConfig, templatingConfig, authConfig, resourcesConfig) {

    app.initialize({
        routing: routingConfig,
        templating: templatingConfig,
        auth: authConfig,
        resources: resourcesConfig
    });

});