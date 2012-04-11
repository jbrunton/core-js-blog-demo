require([
    'core/app',
    
    'config/routing',
    'config/templating',
    'config/auth',
    'config/resources',
    
    'core/modules/types_module',
    
    'app/controllers/home_controller',
    'app/controllers/blogs_controller',
    'app/controllers/auth_controller',
    'app/controllers/users_controller',
    
    'app/modules/header_module',
    
    'infrastructure/auth_module',
    'infrastructure/routing_module',
    'infrastructure/templating_module',
    
    'util/util'
], function(app, routingConfig, templatingConfig, authConfig, resourcesConfig) {

    app.initialize({
        routing: routingConfig,
        templating: templatingConfig,
        auth: authConfig,
        resources: resourcesConfig
    });

});