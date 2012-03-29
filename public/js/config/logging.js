define([], function() {

    var config = {
        severityLevels: {
            info: "Info",
            notice: "Notice",
            error: "Error"
        },
        
        formatMessage: function(message, severity, timestamp) {
            return this.severityLevels[severity] + ': ' + message + ' [' + timestamp.toString() + ']';
        },
        
        log: function(message, severity, timestamp, formattedMessage) {
            // notify server
        }
    };

    return config;
    
});
