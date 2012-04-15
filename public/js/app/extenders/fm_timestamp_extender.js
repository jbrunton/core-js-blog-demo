define([
    'core/app'
], function(app) {

    var extender = {
        apply: function(obj) {
            obj.createdDateFm = ko.computed(function() {
                var created_at = this.created_at();
                if (created_at) {
                    return util.fm.formatDate(created_at);
                }
            }, obj);
            
            obj.createdTimeFm = ko.computed(function() {
                var created_at = this.created_at();
                if (created_at) {
                    return util.fm.formatTime(created_at);
                }
            }, obj);
        }
    };
    
    app.core.defineExtender('fmTimestamps', extender);
    
});