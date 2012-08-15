define(['jquery','backbone','views/appView'], function($, Backbone, AppView){

    var Router = Backbone.Router.extend({

        initialize: function(){
        
            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
            // Backbone.EventBroker.on('lame', this.lame, this);

            this.appView = new AppView();
            this.appView.render();
        },

        routes: {
            // When there is no hash bang on the url, the home method is called
            '': 'home',
            'voter/:id': 'voter',
            'election/:id': 'election',
            'candidate/:id': 'candidate',
        },

        'home': function(){
            console.log("Home");
        },

        'voter': function(id){
            console.log("Voter " + id);
            this.appView.voterURL(id);
        },

        'candidate': function(id){
            console.log("Candidate " + id);
            this.appView.candidateURL(id);
        },
        
        'election': function(id) {
            console.log("Election " + id);
            this.appView.electionURL(id);
        },
        
        
    });

    // Returns the Router class
    return Router;
});
