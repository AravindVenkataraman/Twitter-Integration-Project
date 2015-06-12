var connect = require('connect');
var serveStatic = require('serve-static');
var io = require('socket.io').listen(10, {
    log: false
}); // initiate socket.io server

var Twitter = require('twitter-node-client').Twitter;
var config = {
    "consumerKey": "4Bqakng3FPninHzkM1cBHdI1K",
    "consumerSecret": "bIHRofpdKi6yAuBCkftkURQML0VJEPx1KS1iK4ZtBhYIPUpnpF",
    "accessToken": "3240535920-NVK2TxKglaCyYWp5WKjHFLT4OxgtX2FIuRtvANc",
    "accessTokenSecret": "liUWbpGd8TLeLZFltX1rsT74lEQN42Ed9loqM3pq7rO3h",
    "callBackUrl": ""
}

var twitter = new Twitter(config);


io.sockets.on('connection', function(socket) {
    socket.on('getTweets', function(param) {

        var eventPrefix = "getTweets_" + param.screen_name + "_" + param.session_id;
        twitter.getUserTimeline({
            screen_name: param.screen_name,
            since: param.since,
            until: param.until,
            count: param.count
        }, function(result) {
            socket.emit(eventPrefix + ".error", result);
        }, function(result) {
            socket.emit(eventPrefix + ".success", result);
        });

    });

socket.on('getReTweets', function(param) {

        var eventPrefix = "getReTweets_" + + param.tweet_id + "_" + param.session_id;
        twitter.getCustomApiCall('/statuses/retweets.json', {
            id: param.tweet_id
        }, function(result) {
            socket.emit(eventPrefix + ".error", result);
        }, function(result) {
            socket.emit(eventPrefix + ".success", result);
        });

    });    
});



connect().use(serveStatic(__dirname))
    .listen(8080);

console.log("Node Server Started at Port 8080");
console.log("***********************************")
console.log("Try http://localhost:8080/");
console.log("***********************************")