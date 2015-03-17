var main = {};
var S = require('string');

main.commonError = function(error, code, res){
	return res.status(500).json({error: error, code: code});
}

main.checkDatetime = function(datetime){
    if(!datetime) return false;
    var split = datetime.toString().split(' ');
    if(split) var time = split[1].toString().split(':');

    if(!time) return false;
    if(time[0] > 24) return false;
    if(time[1] > 60) return false;

    return true;
}

main.convertToSeconds = function(datetime){
    var time = S(datetime).right(5).s;
    var hour = S(time).left(2).s;
    var minute = S(time).right(2).s;

    return hour*3600+minute*60;
}

main.checkBetweenTimes = function(time, options){
    if(time >= options.from_time && time <= options.to_time) return true;
    return false;
}

main.ensureAuthorized = function(req, res, next){
	var bearerToken;
    var bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = main;