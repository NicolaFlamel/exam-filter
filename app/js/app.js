'use strict';

var productFilter = angular.module('productFilter', ['ngRoute', 'productsControllers', 'Directives', 'Filters']);

productFilter.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/main', {
                templateUrl: "./partials/productPage.html",
                controller: "productFilterCtrl"
            }).
            otherwise({
                redirectTo: '/main'
            });
    }])



