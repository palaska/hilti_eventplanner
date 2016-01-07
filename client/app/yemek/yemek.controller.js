'use strict';
(function() {

function YemekController($scope, $http, socket, Auth) {
  var self = this;
  this.awesomeThings = [];
  $scope.isAdmin = Auth.isAdmin;

  $http.get('/api/yemeks').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('yemek', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    if (this.awesomeThings.length < 25) {
    $http.post('/api/yemeks', { name: self.newThing });
    self.newThing = '';
    }
  };

  this.deleteThing = function(yemek) {
    $http.delete('/api/yemeks/' + yemek._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('yemek');
  });
}

angular.module('hiltiEventplannerApp')
  .controller('YemekCtrl', YemekController);

})();
