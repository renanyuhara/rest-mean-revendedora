angular.module('produtoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Produtos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/produtos');
			},
			create : function(produtoData) {
				return $http.post('/api/produtos', produtoData);
			},
			delete : function(id) {
				return $http.delete('/api/produtos/' + id);
			},
			put : function(id) {
				return $http.put('/api/produtos/' + id);
			}
		}
	}]);