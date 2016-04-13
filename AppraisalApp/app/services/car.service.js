var ka;
(function (ka) {
    var services;
    (function (services) {
        var CarService = (function () {
            function CarService($q) {
                this.$q = $q;
            }
            CarService.prototype.getCars = function () {
                // Currently I did this with promise, because typically this is how we are going to get data from the API
                var def = this.$q.defer();
                var cars = ka.data.Cars;
                def.resolve(cars);
                return def.promise;
            };
            CarService.$inject = [
                "$q"
            ];
            return CarService;
        })();
        services.CarService = CarService;
        angular
            .module('ka')
            .service(ka.constants.Services.CarService, CarService);
    })(services = ka.services || (ka.services = {}));
})(ka || (ka = {}));
//# sourceMappingURL=car.service.js.map