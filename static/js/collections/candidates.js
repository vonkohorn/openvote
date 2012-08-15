define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Candidate = require('models/candidate')

    var Candidates = Backbone.Collection.extend({
            
            urlRoot: '/api/v1/candidate/',
            model: Candidate,

    });

    // Returns the Model class
    return Candidates;

});
