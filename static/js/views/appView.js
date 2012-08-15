define( function(require) {
    var $ = require('jquery')
    , Backbone = require('backbone')
    , Voter = require('models/voter')
    , VoterView = require('views/voterView')
    , Election = require('models/election')
    , Elections = require('collections/elections')
    , ElectionView = require('views/electionView')
    , Candidate = require('models/candidate')
    , Candidates = require('collections/candidates')
    , CandidateView = require('views/candidateView')
    , t_footer = require('text!templates/footer.html')
    , t_nav = require('text!templates/nav.html')
    , t_maincontent = require('text!templates/maincontent.html')
    
    var View = Backbone.View.extend({

        // Represents the actual DOM element that corresponds to your View (There is a one to one relationship between View Objects and DOM elements)
        el: '#app-container',
        
        broker: Backbone.EventBroker,

        // View constructor
        initialize: function() {

            this.voter = new Voter({idAttribute: $("#voterid").val()});
            this.voter.fetch();
            this.voter1 = new Voter({ name: "Thomas Derpty",
                                   is_authenticated: true });

            this.elections = new Elections();
//            this.elections.bind('reset', this.addAll, this);
            this.elections.fetch();
            
            this.election = new Election({ id: 1, name: "President of the United States of America",
                                         description: "Some long description.",
                                         candidates: [{name: "Barack", id: 1}, {name: "Mitt", id: 2}],
                                   });

            this.election2 = new Election({ id: 2,
                                         name: "Another Election",
                                         description: "Another long description.",
                                         candidates: [{name: "Lame Dumberson", id: 3}, {name: "Lamer Derpington", id: 4}],
                                   });

            // Set global parameters for the templates
            this.params = {voterid: 1,
                           voter: this.voter1.toJSON(),
                           election: this.election.toJSON(),
                           elections: [this.election.toJSON(), this.election2.toJSON()],
                      }

            //// Set the view's templates
            this.nav = _.template( t_nav, this.params);
            this.footer = _.template( t_footer );
            this.maincontent = _.template( t_maincontent, this.params );
            
            //this.electionView = new ElectionView({collection: this.elections});
            
            //this.broker.on('election:view', this.renderElection(id), this)
        },

        events: {
            'click #signin': 'signin',
            'click #signout': 'signout',
            'click .vote': 'vote',
        },
        
        addAll: function() {
            this.elections.each(this.addOne);
        },
        addOne: function(election) {
            var view = new ElectionView({model: election});
            this.$("#maincontent").append(view.render().el);
        },

        voterURL: function(id) {
            console.log("    appView.voterURL");
            var view = new VoterView({model: this.voter})
            this.$("#maincontent").html(view.render().el);
         },

        candidateURL: function(id) {
            console.log("    appView.candidateURL");
            var view = new CandidateView({model: this.candidates.get(id)})
            this.$("#maincontent").html(view.render().el);
         },

        electionURL: function(id) {
            console.log("    appView.electionURL");
            var view = new ElectionView({model: this.elections.get(id)})
            this.$("#maincontent").html(view.render().el);
         },


        render: function() {
            console.log("    appView.render started");

            this.$el.find("#maincontent").html(this.maincontent);
            this.$el.find("#nav").html(this.nav);
            this.$el.find("#footer").html(this.footer);

            
            //this.electionView.render();
            console.log("    appView.render done");

        },
        
        'renderElection' : function(id) {
            model = this.elections.get(id)
            new ElectionView({model: model}).render()
        },
        
        'signin': function() {
            //console.log("User signed in as " + this.params.voter.name);
            // Set global parameters for the templates
            var params = {voterid: this.voter.id,
                           voter: this.voter.toJSON(),
                           election: this.election2.toJSON(),
                           elections: this.elections.toJSON(),
                      }
            params.voter.is_authenticated = true;
            //this.nav = _.template(t_nav, this.params);
            //this.render();
            console.log(params);

            // Set the view's templates
            this.nav = _.template( t_nav, params);
            this.footer = _.template( t_footer );
            this.maincontent = _.template( t_maincontent, params );
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
//            this.render();
//            var view = new ElectionView({model: this.elections.get(id)})
  //          this.$("#maincontent").html(view.render().el);
            console.log("Toggle Vote: Candidate ID " + candidateid);
        },



    });
	
    // Returns the View class
    return View;
});
