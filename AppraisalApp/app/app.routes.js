var ka;
(function (ka) {
    var Routes = (function () {
        function Routes() {
        }
        Routes.configureRoutes = function ($routeProvider) {
            $routeProvider
                .when('/home', {
                controller: ka.constants.Controllers.CarListingController,
                templateUrl: 'app/modules/listings/car-listing.tpl.html',
                controllerAs: 'vm',
                resolve: {
                    data: ['$q', ka.constants.Services.CarLoadDataService,
                        function ($q, carLoadDataService) {
                            var def = $q.defer();
                            carLoadDataService.loadCarsData()
                                .then(function (response) {
                                def.resolve(response);
                            })
                                .catch(function (error) {
                                alert('An Error has Occured! ' + error);
                            });
                            return def.promise;
                        }]
                }
            }).otherwise({
                redirectTo: '/home'
            });
        };
        Routes.$inject = ['$routeProvider'];
        return Routes;
    })();
    ka.Routes = Routes;
})(ka || (ka = {}));
//# sourceMappingURL=app.routes.js.map