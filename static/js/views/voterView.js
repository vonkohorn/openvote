define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Voter = require('models/voter')
    , t_maincontent = require('text!templates/maincontent.html')
    , t_voter = require('text!templates/voter.html')
    
    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        tagName: 'li',

        // View constructor
        initialize: function() {
            console.log("    voterView.initialize");
        },

        // Update the DOM
        render: function() {
            console.log("    voterView.render started");
            html = _.template( t_voter, {voter: this.model.toJSON()} );
            this.$el.html(html);
            return this
            console.log("    voterView.render done");
        },
        
    });
	
    // Returns the View class
    return View;
});
