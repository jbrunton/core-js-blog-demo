define([], function() {
    
    var Counter = function() {
        this.count = ko.observable(0);
        this.paused = ko.observable(false);
        
        this["@Counter.changed"] = function(count) {
            this.count(count);
        };
    };
    
    Counter.prototype.pause = function() {
        this.publish("Counter.pause");
        this.paused(true);
    };
        
    Counter.prototype.resume = function() {
        this.publish("Counter.resume");
        this.paused(false);
    };
    
    Counter.prototype.reset = function() {
        this.publish("Counter.reset");
    };

    return Counter;
});