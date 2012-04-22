define([
    'core/app'
], function(app) {

    var extender = {
        apply: function(obj, options) {
            if (options.contentHtml) {
                obj.contentHtml = ko.computed(function() {
                    if (this.content() && this.content().length) {
                        var converter = new Markdown.Converter();
                        return converter.makeHtml(this.content());
                    } else {
                        return "";
                    }
                }, obj);
            }
            
            if (options.tagsContent) {
                obj.tagsContent = ko.computed({
                    read: function() {
                        return obj.tags().join(", ");
                    },
                    write: function(content) {
                        var tags = _.map(content.split(","), function(tag) {
                            return tag.replace(/\s/g, "");
                        });
                        this.tags(tags);
                    },
                    owner: obj
                });
            }
        }
    };
    
    app.core.defineExtender('blogPostExtensions', extender);
    
});