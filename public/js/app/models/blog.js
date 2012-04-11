define([], function() {

    var Blog = function(data) {
        this.deserialize(data || {});
        
        /*this.viewHref = ko.computed(function() {
            return "/blogs/" + this.id() + "/view";
        }, this);
        
        this.editHref = ko.computed(function() {
            return "/blogs/" + this.id() + "/edit";
        }, this);*/
   
        this.createdDateFm = ko.computed(function() {
            var created_at = this.created_at();
            if (created_at) {
                return util.fm.formatDate(created_at);
            }
        }, this);
        
        this.createdTimeFm = ko.computed(function() {
            var created_at = this.created_at();
            if (created_at) {
                return util.fm.formatTime(created_at);
            }
        }, this);
    };
    
    return Blog;
});

