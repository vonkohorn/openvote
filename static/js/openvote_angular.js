angular.module('ovApp', []).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('<[');
        $interpolateProvider.endSymbol(']>');
    }).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:ElectionListCtrl, templateUrl:'static/templates/election_list.html'}).
            when('/election/new', {controller:AddElectionCtrl, templateUrl:'static/templates/election_edit.html'}).
            when('/election/edit/:electionID', {controller:EditElectionCtrl, templateUrl:'static/templates/election_edit.html'}).
            when('/election/:electionId', {controller:ElectionCtrl, templateUrl:'static/templates/election.html'}).
            otherwise({redirectTo:'/'});
  });

function AppCtrl($scope) {
    $scope.voter = {name:'Guest', is_authenticated:false};

    // $scope.elections = Election.query();
    $scope.elections = [
        {
            name:'US Presidential Election 2012',
            voted:false,
            id:1
        },
        {
            name:'Some Congressional Election',
            voted:false,
            id:2
        },
        {
            name:'Another Congressional Election',
            voted:false,
            id:3
        }
    ];
};

function ElectionListCtrl($scope) {
    $scope.something = '1';
};

function AddElectionCtrl($scope) {
    $scope.something = '2';
};

function EditElectionCtrl($scope, $location, $routeParams) {
    $scope.election = {name:'todo - get election by ID', voted:false, id:$routeParams.electionId};
};

function ElectionCtrl($scope, $location, $routeParams) {
    $scope.election = {name:'todo - get election by ID', voted:false, id:$routeParams.electionId};
};

function VoterCtrl($scope) {
    $scope.voter = {name:'Guest', is_authenticated:false};

    $scope.authVoter = function() {
        $scope.voter = {name:$scope.voterName, is_authenticated:true};
    };
}
