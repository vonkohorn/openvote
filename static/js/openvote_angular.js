angular.module('openvoteServices', ['ngResource'])
    .factory('Election', function($resource){
        // Code for defining Election API stuff
        return $resource('/api/v1/election/:electionId', {}, {
            get: {method: 'GET', params: {format: 'json'}},
            save: {method: 'POST', headers: {'Content-Type': 'application/json'}},
            update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
        });
    })
    .factory('Candidate', function($resource){
        // Code for defining Election API stuff
        return $resource('/api/v1/candidate/:electionId', {}, {
            get: {method: 'GET', params: {format: 'json'}},
            save: {method: 'POST', headers: {'Content-Type': 'application/json'}},
            update: {method: 'PUT', headers: {'Content-Type': 'application/json'}}
        });
    });
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
  }]);

function AppCtrl($scope) {
    $scope.voter = window.voter_json;
    $scope.voter2 = {name:'Guest', is_authenticated:false};

    $scope.elections = window.app_json;
    $scope.elections2 = [
        {
            name:'US Presidential Election 2012',
            voted:false,
            site:'http://www.whitehouse.gov',
            desc:'This is a presidential election.',
            candidates : [
                {
                    name: 'Pres Cand 1',
                    desc: 'This is why I should be Prezzy',
                    htmlslug: 'This should be put in an iframe?',
                    approved: false,
                    id: 10
                },
                {
                    name: 'Pres Cand 2',
                    desc: 'This is why I should be Prezzy',
                    htmlslug: 'This should be put in an iframe?',
                    approved: false,
                    id: 11
                },
                {
                    name: 'Pres Cand 3',
                    desc: 'This is why I should be Prezzy',
                    htmlslug: 'This should be put in an iframe?',
                    approved: false,
                    id: 12
                }
            ],
            id:1
        },
        {
            name:'Some Congressional Election',
            voted:false,
            site:'http://www.congressional.gov',
            desc:'This is a congressional election.',
            candidates : [
                {
                    name: 'Cong Cand 1',
                    desc: 'This is why I should be Congy',
                    htmlslug: 'This should be put in an iframe?',
                    approved: false,
                    id: 4
                },
                {
                    name: 'Cong Cand 2',
                    desc: 'This is why I should be Congy',
                    htmlslug: 'This should be put in an iframe?',
                    approved: true,
                    id: 5
                },
                {
                    name: 'Cong Cand 3',
                    desc: 'This is why I should be Congy',
                    htmlslug: 'This should be put in an iframe?',
                    approved: false,
                    id: 6
                }
            ],
            id:2
        },
        {
            name:'Another Congressional Election',
            voted:false,
            site:'http://www.anothercongy.gov',
            desc:'This is a another congy election.',
            candidates : [
                {
                    name: 'AnCong Cand 1',
                    desc: 'This is why I should be ANOTHER CONGY',
                    htmlslug: 'This should be put in an iframe?',
                    approved: false,
                    id: 7
                },
                {
                    name: 'AnCong Cand 2',
                    desc: 'This is why I should be ANOTHER CONGY',
                    htmlslug: 'This should be put in an iframe?',
                    approved: false,
                    id: 8
                },
                {
                    name: 'AnCong Cand 3',
                    desc: 'This is why I should be ANOTHER CONGY',
                    htmlslug: 'This should be put in an iframe?',
                    approved: true,
                    id: 9
                }
            ],
            id:3
        }
    ];
    $scope.elections_voted = function () {
        return 3;
    };

    $scope.elections_unvoted = function () {
        return 0;
    };

    $scope.updateCandidate = function(candidate) {
        $scope.current_candidate = candidate;
    };

    $scope.updateElection = function(election) {
        $scope.current_election = election;
    };
}

function ElectionListCtrl($scope) {
}

function AddElectionCtrl($scope) {
}

function ElectionCtrl($scope, $location, $routeParams, Election) {
    if ($scope.current_election.id !== $routeParams.electionId) {
        $scope.current_election = $scope.elections[$routeParams.electionId];
    }

    $scope.update = function () {
        var election = $scope.current_election;
        var electionId = $routeParams.electionId;
        var update_json = {
                "desc": election["desc"],
                "election_day": "2012-11-10",
                "htmlslug": election["htmlslug"],
                "name": election["name"],
                "votercount": election["votercount"],
                "admin": election["admin"]
        };
        Election.update({electionId: electionId}, update_json,
                        function (election) {
                            _.extend($scope.elections[electionId], update_json)
                        }
        );
    }
}

function CandidateCtrl($scope, $location, $routeParams, Candidate) {
    if ($scope.current_candidate.id !== $routeParams.candidateId) {
        $scope.current_candidate = $scope.elections[$routeParams.electionId]["candidates"][$routeParams.candidateId];
    }

    $scope.update = function () {
        var candidate = $scope.current_candidate;
        var electionId = $routeParams.electionId;
        var candidateId = $routeParams.candidateId;
        var update_json = {
                "desc": candidate["desc"],
                "election_day": "2012-11-10",
                "htmlslug": candidate["htmlslug"],
                "name": candidate["name"],
                "election": candidate["election"]
        };
        Candidate.update({candidateId: candidateId}, update_json,
                        function (candidate) {
                            alert('WORKED');
                            _.extend($scope.elections[electionId]["candidates"][candidateId], update_json)
                        }
        );
    }
}

function VoterCtrl($scope) {
    $scope.authVoter = function() {
        if ($("#voterid").val() == "0") {
            $scope.voter = {name:'Guest', is_authenticated:false};
        } else {
            $scope.voter = {name:"Authenticated", is_authenticated:true};
        }
    };
}
