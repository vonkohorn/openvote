define(['jquery','backbone','views/appView'], function($, Backbone, AppView){

    var Router = Backbone.Router.extend({

        initialize: function(){
        
            // Tells Backbone to start watching for hashchange events
            Backbone.history.start();
            // Backbone.EventBroker.on('lame', this.lame, this);

        },

        // All of your Backbone Routes (add more)
        routes: {

            // When there is no hash bang on the url, the home method is called
            '': 'home',
            'candidate/:id': 'candidate',
            'election/:id': 'election',

        },

//        'lame': function(data){
//            console.log(data);
//        },

        'home': function(){

            // Instantiating mainView and anotherView instances
            var appView = new AppView();

            // Renders the mainView template
            appView.render();

        },

        'candidate': function(id){
            var appView = new AppView();
            appView.render();
            Backbone.EventBroker.trigger
            console.log("Candidate selected: Candidate ID = " + id);
        },
        
        'election': function(id) {
            var appView = new AppView();
            appView.render();
//            this.election = 
  //          var electionView = new ElectionView({model: this.election});
    //        electionView.render();
            console.log("Election selected: Election ID = " + id);
        },
        
        
    });

    // Returns the Router class
    return Router;
});
