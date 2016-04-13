var ka;
(function (ka) {
    var services;
    (function (services) {
        var CarLoadDataService = (function () {
            function CarLoadDataService($q, carService) {
                this.$q = $q;
                this.carService = carService;
            }
            CarLoadDataService.prototype.loadCarsData = function () {
                // I am using the 'this.$q.all' approach, because we may want to load multiple data, like cars,
                // dropdowns-data, usernames, etc. If we know that we will load a single data type only,
                // we can just use this.carService.getCars().then((response) => {...})
                var cars = this.carService.getCars();
                var promises = [cars];
                // the response is array of the promised data, that's why we must retreieve it with
                // response[0], response[1], etc
                return this.$q.all(promises).then(function (response) {
                    return {
                        cars: response[0]
                    };
                });
            };
            CarLoadDataService.prototype.loadFavoureCars = function () {
            };
            CarLoadDataService.$inject = [
                "$q",
                ka.constants.Services.CarService
            ];
            return CarLoadDataService;
        })();
        services.CarLoadDataService = CarLoadDataService;
        angular
            .module('ka')
            .service(ka.constants.Services.CarLoadDataService, CarLoadDataService);
    })(services = ka.services || (ka.services = {}));
})(ka || (ka = {}));
//# sourceMappingURL=car.load-data.service.js.map