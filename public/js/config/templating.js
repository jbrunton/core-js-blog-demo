define([
    'text!app/templates/master.htm'
], function(masterTmpl) {

    var config = {
        module: 'Templates',
        defaultMaster: masterTmpl
    };
    
    return config;

});