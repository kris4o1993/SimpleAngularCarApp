((): void => {
    var app = angular.module('ka', ['ngRoute']);
    app.config(ka.Routes.configureRoutes);
})() 