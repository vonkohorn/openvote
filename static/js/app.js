angular.module('openvote', ['openvoteServices']).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('<[');
        $interpolateProvider.endSymbol(']>');
    })
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when('/', {templateUrl:'/static/templates/welcome.html'})

            .when('/contests', {controller:ContestsCtrl, templateUrl:'/static/templates/contests.html'})
            .when('/contest/new', {controller:AddContestCtrl, templateUrl:'/static/templates/contest_edit.html'})
            .when('/contest/edit/:contestId', {controller:ContestCtrl, templateUrl:'/static/templates/contest_edit.html'})
            .when('/contest/:contestId', {controller:ContestCtrl, templateUrl:'/static/templates/contest.html'})
            .when('/contest/:contestId/candidate/:candidateId', {controller:CandidateCtrl, templateUrl:'/static/templates/candidate.html'})

            .when('/about', {templateUrl:'/static/templates/about.html'})
            .when('/help', {templateUrl:'/static/templates/help.html'})
            .when('/terms', {templateUrl:'/static/templates/terms.html'})
            .when('/privacy', {templateUrl:'/static/templates/privacy.html'})
            .when('/code', {templateUrl:'/static/templates/code.html'})
            .otherwise({});
  }])
  .config(["$httpProvider", function(provider) {
      provider.defaults.headers.common['X-CSRFTOKEN'] = $.cookie('csrftoken');
  }]);
