angular.module('pedidovendaService', [])

	// super simple service
	// each function returns a promise object 
	.factory('PedidosVenda', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/pedidovenda');
			},
			getSpecific : function(id) {
				return $http.get('/api/pedidovenda/' + id);
			},
			create : function(pedidoVendaData) {
				return $http.post('/api/pedidovenda', pedidoVendaData);
			},
			delete : function(id) {
				return $http.delete('/api/pedidovenda/' + id);
			},
			put : function(id, pedidoVendaData) {
				return $http.put('/api/pedidovenda/' + id, pedidoVendaData);
			}
		}
	}]);