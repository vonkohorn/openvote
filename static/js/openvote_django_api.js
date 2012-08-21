
// A module for conncting to the OpenVote.US API

angular.module('ov_django', ['ngResource']).
    factory('Election', function($resource) {
      var Election = $resource('https://openvote.us/api/v1/elections/:id',
          { apiKey: 'blerg' }, {
            update: { method: 'PUT' }
          }
      );
 
      Project.prototype.update = function(cb) {
        return Project.update({id: this._id.$oid},
            angular.extend({}, this, {_id:undefined}), cb);
      };
 
      Project.prototype.destroy = function(cb) {
        return Project.remove({id: this._id.$oid}, cb);
      };
 
      return Project;
    });
    
