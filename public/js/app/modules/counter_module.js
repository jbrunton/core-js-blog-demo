define([
    'core/app'
], function(app) {

    app.core.define('Counter', function(sandbox) {
    
        var count = 0;
        
        var module = {            
            
            // subscriptions
            
            "@Application.initialize": function() {
                this.ready();
            },
            
            "@Ticker.tick": function() {
                this.inc();
            },
            
            "@pause": function() {
                sandbox.publish("Ticker.stop");
            },
            
            "@resume": function() {
                sandbox.publish("Ticker.start");
            },
            
            "@reset": function() {
                count = 0;
                this.publish('changed', [count]);
            },
            
            
            // implementation
            
            inc: function() {
                ++count;
                this.publish('changed', [count]);
            }
        };
        
        return module;
    
    });

});