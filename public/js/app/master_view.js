define([
    'text!app/templates/master.htm'
], function(masterTmpl) {

    var MasterView = Backbone.View.extend({
        
        el: $('#main'),
        
        template: _.template($(masterTmpl).html()),
    
        initialize: function() {
            
        },
    
        render: function(eventName) {
            console.log("MasterView.render");
            $(this.el).html(this.template());
            // $("a[rel=popover]").popover();
            return this;
        }
    });
    
    // $('body').append($(headerTmpl));
            
    return new MasterView();
});
