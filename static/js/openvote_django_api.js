
// A module for connecting to the OpenVote.US API

angular.module('ov_django', ['ngResource']).
    factory('Election', function($resource) {
      var Election = $resource('https://openvote.us/api/v1/election/:id/?format=json',
          { apiKey: 'blerg' }, {
            update: { method: 'PUT' }
          }
      );
 
      Election.prototype.update = function(cb) {
        return Election.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
      };
 
      Election.prototype.destroy = function(cb) {
        return Election.remove({id: this._id.$oid}, cb);
      };
 
      return Election;
    });
    
