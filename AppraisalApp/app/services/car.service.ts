module ka.services {

    import ICar = ka.models.ICar;

    export interface ICarService {
        getCars(): ng.IPromise<ICar[]>;
    }

    export class CarService implements ICarService {

        static $inject = [
            "$q"
        ];

        constructor(
            private $q: ng.IQService
            )
        { }

        getCars(): ng.IPromise<ICar[]> {
            // Currently I did this with promise, because typically this is how we are going to get data from the API
            var def: ng.IDeferred<ICar[]> = this.$q.defer<ICar[]>();

            var cars: ICar[] = ka.data.Cars;
            def.resolve(cars);

            return def.promise;
        }
    }

    angular
        .module('ka')
        .service(ka.constants.Services.CarService, CarService);
}