angular.module('revendedoraController', [])

	// inject the Revendedora service factory into our controller
	.controller('mainController', ['$scope','$http','Revendedoras', function($scope, $http, Revendedoras) {
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
			if ($scope.formData.nome != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Revendedoras.create($scope.formData)

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
					Revendedoras.update(id, $scope.formData)
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

			Revendedoras.delete(id)
				// if successful creation, call our get function to get all the new revendedoras
				.success(function(data) {
					$scope.loading = false;
					$scope.revendedoras = data; // assign our new list of revendedoras
				});
		};
	}]);