var mod = angular.module('moduloPrincipal', ['produtoService', 'clienteService', 'revendedoraService']);

	// inject the Revendedora service factory into our controller
	mod.controller('revendedoraController', ['$scope','$http','Revendedoras', function($scope, $http, Revendedoras) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all revendedoras and show them
		// use the service to get all the revendedoras
		Revendedoras.get()
			.success(function(data) {
				$scope.revendedoras = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createRevendedora = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			console.log("entrou garoto!!");
			if ($scope.formData.nome != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				//Chama public/js/services/revendedoras.js
				Revendedoras.criar($scope.formData)

					// if successful creation, call our get function to get all the new revendedoras
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.revendedoras = data; // assign our new list of revendedoras
					});
			}
		};

		$scope.updateRevendedora = function(id) {
			if (id != undefined) {
				if ($scope.formData.nome != undefined) {
					//Chama public/js/services/revendedoras.js
					Revendedoras.editar(id, $scope.formData)
						.success(function(data) {
							$scope.loading = false;
							$scope.revendedoras = data;
						});
				}
			}

		}

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteRevendedora = function(id) {
			$scope.loading = true;

			//Chama public/js/services/revendedoras.js
			Revendedoras.excluir(id)
				// if successful creation, call our get function to get all the new revendedoras
				.success(function(data) {
					$scope.loading = false;
					$scope.revendedoras = data; // assign our new list of revendedoras
				});
		};
	}]);

	// inject the Produto service factory into our controller
	mod.controller('produtoController', ['$scope','$http','Produtos', function($scope, $http, Produtos) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all produtos and show them
		// use the service to get all the produtos
		Produtos.get()
			.success(function(data) {
				$scope.produtos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createProduto = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.nome != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				//Chama public/js/services/produtos.js
				Produtos.create($scope.formData)

					// if successful creation, call our get function to get all the new produtos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.produtos = data; // assign our new list of produtos
					});
			}
		};

		$scope.updateProduto = function(id) {
			if (id != undefined) {
				if ($scope.formData.nome != undefined) {
					//Chama public/js/services/produtos.js
					Produtos.editar(id, $scope.formData)
						.success(function(data) {
							$scope.loading = false;
							$scope.produtos = data;
						});
				}
			}

		}

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteProduto = function(id) {
			$scope.loading = true;

			//Chama public/js/services/produtos.js
			Produtos.excluir(id)
				// if successful creation, call our get function to get all the new produtos
				.success(function(data) {
					$scope.loading = false;
					$scope.produtos = data; // assign our new list of produtos
				});
		};
	}]);

	mod.controller('clienteController', ['$scope','$http','Clientes', function($scope, $http, Clientes) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all clientes and show them
		// use the service to get all the clientes
		Clientes.get()
			.success(function(data) {
				$scope.clientes = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createCliente = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.nome != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				//Chama public/js/services/clientes.js
				Clientes.create($scope.formData)

					// if successful creation, call our get function to get all the new clientes
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.clientes = data; // assign our new list of clientes
					});
			}
		};

		$scope.updateCliente = function(id) {
			if (id != undefined) {
				if ($scope.formData.nome != undefined) {
					//Chama public/js/services/clientes.js
					Clientes.editar(id, $scope.formData)
						.success(function(data) {
							$scope.loading = false;
							$scope.clientes = data;
						});
				}
			}

		}

		// DELETE ==================================================================
		// delete a cliente after checking it
		$scope.deleteCliente = function(id) {
			$scope.loading = true;

			//Chama public/js/services/clientes.js
			Clientes.delete(id)
				// if successful creation, call our get function to get all the new clientes
				.success(function(data) {
					$scope.loading = false;
					$scope.clientes = data; // assign our new list of clientes
				}).error(function(data) {
					alert(data);
				});
		};
	}]);