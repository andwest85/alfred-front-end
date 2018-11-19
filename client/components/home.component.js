app.component('home', {
  templateUrl: '../components/home.template.html',
  controller: homeController,
  bindings: {}
});

homeController.$inject = ['$http', '$stateParams', '$state', '$rootScope', 'apiService'];

function homeController($http, $stateParams, $state, $rootScope,apiService) {

  this.$onInit = onInit;

  function onInit() {

    var $ctrl = this;
    $ctrl.error = [];

    $ctrl.login = function () {
      apiService.login($ctrl.username, $ctrl.password).then(function(res) {
        if (res.error) {
          console.log("res error", res);
          $ctrl.error.push(res.error);
        } else if (res.token) {
          localStorage.jwt = res.token;
          $rootScope.jwt = localStorage.jwt;
          localStorage.username = res.username;
          $state.go('loginSuccess');
        }
    }).catch(function(err) {
      console.error("ERROR: ", "\n", err);
    });
};

  }

}
