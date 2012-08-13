define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Voter = require('models/voter')
    , Voters = require('collections/voters')
    , Election = require('models/election')
    , Elections = require('collections/elections')
    , t_footer = require('text!templates/footer.html')
    , t_nav = require('text!templates/nav.html')
    , t_maincontent = require('text!templates/maincontent.html')
    
    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        el: '#app-container',

        // View constructor
        initialize: function() {

            this.voterid = $('#voterid').html()

            // Get/Sync model values from the server... how do?
            this.voter = new Voter({ name: "Thomas Derpty",
                                   is_authenticated: true });
            //this.voter = new Voter({ first_name: "Lame",
              //last_name: "Lame",
              //nickname: "Senor Lamepocalypse",
              //lastlat: 0,
              //lastlon: 0,
              //avglat: 0,
              //avglon: 0,
              //geoupdates: 0 });
            this.voters = new Voters();
            //this.voter.save();
            this.voters.fetch();

            this.election = new Election({ name: "President of the United States of America",
                                   description: "Some long description.",
                                   candidates: [{name: "Barack", id: 1}, {name: "Mitt", id: 2}],
                                   });

            // Set global parameters for the templates
            this.params = {voterid: $('#voterid').html(),
                           voter: this.voter.toJSON(),
                           elections: [this.election.toJSON()],
                      }

            // Set the view's templates
            this.nav = _.template( t_nav, this.params);
            this.footer = _.template( t_footer );
            this.maincontent = _.template( t_maincontent, this.params );
        },
        
        render: function() {

            this.$el.find("#footer").html(this.footer);
            this.$el.find("#nav").html(this.nav);
            this.$el.find("#maincontent").html(this.maincontent);
            console.log("UI Rendered.");
            console.log(this.voters.toJSON());
        },
        
        events: {
            'click #signin': 'signin',
            'click #signout': 'signout',
        },
        
        'signin': function() {
            this.params.voter.is_authenticated = true;
            this.nav = _.template(t_nav, this.params);
            console.log("User signed in as " + this.params.voter.name);
            this.render();
        },
        
        'signout': function() {
            this.params.voter.is_authenticated = false;
            this.nav = _.template(t_nav, this.params);
            console.log("User signed out.");
            this.render();
        },

    });
	
    // Returns the View class
    return View;
});
