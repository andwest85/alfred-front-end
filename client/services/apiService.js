app.service('apiService', function($http) {

  return {

    login: function (username, password) {
        var user = {};
        user.username = username;
        user.password = password;
        return $http.post('/api/login', user).then(function(data){
          return data.data;
        }).catch(function (err) {
          console.error("ERROR in backend login: ", err);
        });
    },

    authCheck: function (token) {
        if(token) {
          tokenData = {};
          tokenData.data = token;
          return $http.post('/api/auth', tokenData).then(function(data) {
              return data
          }).catch(function(err) {
              return err;
              console.error('ERROR in backend', err);
          })
        }
    },

    getRooms: function() {
       return $http.get('/api/rooms').then(function(res) {
         return res.data;
       })
    },

    sendMessage: function(messageData) {
        console.log('HITTING SERVICE IF ', messageData);
       return $http.post('/api/message', messageData).then(function(res) {
          return res;
       }).catch(function(err) {
          return err;
         console.error("ERROR: ", err);
       })
    }


   }

});
