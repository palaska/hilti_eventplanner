'use strict';
(function() {

function FootballController($scope, $http, socket, Auth) {
  var self = this;
  this.awesomeThings = [];
  $scope.isAdmin = Auth.isAdmin;

  $http.get('/api/footballs').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('football', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    if (this.awesomeThings.length < 64) {
    $http.post('/api/footballs', { name: self.newThing });
    self.newThing = '';
    }
  };

  this.deleteThing = function(football) {
    $http.delete('/api/footballs/' + football._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('football');
  });
}

angular.module('hiltiEventplannerApp')
  .controller('FootballCtrl', FootballController);

})();
