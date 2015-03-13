var main = {};

main.commonError = function(error, code, res){
	return res.status(500).json({error: error, code: code});
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