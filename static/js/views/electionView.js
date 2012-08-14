define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Voter = require('models/voter')
    , Election = require('models/election')
    , t_maincontent = require('text!templates/maincontent.html')
    , t_election = require('text!templates/election.html')
    
    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        el: '#maincontent',
        
        broker: Backbone.EventBroker,

        // View constructor
        initialize: function() {
            console.log("electionView.initialize");
           
        },

        // Update the DOM
        render: function() {
            html = _.template( t_election, {election: this.model.toJSON()} );
            this.$el.html(html);
            console.log("electionView.render done");
        },
        
        
    });
	
    // Returns the View class
    return View;
});
