'use strict';
(function() {

function BasketballController($scope, $http, socket, Auth) {
  var self = this;
  this.awesomeThings = [];
  $scope.isAdmin = Auth.isAdmin;

  $http.get('/api/basketballs').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('basketball', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    if (this.awesomeThings.length < 40) {
    $http.post('/api/basketballs', { name: self.newThing });
    self.newThing = '';
    }
  };

  this.deleteThing = function(basketball) {
    $http.delete('/api/basketballs/' + basketball._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('basketball');
  });
}

angular.module('hiltiEventplannerApp')
  .controller('BasketballCtrl', BasketballController);

})();
