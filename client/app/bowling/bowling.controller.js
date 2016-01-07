'use strict';
(function() {

function BowlingController($scope, $http, socket, Auth) {
  var self = this;
  this.awesomeThings = [];
  $scope.isAdmin = Auth.isAdmin;

  $http.get('/api/bowlings').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('bowling', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    if (this.awesomeThings.length < 32) {
    $http.post('/api/bowlings', { name: self.newThing });
    self.newThing = '';
    }
  };

  this.deleteThing = function(bowling) {
    $http.delete('/api/bowlings/' + bowling._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('bowling');
  });
}

angular.module('hiltiEventplannerApp')
  .controller('BowlingCtrl', BowlingController);

})();
