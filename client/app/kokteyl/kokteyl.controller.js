'use strict';
(function() {

function KokteylController($scope, $http, socket, Auth) {
  var self = this;
  this.awesomeThings = [];
  $scope.isAdmin = Auth.isAdmin;

  $http.get('/api/kokteyls').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('kokteyl', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    if (this.awesomeThings.length < 25) {
    $http.post('/api/kokteyls', { name: self.newThing });
    self.newThing = '';
    }
  };

  this.deleteThing = function(kokteyl) {
    $http.delete('/api/kokteyls/' + kokteyl._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('kokteyl');
  });
}

angular.module('hiltiEventplannerApp')
  .controller('KokteylCtrl', KokteylController);

})();
