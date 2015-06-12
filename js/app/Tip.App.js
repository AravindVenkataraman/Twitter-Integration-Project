angular.module('tip', ['ui.router', 'ui.bootstrap', 'ngResource', 'LocalStorageModule', 'ui.sortable'])
    .config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {
        $stateProvider
            .state("tweets", {
                url: '/tweets',
                templateUrl: 'html/tweets.html',
                controller: 'TweetsController',
                controllerAs: "tweetsCtrl"
            })
            .state("layout", {
                url: '/layout',
                template: '<div ui-view></div>'
            })
            .state("layout.edit", {
                url: '/edit',
                templateUrl: 'html/layout_edit.html',
                controller: 'LayoutEditController',
                controllerAs: "layoutEditCtrl"
            });
        $urlRouterProvider.otherwise('/tweets');
        localStorageServiceProvider
            .setPrefix('tip')
            .setStorageType('localStorage')
            .setNotify(true, true);
    }])
    .constant('defaultSettings', {
        screens: [{
            screen_name: "@AppDirect",
            count: 30,
            since: new Date(),
            untill: new Date()
        }, {
            screen_name: "@laughingsquid",
            count: 30,
            since: new Date(),
            untill: new Date()
        }, {
            screen_name: "@techcrunch",
            count: 30,
            since: new Date(),
            untill: new Date()
        }],
        retweets_view: 1
    })
    .value('socket', io.connect('http://localhost:10'))
    .run(['$rootScope', 'localStorageService', 'defaultSettings', function($rootScope, localStorageService, defaultSettings) {
        function guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        $rootScope.session_id = guid();
        if (localStorageService.isSupported) {
            var settings = localStorageService.get("settings");
            if (settings == null) {
                localStorageService.set("settings", defaultSettings);
            }
        }
    }]);