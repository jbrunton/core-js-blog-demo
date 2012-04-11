define([
    'core/app'
], function(app) {

    var formExtender = {
        apply: function(viewModel, defn) {
            var defaults = {
                submit: function() {
                    viewModel.save(function(obj) {
                        app.nav.urlFor(obj);
                    }, { recursive: false });
                },
                cancel: function() {
                    app.nav.to(app.context.peek('History.prevUrl') || app.nav.urlFor(viewModel));
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