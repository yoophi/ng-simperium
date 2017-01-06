SimperiumFactory = ($http, $q, SIMPERIUM_APP_ID, SIMPERIUM_API_KEY) ->
  transformResponse = (data) ->
    try
      data = angular.fromJson data

    return data

  init: (token) ->
    new Simperium SIMPERIUM_APP_ID, token: token

  handleRequest: (url, data) ->
    dfd = $q.defer()
    headers = "X-Simperium-API-Key": SIMPERIUM_API_KEY
    $http
      url: url
      method: 'POST'
      headers: headers
      data: data
      transformResponse: [transformResponse]
    .then (res) ->
      dfd.resolve res.data.access_token;
    , (err) ->
      dfd.reject err.data

    dfd.promise

  authorize: (username, password) ->
    url = "https://auth.simperium.com/1/#{SIMPERIUM_APP_ID}/authorize/";
    data =
      username: username
      password: password

    return @handleRequest url, data

  create: (username, password) ->
    url = "https://auth.simperium.com/1/#{SIMPERIUM_APP_ID}/create/";
    data =
      username: username
      password: password

    return @handleRequest url, data


angular.module 'ngSimperium', []
.factory 'Simperium', ['$http', '$q', 'SIMPERIUM_APP_ID', 'SIMPERIUM_API_KEY', SimperiumFactory]

