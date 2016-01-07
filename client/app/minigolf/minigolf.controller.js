'use strict';
(function() {

function MinigolfController($scope, $http, socket, Auth) {
  var self = this;
  this.awesomeThings = [];
  $scope.isAdmin = Auth.isAdmin;

  $http.get('/api/minigolfs').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('minigolf', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    if (this.awesomeThings.length < 20) {
    $http.post('/api/minigolfs', { name: self.newThing });
    self.newThing = '';
    }
  };

  this.deleteThing = function(minigolf) {
    $http.delete('/api/minigolfs/' + minigolf._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('minigolf');
  });
}

angular.module('hiltiEventplannerApp')
  .controller('MinigolfCtrl', MinigolfController);

})();
