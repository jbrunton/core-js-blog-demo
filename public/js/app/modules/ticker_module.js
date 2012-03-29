define([
    'core/app'
], function(app) {

    app.core.define('Ticker', function(sandbox) {
    
        var tick = function() {
            module.tick();
        }, interval = null;
    
        var module = {
        
            "@Application.initialize": function() {
                this.ready();
            },
            
            "@Application.ready": function() {
                this.start();            
            },
            
            "@Ticker.start": function() {
                this.start();
            },
            
            "@Ticker.stop": function() {
                this.stop();
            },
            
            tick: function() {
                this.publish('tick');
            },
            
            start: function() {
                // app.log.notice('Starting ticker');
                
                if (interval == null) {
                    interval = setInterval(tick, 1000);
                } else {
                    // app.log.notice('Ticker has already started');
                }
            },
            
            stop: function() {
                // app.log.notice('Stopping ticker');

                if (interval != null) {
                    clearInterval(interval);
                    interval = null;
                } else {
                    // app.log.notice('Ticker is already stopped');
                }
            }
        };
        
        return module;
    
    });

});