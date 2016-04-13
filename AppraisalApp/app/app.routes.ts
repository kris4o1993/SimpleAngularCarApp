module ka {
    export class Routes {
        static $inject = ['$routeProvider'];
        static configureRoutes($routeProvider: ng.route.IRouteProvider) {
            $routeProvider
                .when('/home', {
                    controller: ka.constants.Controllers.CarListingController,
                    templateUrl: 'app/modules/listings/car-listing.tpl.html',
                    controllerAs: 'vm',
                    resolve: {
                        data: ['$q', ka.constants.Services.CarLoadDataService,
                            ($q: ng.IQService, carLoadDataService: ka.services.ICarLoadDataService) => {
                                var def = $q.defer();
                                carLoadDataService.loadCarsData()
                                    .then((response) => {
                                        def.resolve(response);
                                    })
                                    .catch((error) => {
                                        alert('An Error has Occured! ' + error);
                                    })
                                return def.promise;
                            }]
                    }
                }).otherwise({
                    redirectTo: '/home'
                });
        }
    }
} 