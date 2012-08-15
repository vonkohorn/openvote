define(['jquery', 'backbone'], function($, Backbone) {

    var Candidate = Backbone.Model.extend({
            
            urlRoot: '/api/v1/candidate/',
            idAttribute: 'id',

    });

    // Returns the Model class
    return Candidate;

});
