var SimperiumFactory;

SimperiumFactory = function($http, $q, SIMPERIUM_APP_ID, SIMPERIUM_API_KEY) {
  var transformResponse;
  transformResponse = function(data) {
    try {
      data = angular.fromJson(data);
    } catch (error) {}
    return data;
  };
  return {
    init: function(token) {
      return new Simperium(SIMPERIUM_APP_ID, {
        token: token
      });
    },
    authorize: function(username, password) {
      var dfd, headers, url;
      dfd = $q.defer();
      url = "https://auth.simperium.com/1/" + SIMPERIUM_APP_ID + "/authorize/";
      headers = {
        "X-Simperium-API-Key": SIMPERIUM_API_KEY
      };
      $http({
        url: url,
        method: 'POST',
        headers: headers,
        data: {
          username: username,
          password: password
        },
        transformResponse: [transformResponse]
      }).then(function(res) {
        return dfd.resolve(res.data.access_token);
      }, function(err) {
        return dfd.reject(err.data);
      });
      return dfd.promise;
    },
    create: function(username, password) {
      var dfd, headers, url;
      dfd = $q.defer();
      url = "https://auth.simperium.com/1/" + SIMPERIUM_APP_ID + "/create/";
      headers = {
        "X-Simperium-API-Key": SIMPERIUM_API_KEY
      };
      $http({
        url: url,
        method: 'POST',
        headers: headers,
        data: {
          username: username,
          password: password
        },
        transformResponse: [transformResponse]
      }).then(function(res) {
        return dfd.resolve(res.data.access_token);
      }, function(err) {
        return dfd.reject(err.data);
      });
      return dfd.promise;
    }
  };
};

angular.module('ngSimperium', []).factory('Simperium', ['$http', '$q', 'SIMPERIUM_APP_ID', 'SIMPERIUM_API_KEY', SimperiumFactory]);
