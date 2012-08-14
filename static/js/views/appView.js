define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Voter = require('models/voter')
    , Election = require('models/election')
    , Elections = require('collections/elections')
    , ElectionView = require('views/electionView')
    , t_footer = require('text!templates/footer.html')
    , t_nav = require('text!templates/nav.html')
    , t_maincontent = require('text!templates/maincontent.html')
    
    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        el: '#app-container',
        
        broker: Backbone.EventBroker,

        // View constructor
        initialize: function() {

            this.voter = new Voter({ name: "Thomas Derpty",
                                   is_authenticated: true });
            //this.voter.save();

            //this.elections = new Election();
            //this.elections.fetch();

            this.election = new Election({ id: 1,
                                         name: "President of the United States of America",
                                         description: "Some long description.",
                                         candidates: [{name: "Barack", id: 1}, {name: "Mitt", id: 2}],
                                   });

            this.election2 = new Election({ id: 2,
                                         name: "Another Election",
                                         description: "Another long description.",
                                         candidates: [{name: "Lame Dumberson", id: 3}, {name: "Lamer Derpington", id: 4}],
                                   });

            // Set global parameters for the templates
            this.params = {voterid: $('#voterid').val(),
                           voter: this.voter.toJSON(),
                           election: this.election.toJSON(),
                           elections: [this.election.toJSON(), this.election2.toJSON()],
                      }

            // Set the view's templates
            this.nav = _.template( t_nav, this.params);
            this.footer = _.template( t_footer );
            this.maincontent = _.template( t_maincontent, this.params );
        },
        
        render: function() {
            console.log("appView.render defaults");

            this.$el.find("#maincontent").html(this.maincontent);
            this.$el.find("#nav").html(this.nav);
            this.$el.find("#footer").html(this.footer);

            var electionView = new ElectionView({model: this.election});
            electionView.render();
            console.log("appView.render done");

        },
        
        events: {
            'click #signin': 'signin',
            'click #signout': 'signout',
            'click .vote': 'vote',
        },
        
        'signin': function() {
            this.params.voter.is_authenticated = true;
            this.nav = _.template(t_nav, this.params);
            this.render();
            console.log("User signed in as " + this.params.voter.name);
        },
        
        'signout': function() {
            this.params.voter.is_authenticated = false;
            this.nav = _.template(t_nav, this.params);
            this.render();
            console.log("User signed out.");
        },

        'vote': function(ev) {
            var candidateid = $(ev.target).data('candidateid');
            //this.candidate.togglevote(voter)
            //this.html = _.template( t_election, {election: this.election.toJSON()} );
            this.render();
            console.log("Vote update: Candidate ID " + candidateid);
        },



    });
	
    // Returns the View class
    return View;
});
