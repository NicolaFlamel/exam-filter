var Filters = angular.module("Filters", []);

Filters.filter('checkPriceFrom', function () {
    return function (products, priceFrom, priceTo) {
        var result = [],
            i;

        if (priceFrom == undefined || priceTo == undefined) {
            return products;
        } else {

            for (i in products) {
                if (products[i].price <= priceTo && products[i].price >= priceFrom) {
                    result.push(products[i]);
                }
            }

            return result;
        }
    }
});

Filters.filter('checkMatrixSlide', function () {
    return function (products, priceFrom, priceTo) {
        var result = [],
            i;
        for (i in products) {
            if (products[i].resolution <= priceTo && products[i].resolution >= priceFrom) {
                result.push(products[i]);
            }
        }
        return result;
    }
});
