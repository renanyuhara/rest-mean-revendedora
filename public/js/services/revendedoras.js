angular.module('revendedoraService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Revendedoras', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/revendedoras');
			},
			create : function(revendData) {
				return $http.post('/api/revendedoras', revendData);
			},
			delete : function(id) {
				return $http.delete('/api/revendedoras/' + id);
			}
		}
	}]);