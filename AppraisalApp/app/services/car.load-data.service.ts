module ka.services {

    import ICar = ka.models.ICar;

    export interface ICarLoadDataService {
        loadCarsData(): ng.IPromise<ICarsData>;
    }

    export interface ICarsData {
        cars: ICar[]
        // there may be much more properties here
    }

    export class CarLoadDataService implements ICarLoadDataService {

        static $inject = [
            "$q",
            ka.constants.Services.CarService
        ];

        constructor(
            private $q: ng.IQService,
            private carService: ka.services.ICarService
            )
        { }

        loadCarsData(): ng.IPromise<ICarsData> {
            // I am using the 'this.$q.all' approach, because we may want to load multiple data, like cars,
            // dropdowns-data, usernames, etc. If we know that we will load a single data type only,
            // we can just use this.carService.getCars().then((response) => {...})
            var cars: ng.IPromise<ICar[]> = this.carService.getCars();

            var promises = [cars];

            // the response is array of the promised data, that's why we must retreieve it with
            // response[0], response[1], etc
            return this.$q.all(promises).then((response): any => {
                return <ICarsData> {
                    cars: response[0]
                }
            })
        }

        loadFavoureCars(): void {

        }
    }

    angular
        .module('ka')
        .service(ka.constants.Services.CarLoadDataService, CarLoadDataService);
}