var express = require('express');
var app = express();
var S = require('string');
var cors = require('cors');

var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

/* CHECK BEFORE ROUTER */
function checkRouterMiddleware(req, res, next){

	if(req.method === 'POST'){
		if(S(req.body).isEmpty()){
			return res.json({'code': 'ERR_SYS_001'});
		}

		if(S(req.body.data).isEmpty()){
			return res.json({'code': 'ERR_SYS_002'});
		}
	}

	next();
}

app.use(cors());
app.use(checkRouterMiddleware);
/* END CHECK BEFORE ROUTER */

/* ROUTES */
require('./routes/security')(app);
require('./routes/home')(app);
require('./routes/function')(app);
require('./routes/doctor')(app);
require('./routes/timetable')(app);
require('./routes/service')(app);
require('./routes/appointment')(app);
require('./routes/problem')(app);
require('./routes/site')(app);
require('./routes/allergie')(app);
/* END ROUTES */

var server = app.listen(3001, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
})