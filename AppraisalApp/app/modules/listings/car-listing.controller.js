var ka;
(function (ka) {
    var modules;
    (function (modules) {
        var listings;
        (function (listings) {
            var CarListingController = (function () {
                function CarListingController(carsService, carsLoadDataService, data, $window) {
                    this.carsService = carsService;
                    this.carsLoadDataService = carsLoadDataService;
                    this.data = data;
                    this.$window = $window;
                    this.cars = [];
                    this.currentDate = new Date();
                    this.showOnlyLiked = false;
                    this.descending = false;
                    this.sortBy = 'timeCreatedAgo';
                    this.statusDictionary = {
                        'live_trade': 'LIVE-TRADE',
                        'dealer_owned_inventory': 'DEALER OWNED',
                        'available_now': 'AVAILABLE NOW',
                        'sold': 'SOLD'
                    };
                    this.onPageLoad();
                }
                CarListingController.prototype.onPageLoad = function () {
                    for (var i = 0; i < this.data.cars.length; i++) {
                        var car = this.data.cars[i];
                        // I am not really sure if this is the right way to show 'X days ago'. I read about the moment.js and angular.moment.js libraries, but
                        // decided to use the approach below
                        var createdAtDate = new Date(this.data.cars[i].created_at);
                        var diffDays = Math.round(Math.abs((this.currentDate.getTime() - createdAtDate.getTime()) / (ka.constants.oneDay)));
                        car['timeCreatedAgo'] = diffDays;
                        //setting a proper status in the top left part of the picture
                        var status = car.sold ? 'sold' : car.share_status;
                        switch (status) {
                            case 'live_trade':
                                car['statusClass'] = 'btn btn-danger';
                                break;
                            case 'available_now':
                                car['statusClass'] = 'btn btn-success';
                                break;
                            case 'dealer_owned_inventory':
                                car['statusClass'] = 'btn btn-warning';
                                break;
                            case 'sold':
                                car['statusClass'] = 'btn btn-default';
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
                        }
                        else if (localStorageData == 'false') {
                            car.liked = false;
                        }
                        this.cars.push(car);
                    }
                };
                CarListingController.prototype.toggleSorting = function ($event) {
                    this.descending = !this.descending;
                };
                CarListingController.prototype.toggleCarLike = function (car) {
                    car.liked = !car.liked;
                    localStorage.setItem(car.vin, car.liked.toString());
                };
                CarListingController.prototype.openBiggerPicture = function (picture_url) {
                    if (this.$window.innerWidth > 768) {
                        this.$window.open(picture_url, 'blank');
                    }
                };
                CarListingController.$inject = [
                    ka.constants.Services.CarService,
                    ka.constants.Services.CarLoadDataService,
                    'data',
                    '$window'
                ];
                return CarListingController;
            })();
            listings.CarListingController = CarListingController;
            angular
                .module("ka")
                .controller(ka.constants.Controllers.CarListingController, CarListingController);
        })(listings = modules.listings || (modules.listings = {}));
    })(modules = ka.modules || (ka.modules = {}));
})(ka || (ka = {}));
//# sourceMappingURL=car-listing.controller.js.map