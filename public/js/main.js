require([
    'core/app',
    
    'config/routing',
    'config/templating',
    'config/auth',
    'config/resources',
    
    'app/modules/resources_module',
    
    'app/controllers/home_controller',
    'app/controllers/blogs_controller',
    
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