
exports.view = function(req, res){
  var docs = require('../help2.json');
  res.render('help', docs);
 };
