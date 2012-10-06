angular.module('openvote', ['openvoteServices']).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('<[');
        $interpolateProvider.endSymbol(']>');
    })
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl:'/static/templates/welcome.html'})
            .when('/about', {templateUrl:'/static/templates/about.html'})
            .when('/help', {templateUrl:'/static/templates/help.html'})
            .when('/terms', {templateUrl:'/static/templates/terms.html'})
            .when('/privacy', {templateUrl:'/static/templates/privacy.html'})
            .when('/code', {templateUrl:'/static/templates/code.html'})
            .when('/election/list', {controller:ElectionListCtrl, templateUrl:'/static/templates/election_list.html'})
            .when('/election/new', {controller:AddElectionCtrl, templateUrl:'/static/templates/election_edit.html'})
            .when('/election/edit/:electionId', {controller:ElectionCtrl, templateUrl:'/static/templates/election_edit.html'})
            .when('/election/:electionId', {controller:ElectionCtrl, templateUrl:'/static/templates/election.html'})
            .when('/election/:electionId/candidate/:candidateId', {controller:CandidateCtrl, 
                                                                    templateUrl:'/static/templates/candidate.html'})
            .otherwise({});
  }])
  .config(["$httpProvider", function(provider) {
      provider.defaults.headers.common['X-CSRFTOKEN'] = $.cookie('csrftoken');
  }]);
