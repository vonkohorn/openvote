define(['jquery', 'backbone'], function($, Backbone) {

    var Voter = Backbone.Model.extend({

            urlRoot: '/api/v1/voter/',
            idAttribute: 'id',
            
    });
 
    // Returns the Model class
    return Voter;

});
