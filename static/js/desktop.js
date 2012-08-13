// Sets the require.js configuration for your application.
require.config({
  
  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery-1.7.2.min")
  paths: {

      // Core Libraries
      modernizr: "libs/modernizr-2.5.3",
      jquery: "libs/jquery-1.8.0",
      underscore: "libs/lodash-0.4.2",
      backbone: "libs/backbone-0.9.2",
      io: "libs/socket.io",
      events: "plugins/backbone-eventbroker.amd",
      tastypie: "plugins/backbone-tastypie",

      // Require.js Plugins
      text: "plugins/text-2.0.0"

  },

  // Sets the configuration for your third party scripts that are not AMD compatible
  shim: {

      "tastypie": {
          deps: ["backbone", "jquery", "underscore"]
      },
      "events": {
          deps: ["backbone", "jquery", "underscore"]
      },
      "backbone": {
          deps: ["underscore", "jquery"],
          exports: "Backbone"  //attaches "Backbone" to the window object
      },
      "io": {
          deps: [],
          exports: "io"        //attaches "io" to the window object
      }

  } // end Shim Configuration
  
});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(['modernizr','jquery','backbone','events','routers/desktopRouter','io','tastypie'], function(Modernizr, $, Backbone, Events, Desktop, io) {

    // Instantiates a new Router
    this.router = new Desktop();

    // Instantiates a new backend into window.socket
    window.socket = io.connect('http://localhost:8080');
    window.socket.on('connect', function () {
        console.log('connected');
    });
    window.socket.on('message', function (msg) {
        console.log(msg);
    });
    window.socket.on('disconnect', function () {
        console.log('disconnected');
    });
});
