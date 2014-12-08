angular.module('clienteService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Clientes', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/clientes');
			},
			create : function(clienteData) {
				return $http.post('/api/cliente', clienteData);
			},
			delete : function(id) {
				return $http.delete('/api/cliente/' + id);
			},
			put : function(id) {
				return $http.put('/api/cliente/' + id);
			}
		}
	}]);