//angular.module('ovApp', ['ov_django']).
angular.module('ovApp', []).
    config(function($routeProvider) {
        $routeProvider.
            when('/', {controller:ElectionListCtrl, templateUrl:'static/election_list.html'}).
            when('/election/new', {controller:AddElectionCtrl, templateUrl:'static/election_edit.html'}).
            when('/election/edit/:electionID', {controller:EditElectionCtrl, templateUrl:'static/election_edit.html'}).
            when('/election/:electionId', {controller:ElectionCtrl, templateUrl:'static/election.html'}).
            otherwise({redirectTo:'/'});
  });
 
 
function AppCtrl($scope) {
  // $scope.elections = Election.query();
  $scope.elections = [
    {name:'US Presidential Election 2012', voted:false, id:1},
    {name:'Some Congressional Election', voted:false, id:2},
    {name:'Another Congressional Election', voted:false, id:3}
  ];
  $scope.voter = {name:'Guest', is_authenticated:false};
 

}

// Elections

function ElectionListCtrl($scope) {
//function ElectionListCtrl($scope, Election) {
//  $scope.elections = Election.query();
}

//function AddElectionCtrl($scope, $location, Election) {
//  $scope.save = function() {
//    Election.save($scope.election, function(election) {
//      $location.path('election/edit/' + election._id.$oid);
//    });
//  }
//}
 
function AddElectionCtrl($scope) {
  $scope.addElection = function() {
    $scope.election = { name:$scope.electionName,
                        voted:false};
    $scope.elections.push($scope.election);
    $scope.electionName = '';
}

//function EditElectionCtrl($scope, $location, $routeParams, Election) {
//  var self = this;
// 
//  Election.get({id: $routeParams.electionId}, function(election) {
//    self.original = election;
//    $scope.election = new Election(self.original);
//  });
// 
//  $scope.isClean = function() {
//    return angular.equals(self.original, $scope.election);
//  }
//
//  $scope.destroy = function() {
//    self.original.destroy(function() {
//      $location.path('/');
//    });
//  };
// 
//  $scope.save = function() {
//    $scope.election.update(function() {
//      $location.path('election/' + election._id.$oid);
//    });
//  };
//}

function ElectionCtrl($scope) {
  $scope.debug = 'wassup'
 
  $scope.addElection = function() {
    $scope.election = { name:$scope.electionName,
                        voted:false};
    $scope.elections.push($scope.election);
    $scope.electionName = '';
  };
 
  // count of elections the voter has voted in
  $scope.elections_voted = function() {
    var count = 0;
    angular.forEach($scope.elections, function(election) {
      count += election.voted ? 1 : 0;
    });
    return count;
  };

  // count of elections the voter has NOT voted in
  $scope.elections_unvoted = function() {
    var count = 0;
    angular.forEach($scope.elections, function(election) {
      count += election.voted ? 0 : 1;
    });
    return count;
  };
 
  // refreshes elections list, purging those that have been voted.
  $scope.unvoted_elections = function() {
    var oldElections = $scope.elections;
    $scope.elections = [];
    angular.forEach(oldElections, function(election) {
      if (!election.voted) $scope.elections.push(election);
    });
  };
}

 
// Voter 
  
function VoterCtrl($scope) {
  $scope.voter = {name:'Guest', is_authenticated:false};
 
  $scope.authVoter = function() {
    $scope.voter = {name:$scope.voterName, is_authenticated:true};
  };
}
