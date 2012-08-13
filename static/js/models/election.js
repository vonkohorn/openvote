define(['jquery', 'backbone'], function($, Backbone) {

    var Election = Backbone.Model.extend({
            
            urlRoot: '/api/v1/election/',
            idAttribute: '_id',

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

    var Elections = Backbone.Model.extend({
            
            urlRoot: '/api/v1/election',
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
    return Election;

});
