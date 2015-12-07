'use strict';
(function() {

function BillardController($scope, $http, socket, Auth) {
  var self = this;
  this.awesomeThings = [];
  $scope.isAdmin = Auth.isAdmin;

  $http.get('/api/billards').then(function(response) {
    self.awesomeThings = response.data;
    socket.syncUpdates('billard', self.awesomeThings);
  });

  this.addThing = function() {
    if (self.newThing === '') {
      return;
    }
    if (this.awesomeThings.length < 24) {
    $http.post('/api/billards', { name: self.newThing });
    self.newThing = '';
    }
  };

  this.deleteThing = function(billard) {
    $http.delete('/api/billards/' + billard._id);
  };

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates('billard');
  });
}

angular.module('hiltiEventplannerApp')
  .controller('BillardCtrl', BillardController);

})();
