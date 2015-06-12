angular.module('tip')
.filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    })
    .filter('myDateFormat', function myDateFormat($filter) {
        return function(text) {
            var tempdate = new Date(text.replace(/-/g, "/"));
            return $filter('date')(tempdate, "dd-MMM-yyyy");
        }
    });