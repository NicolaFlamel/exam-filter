'use strict';

var productsControllers = angular.module("productsControllers", []);

productsControllers.controller('productFilterCtrl', function ($scope, $http) {

    //Read data from file
     /*$http.get('./productData/data.json')
     .success(function(data){
     $scope.productList = data;
     })
     .error(function(err){
     console.log("Oops you have an error",err);
     });*/

    $http.get('/main')
        .success(function (data) {
            $scope.productList = data;
            console.log(data);
        })
        .error(function (err) {
            console.log("Oops you have an error", err);
        });

    $scope.products = [];

    $scope.productChoose = function (brand) {
        var i = $.inArray(brand, $scope.products);
        if (i > -1) {
            $scope.products.splice(i, 1);
        } else {
            $scope.products.push(brand);
        }
    }

    $scope.cameraFilter = function (productList) {
        if ($scope.products.length > 0) {
            if ($.inArray(productList.brand, $scope.products) < 0)
                return;
        }
        return productList;
    }
	

    $scope.deleteProduct = function (deleteName) {
        $http.get("/delete/" + deleteName)
            .success(function () {
                console.log("Product deleted");
            })
            .error(function (err) {
                console.log("Error: " + err);
            });

        $http.get("/main").success(function (data) {
            $scope.productList = data;
        });
    }

    $scope.addProduct = function () {
        var productInfo = 'title=' + $scope.title + '&price=' + $scope.price + '&brand=' + $scope.brand + '&resolution=' + $scope.resolution;
        $http({
            method: 'POST',
            url: '/add',
            data:productInfo,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        $http.get("/add-product").success(function (data) {
            $scope.productList = data;
        });
    }


    $scope.changeProduct = function(title,price,brand,resolution){

        $scope.changeTitle = title;
        $scope.changePrice = price;
        $scope.changeBrand = brand;
        $scope.changeResolution = resolution;


        $scope.change = function(){

            var changes = {
                "title": $scope.changeTitle,
                "price": $scope.changePrice,
                "brand":$scope.changeBrand,
                "resolution":$scope.changeResolution,
                "oldName":title
            }

            $http({
                method:"POST",
                url:"/changes",
                data:changes
            });

            $http.get('/main')
                .success(function (data) {
                    $scope.productList = data;
                    console.log(data);
            })

        }

        $( "#dialog-modal" ).dialog({
            height: 320,
            width:280,
            modal: true
        });


    }

});


