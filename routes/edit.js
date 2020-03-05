
exports.view = function(req, res){
  var user = req.params.user;
  var team = req.params.teams;
  var edits;

  // edits['team'] = team;
  // edits['user'] = user;
  res.render('edit', edits);
  };

