angular.module('produtoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Produtos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/produtos');
			},
			getSpecific : function(id) {
				return $http.get('/api/produto/' + id);
			},
			create : function(produtoData) {
				return $http.post('/api/produto', produtoData);
			},
			delete : function(id) {
				return $http.delete('/api/produtos/' + id);
			},
			put : function(id, produtoData) {
				return $http.put('/api/produto/' + id, produtoData);
			}
		}
	}]);