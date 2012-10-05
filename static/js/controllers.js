function AppCtrl($scope) {
    $scope.voter = window.openvote.voter_json;

    $scope.elections = window.openvote.app_json;

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
AppCtrl.$inject = ['$scope'];

function ElectionListCtrl($scope) {
}
ElectionListCtrl.$inject = ['$scope'];

function AddElectionCtrl($scope) {
}
AddElectionCtrl.$inject = ['$scope'];

function ElectionCtrl($scope, $location, $routeParams, Election) {
    if ($scope.current_election.id !== $routeParams.electionId) {
        $scope.current_election = $scope.elections[$routeParams.electionId];
    }

    $scope.reset = function () {
        var electionId = $routeParams.electionId;
        Election.get({electionId: electionId},
            function (election) {
                _.extend($scope.elections[electionId], election);
            }
        );
    };

    $scope.update = function () {
        var election = $scope.current_election;
        var electionId = $routeParams.electionId;
        var update_json = {
                "desc": election.desc,
                "election_day": "2012-11-10",
                "htmlslug": election.htmlslug,
                "name": election.name,
                "votercount": election.votercount,
                "admin": election.admin
        };
        Election.update({electionId: electionId}, update_json,
            function () {
                _.extend($scope.elections[electionId], update_json);
            }
        );
    };

    $scope.destroy = function () {
        var electionId = $routeParams.electionId;
        Election.destroy({electionId: electionId},
            function () {
                delete $scope.elections[electionId];
            }
        );
    };
}
ElectionCtrl.$inject = ['$scope', '$location', '$routeParams', 'Election'];

function CandidateCtrl($scope, $location, $routeParams, Candidate) {
    if ($scope.current_candidate.id !== $routeParams.candidateId) {
        $scope.current_candidate = $scope.elections[$routeParams.electionId].candidates[$routeParams.candidateId];
    }

    $scope.update = function () {
        var candidate = $scope.current_candidate;
        var electionId = $routeParams.electionId;
        var candidateId = $routeParams.candidateId;
        var update_json = {
                "desc": candidate.desc,
                "election_day": "2012-11-10",
                "htmlslug": candidate.htmlslug,
                "name": candidate.name,
                "election": candidate.election
        };
        Candidate.update({candidateId: candidateId}, update_json,
            function () {
                _.extend($scope.elections[electionId].candidates[candidateId], update_json);
            }
        );
    };
}
CandidateCtrl.$inject = ['$scope', '$location', '$routeParams', 'Candidate'];

function VoterCtrl($scope) {
    $scope.authVoter = function() {
        if ($("#voterid").val() == "0") {
            $scope.voter = {name:'Guest', is_authenticated:false};
        } else {
            $scope.voter = {name:"Authenticated", is_authenticated:true};
        }
    };
}
VoterCtrl.$inject = ['$scope'];
