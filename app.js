'use strict';
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');

var index = require('./routes/index');
var user = require('./routes/user');
var team = require('./routes/team');
var personality = require('./routes/personality');
var edit = require('./routes/edit');
var creation = require('./routes/creation');
var help = require('./routes/help');
var sel = require('./routes/sel');
var type = require('./routes/type');
var browse = require('./routes/browse');
// my route location variables

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/creation/:user', creation.view);
app.get('/personality/:user', personality.view);
app.get('/user/:user/project/edit/:teams', edit.view);
app.get('/user/:user', user.view);
app.get('/help', help.view);
app.get('/user/:user/project/:teams', team.view);
app.get('/user/:user/sel/pageA', sel.view); //A B testing [default]
app.get('/user/:user/sel/pageB', sel.viewAlt); //A B tesing
app.get('/type', type.view);
app.get('/browse', browse.view);
app.get('/user', user.view);
// my page routes

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
