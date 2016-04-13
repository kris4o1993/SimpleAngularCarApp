module ka.modules.listings {

    import ICar = ka.models.ICar;

    export class CarListingController {

        private cars: ICar[] = [];
        private currentDate: Date = new Date();
        private showOnlyLiked: boolean = false;
        private descending: boolean = false;
        private sortBy: string = 'timeCreatedAgo';
        private statusDictionary: { [key: string]: string } = {
            'live_trade': 'LIVE-TRADE',
            'dealer_owned_inventory': 'DEALER OWNED',
            'available_now': 'AVAILABLE NOW',
            'sold': 'SOLD'
        }

        static $inject = [
            ka.constants.Services.CarService,
            ka.constants.Services.CarLoadDataService,
            'data',
            '$window'
        ];

        constructor(
            private carsService: ka.services.ICarService,
            private carsLoadDataService: ka.services.ICarLoadDataService,
            private data: ka.services.ICarsData,
            private $window: ng.IWindowService
            ) { this.onPageLoad() }

        onPageLoad(): void {
            for (var i = 0; i < this.data.cars.length; i++) {

                var car: ICar = this.data.cars[i];

                // I am not really sure if this is the right way to show 'X days ago'. I read about the moment.js and angular.moment.js libraries, but
                // decided to use the approach below
                var createdAtDate = new Date(this.data.cars[i].created_at);
                var diffDays = Math.round(Math.abs((this.currentDate.getTime() - createdAtDate.getTime()) / (ka.constants.oneDay)));
                car['timeCreatedAgo'] = diffDays;


                //setting a proper status in the top left part of the picture
                var status: string = car.sold ? 'sold' : car.share_status;
                switch (status) {
                    case 'live_trade':
                        car['statusClass'] = 'btn btn-danger'
                        break;
                    case 'available_now':
                        car['statusClass'] = 'btn btn-success'
                        break;
                    case 'dealer_owned_inventory':
                        car['statusClass'] = 'btn btn-warning'
                        break;
                    case 'sold':
                        car['statusClass'] = 'btn btn-default'
                        break;
                    default:
                        break;
                }
                car['status'] = this.statusDictionary[status];

                // setting default image if picture_url is missing
                if (!car.picture_url) {
                    car.picture_url = ka.constants.defaultPictureUrl;
                }

                //checking if the car is liked
                var localStorageData = localStorage.getItem(car.vin);
                if (localStorageData == 'true') {
                    car.liked = true;
                } else if (localStorageData == 'false') {
                    car.liked = false;
                }

                this.cars.push(car);
            }
        }

        toggleSorting($event): void {
            this.descending = !this.descending;
        }

        toggleCarLike(car: ICar): void {
            car.liked = !car.liked;
            localStorage.setItem(car.vin, car.liked.toString())
        }

        openBiggerPicture(picture_url: string) {
            if (this.$window.innerWidth > 768) {
                this.$window.open(picture_url, 'blank');
            }
        }
    }

    angular
        .module("ka")
        .controller(ka.constants.Controllers.CarListingController, CarListingController);
} 