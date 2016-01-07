'use strict';
(function() {

function BocciaController($scope, $http, socket, Auth) {
  var self = this;
  this.awesomeThings = [];
  $scope.isAdmin = Auth.isAdmin;

  $http.get('/api/boccias').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('boccia', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    if (this.awesomeThings.length < 10) {
    $http.post('/api/boccias', { name: self.newThing });
    self.newThing = '';
    }
  };

  this.deleteThing = function(boccia) {
    $http.delete('/api/boccias/' + boccia._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('boccia');
  });
}

angular.module('hiltiEventplannerApp')
  .controller('BocciaCtrl', BocciaController);

})();
