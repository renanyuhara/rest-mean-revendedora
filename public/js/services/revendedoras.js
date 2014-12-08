angular.module('revendedoraService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Revendedoras', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/revendedoras');
			},
			criar : function(revendData) {
				return $http.post('/api/revendedoras', revendData);
			},
			excluir : function(id) {
				return $http.delete('/api/revendedoras/' + id);
			},
			editar : function(id) {
				return $http.put('/api/revendedoras/' + id);
			}
		}
	}]);