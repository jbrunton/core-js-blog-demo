define([
    'core/app'
], function(app) {

    var HeaderViewModel = function() {
        this.user = ko.observable(app.auth.currentUser());

        this.authorized = ko.computed(function() {
            return this.user() != null;
        }, this);
        
        this.userUrl = ko.computed(function() {
            return this.authorized()
                ? app.nav.urlFor(this.user())
                : null;
        }, this);
        
        var self = this;
        
        this["@AuthModule.success"] = function(user) {
            self.user(user);
            console.log("authorized: " + self.authorized());
        };
        
        this["@AuthModule.signout"] = function() {
            self.user(null);
            console.log("authorized: " + self.authorized());
        };
    };
    
    app.core.define('HeaderModule', function(sandbox) {
        return {
            "@Application.initialize": function() {
                var header = new HeaderViewModel();
                sandbox.bindSubscriptions(header);
                app.tmpl.defaultBindings({ header: { name: 'header-tmpl', data: header } });
                this.ready();
            }
        };
    });

});
