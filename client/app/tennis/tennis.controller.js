'use strict';
(function() {

function TennisController($scope, $http, socket, Auth) {
  var self = this;
  this.awesomeThings = [];
  $scope.isAdmin = Auth.isAdmin;

  $http.get('/api/tenniss').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('tennis', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    if (this.awesomeThings.length < 16) {
    $http.post('/api/tenniss', { name: self.newThing });
    self.newThing = '';
    }
  };

  this.deleteThing = function(tennis) {
    $http.delete('/api/tenniss/' + tennis._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('tennis');
  });
}

angular.module('hiltiEventplannerApp')
  .controller('TennisCtrl', TennisController);

})();
