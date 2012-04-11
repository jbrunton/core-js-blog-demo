define([
    'core/app'
], function(app) {

    var formExtender = {
        apply: function(viewModel, defn) {
            var defaults = {
                submit: function() {
                    viewModel.save(function(obj) {
                        app.nav.to(obj.viewHref());
                    }, { recursive: false });
                },
                cancel: function() {
                    app.nav.to(app.context.peek('History.prevUrl') || viewModel.viewHref());
                }
            };
            
            _.each(defn, function(value, field) {
                if (value === 'default') {
                    viewModel[field] = defaults[field];
                } else {
                    viewModel[field] = value;
                }
            });
        }
    };
    
    return formExtender;
    
});