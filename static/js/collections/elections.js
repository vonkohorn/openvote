define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Election = require('models/election')

    var Elections = Backbone.Collection.extend({
            
            urlRoot: '/api/v1/election/',
            model: Election,

    });

    // Returns the Model class
    return Elections;

});
