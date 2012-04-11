define([], function() {

    var User = function(data) {
        this.deserialize(data || {});
        
        /*this.viewHref = ko.computed(function() {
            return "/users/" + this.id() + "/view";
        }, this);
        
        this.editHref = ko.computed(function() {
            return "/users/" + this.id() + "/edit";
        }, this);*/
        
        this.emailHref = ko.computed(function() {
            return "mailto:" + this.email();
        }, this);
    };

    return User;
});
