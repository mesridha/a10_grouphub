/* File: project_prof.js
* Load 'team.json' for member info
* Post emails to member page w/ "lorem" text
*/

//loads,renders project information
exports.view = function(req, res){
  var traits = require('../traits.json');
  var user = req.params.user;
  var team = req.params.teams;

  traits['user'] = user;
  traits['team'] = team;

  //give data for personality type traits
  res.render('team', traits);
  };