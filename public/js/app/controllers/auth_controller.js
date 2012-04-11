define([
    'core/app',
    'text!app/templates/auth/signin.htm'
], function(app, signinTmpl) {

    var AuthViewModel = function() {
        
        this.user_name = ko.observable();
        this.password = ko.observable();
        
        this.signin = function() {
            app.auth.signin(this.user_name(), this.password(), function(user) {
                app.nav.to('/users/' + user.id() + '/view');
            });
        };
    };
    
    app.core.define('AuthController', function(sandbox) {

        var module = {
            //"@Router.ready": function(router) {
                // router.registerController(this);
                // this.publish('ready', [this]);
            //},
            
            "!!Application.controller()": {
                routes: {
                    "auth/signin":  "signin",
                    "auth/signout": "signout"
                },
                
                templates: {
                    "signin-tmpl": $(signinTmpl)
                }
            
            },
            
            "@Application.initialize": function(app) {
                // TODO: remove registerController function from app and automate based on, say, "@routes" attribute on module
                //app.registerController(this);
                //app.registerTemplate('signin-tmpl', $(signinTmpl));
                this.ready();
            },
            
            signin: function() {
                app.tmpl.renderPage('signin-tmpl', new AuthViewModel());
            },
            
            signout: function() {
                app.auth.signout();
                app.nav.to('/');
            }
        };
        
        return module;
    });
});
