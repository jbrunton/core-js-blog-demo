define([], function(app) {

    var BlogPost = function(data) {
        this.deserialize(data || {});
   
        this.viewHref = ko.computed(function() {
            return "/posts/" + this.id() + "/view";
        }, this);
        
        this.editHref = ko.computed(function() {
            return "/posts/" + this.id() + "/edit";
        }, this);
        
        /*this.contentHtml = ko.computed(function() {
            if (this.content() && this.content().length) {
                var converter = new Markdown.Converter();
                return converter.makeHtml(this.content());
            } else {
                return "";
            }
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
    
    return BlogPost;
});

