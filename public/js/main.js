require([
    'core/app',
    
    'config/routing',
    'config/templating',
    'config/auth',
    
    'app/modules/resources_module',
    
    'app/controllers/home_controller',
    
    'engines/auth_module',
    'engines/routing_module',
    'engines/templating_module',
    
    'util/util'
], function(app, routingConfig, templatingConfig, authConfig) {

    app.initialize({
        routing: routingConfig,
        templating: templatingConfig,
        auth: authConfig
    });

});