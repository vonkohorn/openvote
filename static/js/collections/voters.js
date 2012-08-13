define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Voter = require('models/voter')

    var Voters = Backbone.Collection.extend({

            urlRoot: '/api/v1/voter/',
            model: Voter,

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
    return Voters;

});
