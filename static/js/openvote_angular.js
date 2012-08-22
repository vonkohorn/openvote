angular.module('ovApp', []).
    config(function($interpolateProvider) {
        $interpolateProvider.startSymbol('<[');
        $interpolateProvider.endSymbol(']>');
    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {controller:ElectionListCtrl, templateUrl:'static/templates/election_list.html'})
            .when('/election/new', {controller:AddElectionCtrl, templateUrl:'static/templates/election_edit.html'})
            .when('/election/edit/:electionID', {controller:EditElectionCtrl, templateUrl:'static/templates/election_edit.html'})
            .when('/election/:electionID', {controller:ElectionCtrl, templateUrl:'static/templates/election.html'})
            .when('/candidate/:candidateID', {controller:CandidateCtrl, templateUrl:'static/templates/candidate.html'})
            .otherwise({redirectTo:'/'});
  });

function AppCtrl($scope) {
    $scope.voter = {name:'Guest', is_authenticated:false};

    // $scope.elections = Election.query();
    $scope.elections = [
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
                    approved: true,
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

function EditElectionCtrl($scope, $location, $routeParams) {
    if (!$scope.current_election) {
        $scope.current_election = _.filter(
            _.map($scope.elections, 
                function (election) {
                    if (election.id == $routeParams.electionId) { return election; }
                }),
            function (election) {
                if (election) { return election; }
            }
        )[0];
    }
}

function ElectionCtrl($scope, $location, $routeParams) {
    if (!$scope.current_election) {
        $scope.current_election = _.filter(
            _.map($scope.elections, 
                function (election) {
                    if (election.id == $routeParams.electionId) { return election; }
                }),
            function (election) {
                if (election) { return election; }
            }
        )[0];
    }
}

function CandidateCtrl($scope, $location, $routeParams) {
    if (!$scope.current_candidate) {
        $scope.current_candidate = _.filter(
            _.map($scope.elections,
                function (election) {
                    var current_candidate  = _.find(election.candidates, function (candidate) { return candidate.id == $routeParams.candidateID; });
                    if (candidate) { return candidate; }
                }),
            function (candidate) { 
                if (candidate) { return candidate; }
            }
        )[0];
    }
}

function VoterCtrl($scope) {
    $scope.voter = {name:'Guest', is_authenticated:false};

    $scope.authVoter = function() {
        $scope.voter = {name:$scope.voterName, is_authenticated:true};
    };
}
