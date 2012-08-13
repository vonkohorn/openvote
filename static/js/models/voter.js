define(['jquery', 'backbone'], function($, Backbone) {

    var Voter = Backbone.Model.extend({

            urlRoot: '/api/v1/voter/',
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
 
    // Returns the Model class
    return Voter;

});