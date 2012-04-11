define([
    'text!app/templates/master.htm'
], function(masterTmpl) {

    var config = {
        module: 'Templates',
        defaultMaster: { name: 'master', template: $(masterTmpl) },
        defaultSection: 'content'
        // TODO: maybe move this to a separate module and provide
        // a defaultBindings interface in app.tmpl to set it?
    };
    
    return config;

});