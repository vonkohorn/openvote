define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Voter = require('models/voter')
    , Candidate = require('models/candidate')
    , t_maincontent = require('text!templates/maincontent.html')
    , t_candidate = require('text!templates/candidate.html')
    
    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        tagName: 'li',

        // View constructor
        initialize: function() {
            console.log("    candidateView.initialize");
        },

        // Update the DOM
        render: function() {
            console.log("    candidateView.render started");
            html = _.template( t_candidate, {candidate: this.model.toJSON()} );
            this.$el.html(html);
            return this
            console.log("    candidateView.render done");
        },
        
    });
	
    // Returns the View class
    return View;
});
