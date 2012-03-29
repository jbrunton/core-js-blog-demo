/*define([
    'core/Application',
    'text!templates/auth/signin.htm'
], function(app, signinTmpl) {

    var AuthViewModel = function() {
        
        this.user_name = ko.observable();
        this.password = ko.observable();
        
        this.signin = function() {
            app.auth.signin(this.user_name(), this.password(), function(user) {
                app.navigate('/users/' + user.id() + '/view');
            });
        };
    };

    var module = {
        //"@Router.ready": function(router) {
            // router.registerController(this);
            // this.publish('ready', [this]);
        //},
        
        "@Application.initialize": function(app) {
            // TODO: remove registerController function from app and automate based on, say, "@routes" attribute on module
            app.registerController(this);
            app.registerTemplate('signin-tmpl', $(signinTmpl));
            this.publish('ready', [this]);
        },
        
        routes: {
            "auth/signin":  "signin",
            "auth/signout": "signout"
        },
        
        signin: function() {
            app.renderView('signin-tmpl', new AuthViewModel());
        },
        
        signout: function() {
            app.auth.signout();
            app.navigate('/');
        }
    };
    
    return module;
});
*/