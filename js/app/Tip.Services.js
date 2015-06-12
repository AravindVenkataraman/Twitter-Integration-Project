angular.module('tip')
.service('TweetsSvc', ['socket', function(socket) {
        this.getTweets = function(param, successCallback, errorCallback) {
            var eventPrefix = "getTweets_" + param.screen_name + "_" + param.session_id;
            socket.emit("getTweets", param);
            socket.on(eventPrefix + ".success", function(result) {
                socket.removeAllListeners(eventPrefix + ".success");
                successCallback(result);
            });
            socket.on(eventPrefix + ".error", function(result) {
                socket.removeAllListeners(eventPrefix + ".error");
                errorCallback(result);
            });
        };
        this.getReTweets = function(param, successCallback) {
            var eventPrefix = "getReTweets_" + +param.tweet_id + "_" + param.session_id;
            socket.emit("getReTweets", param);
            socket.on(eventPrefix + ".success", function(result) {
                socket.removeAllListeners(eventPrefix + ".success");
                successCallback(result);
            });
            socket.on(eventPrefix + ".error", function(result) {
                socket.removeAllListeners(eventPrefix + ".error");
                debugger;
            });
        };
    }])
    .factory('twitterClient', ['$resource', '$http', function($resource, $http) {
        var oauth = OAuth({
            consumer: {
                public: '4Bqakng3FPninHzkM1cBHdI1K',
                secret: 'bIHRofpdKi6yAuBCkftkURQML0VJEPx1KS1iK4ZtBhYIPUpnpF'
            },
            signature_method: 'PLAINTEXT'
        });

        var request_data = {
            url: 'https://api.twitter.com/1.1/statuses/user_timeline.json?count=30&user_id=%40AppDirect&screen_name=%40AppDirect',
            method: 'GET'
        };

        var token = {
            public: '3240535920-NVK2TxKglaCyYWp5WKjHFLT4OxgtX2FIuRtvANc',
            secret: 'liUWbpGd8TLeLZFltX1rsT74lEQN42Ed9loqM3pq7rO3h'
        };

        $.ajax({
            url: request_data.url,
            type: request_data.method,
            data: request_data.data,
            headers: oauth.toHeader(oauth.authorize(request_data, token))
        }).done(function(data) {
            debugger;
        });

    }]);