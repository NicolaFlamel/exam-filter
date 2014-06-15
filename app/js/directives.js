var directives = angular.module("Directives", []);

directives.directive("filterSlider", function ($interval) {
    return {
        restrict: 'AE',
        scope: false,
        link: function ($scope) {

            $scope.productResolutionFrom = 2;
            $scope.productResolutionTo = 20;

            $("#slider-range").slider({
                range: true,
                min: 2,
                max: 20,
                values: [ 2, 20 ],
                slide: function (event, ui) {
                    $("#amount").val("Resolution : " + ui.values[ 0 ] + " - " + ui.values[ 1 ]);
                    $scope.productResolutionFrom = ui.values[ 0 ];
                    $scope.productResolutionTo = ui.values[ 1 ];
                }
            });

            $("#amount").val("Resolution : " + $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ));

            $interval(function () {
                $scope.productResolutionFrom;
                $scope.productResolutionTo;
            });

        }
    }
});
