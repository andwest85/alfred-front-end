app.component('loginSuccess', {
  templateUrl: '../components/loginSuccess.template.html',
  controller: controller,
  bindings: {}
});

function controller($http, $uibModal, $rootScope, $state, $scope, apiService) {
  var $ctrl = this;

  $ctrl.$onInit = onInit;

  $ctrl.sendMessage = function () {
    console.log("USER TEXT: ", $ctrl.userText);
    var messageData = {};
    messageData.text = $ctrl.userText;
    messageData.roomIds = $ctrl.selectedSpaces.map(function(el) {
        return el.id;
    });
    if(messageData && messageData.text && messageData.roomIds && messageData.roomIds.length) {
      $uibModal.open({
        template: `
          <div style="width: 50%; height: 250px; margin-left:auto; margin-right: auto; padding: 10%">
            <h1 style="color: #00bceb">Message Sent!<h1>
          </div>
        `,
      })
      $state.go($state.current, {}, {reload: true});
      return apiService.sendMessage(messageData).then(function(response) {
          console.log("RES", response);
      }).catch(function(err) {
        console.error("ERROR IN CONTROLLER", err);
      })
    } else {
      $uibModal.open({
        template: `
          <div style="width: 50%; height: 250px; margin-left:auto; margin-right: auto; padding: 10%">
            <h1 style="color: #e2231a">Ensure that you have selected a space and typed a message.<h1>
          </div>
        `,
      })
    }

  }

  $ctrl.logout = function () {
    localStorage.clear();
    $rootScope.username = null;
    $rootScope.jwt = null;
    $state.go('home');
  }

  $ctrl.selectedSpaces = [];

  $ctrl.selectSpace = function (index, type) {
    if (type === 'direct') {
      $ctrl.selectedSpaces.push($ctrl.directRooms[index]);
      $ctrl.directRooms.splice(index, 1);
    }
    if (type === 'group') {
      $ctrl.selectedSpaces.push($ctrl.groupRooms[index])
      $ctrl.groupRooms.splice(index, 1);
    }
  }

  $ctrl.selectAll = function() {
    for (var i = 0; i < $ctrl.directRooms.length; i++) {
      $ctrl.selectedSpaces.push($ctrl.directRooms[i]);
    }
    for (var i = 0; i < $ctrl.groupRooms.length; i++) {
      $ctrl.selectedSpaces.push($ctrl.groupRooms[i]);
    }
    $ctrl.directRooms = [];
    $ctrl.groupRooms = [];
  };

  $ctrl.clearAll = function() {
    $state.go($state.current, {}, {reload: true});
  }

  $ctrl.selectAllDirects = function() {
    for (var i = 0; i < $ctrl.directRooms.length; i++) {
      $ctrl.selectedSpaces.push($ctrl.directRooms[i]);
    }
    $ctrl.directRooms = [];
  };

  $ctrl.selectAllGroups = function() {
    for (var i = 0; i < $ctrl.groupRooms.length; i++) {
      $ctrl.selectedSpaces.push($ctrl.groupRooms[i]);
    }
    $ctrl.groupRooms = [];
  };


  function onInit() {

    if(!localStorage.jwt) {
      $state.go('home');
    }

    if(localStorage.jwt){
      return apiService.authCheck(localStorage.jwt).then(function(res) {
        if (!res.data){
          $state.go('home');
          localStorage.clear();
        }
        return apiService.getRooms().then(function(rooms) {
            $ctrl.directRooms = rooms.filter(function(el) {
              return el.type === 'direct';
            });
            $ctrl.groupRooms = rooms.filter(function(el) {
              return el.type === 'group';
            });
        });
      }).catch(function(err) {
        console.error("CONTROLLER ERROR: ", err);
      });
      // if(!localStorage.jwt) $state.go('home');
    }
  }

}
