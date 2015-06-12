angular.module('tip')
.controller('NavController', ['$state', '$scope', function($state, $scope) {
        $scope.isTweetActive = false;
        $scope.isLayoutActive = false;
        $scope.$on("$stateChangeSuccess", function(evt, to, toP, from, fromP) {
            reset();
            if ($state.includes("tweets")) {
                $scope.isTweetActive = true;
            } else if ($state.includes("layout")) {
                $scope.isLayoutActive = true;
            }
        });

        function reset() {
            $scope.isTweetActive = false;
            $scope.isLayoutActive = false;
        }
    }])
    .controller('LayoutEditController', ['localStorageService', '$state', function(localStorageService, $state) {
        var self = this;
        self.onInit = function() {
            self.settings = localStorageService.get("settings");
            self.calendar_since_open = [];
            self.calendar_untill_open = [];
            angular.forEach(self.settings.screens, function(item){
                self.calendar_since_open.push(false);
                self.calendar_untill_open.push(false);
            });
        };

        self.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        self.date_until_max = new Date();
        self.date_since_max = new Date();

        self.format = 'dd-MMMM-yyyy';

        self.open = function($event, index, flag) {
            $event.preventDefault();
            $event.stopPropagation();
            $.each(self.calendar_since_open, function(index, item){
                self.calendar_since_open[index] = false;
            });
            $.each(self.calendar_untill_open, function(index, item){
                self.calendar_untill_open[index] = false;
            });

            if(flag == 1){
                self.calendar_since_open[index] = true;
            }
            else if(flag == 2){
                self.calendar_untill_open[index] = true;
            }
        };


        self.moveUp = function(index) {
            var new_index = index - 1;
            if (new_index >= 0) {
                shiftIndex(index, new_index);
            }
        };

        self.moveDown = function(index) {
            var new_index = index + 1;
            if (new_index < self.settings.screens.length) {
                shiftIndex(index, new_index);
            }
        };

        self.save = function() {
            localStorageService.set("settings", self.settings);
            $state.go("tweets");
        };

        var shiftIndex = function(old_index, new_index) {
            if (new_index >= self.settings.screens.length) {
                var k = new_index - self.settings.screens.length;
                while ((k--) + 1) {
                    self.settings.screens.push(undefined);
                }
            }
            self.settings.screens.splice(new_index, 0, self.settings.screens.splice(old_index, 1)[0]);
        };
    }])
    .controller('TweetsController', ['TweetsSvc', '$rootScope', '$scope', '$modal', 'localStorageService', function(TweetsSvc, $rootScope, $scope, $modal, localStorageService) {
        var self = this;
        self.src = localStorageService.get("settings").screens;
        angular.forEach(self.src, function(item) {
            item["tweets"] = null;
        });

        self.refreshAll = function() {
            angular.forEach(self.src, function(item) {
                item.tweets = null;
            });
            getTweetsForAllScreens();
        };

        self.refreshSingle = function(index) {
            self.src[index].tweets = null;
            TweetsSvc.getTweets({
                session_id: $rootScope.session_id,
                screen_name: self.src[index].screen_name,
                since: self.src[index].since,
                until: self.src[index].untill,
                count: self.src[index].count
            }, function(result) {
                result = jQuery.parseJSON(result);
                self.src[index].tweets = result;
                //console.log(result);
                $scope.$apply();
            }, function(result) {
                self.src[index].tweets = [];
                $scope.$apply();
            });
        };

        self.isAnyStillLoading = function() {
            var loading = false;
            angular.forEach(self.src, function(item) {
                if (item.tweets == null) {
                    loading = true;
                }
            });
            return loading;
        };

        self.onInit = function() {
            getTweetsForAllScreens();
        };

        self.openReTweetedWindow = function(tweetId) {
            var isList = (localStorageService.get("settings").retweets_view == "1");
            $modal.open({
                templateUrl: isList ? 'html/retweet_list_popup.html' : 'html/retweet_carousel_popup.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
                    $scope.retweets = null;
                    getReTweets(tweetId, function(result) {
                        $scope.retweets = result;
                        $scope.$apply();
                        //console.log(result);
                    });
                    if (!isList) {
                        $scope.myInterval = 5000;
                    }
                    $scope.closeMe = function() {
                        $modalInstance.dismiss();
                    }
                }],
                windowClass: 'auto-modal-window',
                resolve: {
                    params: function() {
                        return {
                            tweet_id: tweetId
                        }
                    }

                }
            });
        };

        self.urlify = function(text) {
            var urlRegex = /(https?:\/\/[^\s]+)/g;
            return text.replace(urlRegex, function(url) {
                return '';
            })
        }

        function getTweetsForAllScreens() {
            angular.forEach(self.src, function(item) {
                TweetsSvc.getTweets({
                    session_id: $rootScope.session_id,
                    screen_name: item.screen_name,
                    since: item.since,
                    until: item.untill,
                    count: item.count
                }, function(result) {
                    result = jQuery.parseJSON(result);
                    item.tweets = result;
                    //console.log(result);
                    $scope.$apply();
                }, function(result) {
                    item.tweets = [];
                    $scope.$apply();
                });
            });
        }

        function getReTweets(tweetId, callback) {
            TweetsSvc.getReTweets({
                session_id: $rootScope.session_id,
                tweet_id: tweetId
            }, function(result) {
                callback(jQuery.parseJSON(result));
            });
        }
    }]);