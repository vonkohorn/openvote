define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Election = require('models/election')

    var Elections = Backbone.Model.extend({
            
            urlRoot: '/api/v1/election/',
            model: Election,

            defaults: {
	            message: "You are now using Backbone, Lodash, Require, Modernizr, and jQuery! (Click Me)"
            },

            // Model Constructor
            initialize: function() {
               
            },
    
            // Any time a model attribute is set, this method is called
            validate: function(attrs) {
                
            }

    });

    // Returns the Model class
    return Elections;

});
