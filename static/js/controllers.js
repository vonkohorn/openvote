function AppCtrl($scope, Vote, CivicElections) {
    $scope.voter = window.openvote.voter_json;

    //$scope.elections = window.openvote.app_json;
    CivicElections.get({},function (elections) {
        $scope.elections = elections.elections;
    });

    $scope.contests_voted = function () {
        return 3;
    };

    $scope.contests_unvoted = function () {
        return 0;
    };

    $scope.updateCandidate = function(candidate) {
        $scope.current_candidate = candidate;
    };

    $scope.updateContest = function(contest) {
        $scope.current_contest = contest;
    };

    $scope.vote = function(candidate) {
        var vote_json = {
            "candidate": candidate.candidate,
            "contest": candidate.contest,
            "voter": "/api/v1/voter/1/",
            "approval": candidate.approved
        };

        if (candidate.vote === "") {
            Vote.save({}, vote_json,
                function (vote) {
                    //TODO: update vote id with new value
                }
            );
        } else {
            Vote.update({voteId: candidate.vote}, vote_json, null,
                function (error) {
                    //TODO: Set approved to original value on error
                }
            );
        }
    };
}
AppCtrl.$inject = ['$scope', 'Vote', 'CivicElections'];

function ContestsCtrl($scope) {}
ContestsCtrl.$inject = ['$scope'];

function AddContestCtrl($scope) {}
AddContestCtrl.$inject = ['$scope'];

function ContestListCtrl($scope, $location, $routeParams, Contests) {
    var electionId = $routeParams.electionId;
    Contests.get({electionId: electionId}, {"address": "410 Market St, Chapel Hill, NC"}, function (contests) {
        openvote.contests = contests;
        $scope.contests = contests;
    });
}
ContestListCtrl.$inject = ['$scope', '$location', '$routeParams', 'CivicVoterQuery'];

function ContestCtrl($scope, $location, $routeParams, Contest) {
    if ($scope.current_contest.id !== $routeParams.contestId) {
        $scope.current_contest = $scope.contest[$routeParams.contestId];
    }

    $scope.reset = function () {
        var contestId = $routeParams.contestId;
        Contest.get({contestId: contestId},
            function (contest) {
                _.extend($scope.contests[contestId], contest);
            }
        );
    };

    $scope.update = function () {
        var contest = $scope.current_contest;
        var contestId = $routeParams.contestId;
        var update_json = {
                "desc": contest.desc,
                "contest_day": "2012-11-10",
                "htmlslug": contest.htmlslug,
                "name": contest.name,
                "votercount": contest.votercount,
                "admin": contest.admin
        };
        Contest.update({contestId: contestId}, update_json,
            function () {
                _.extend($scope.contests[contestId], update_json);
            }
        );
    };

    $scope.destroy = function () {
        var contestId = $routeParams.contestId;
        Contest.destroy({contestId: contestId},
            function () {
                delete $scope.contests[contestId];
            }
        );
    };
}
ContestCtrl.$inject = ['$scope', '$location', '$routeParams', 'Contest'];

function CandidateCtrl($scope, $location, $routeParams, Candidate) {
    if ($scope.current_candidate.id !== $routeParams.candidateId) {
        $scope.current_candidate = $scope.contests[$routeParams.contestId].candidates[$routeParams.candidateId];
    }

    $scope.update = function () {
        var candidate = $scope.current_candidate;
        var contestId = $routeParams.contestId;
        var candidateId = $routeParams.candidateId;
        var update_json = {
                "desc": candidate.desc,
                "contest_day": "2012-11-10",
                "htmlslug": candidate.htmlslug,
                "name": candidate.name,
                "contest": candidate.contest
        };
        Candidate.update({candidateId: candidateId}, update_json,
            function () {
                _.extend($scope.contests[contestId].candidates[candidateId], update_json);
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
