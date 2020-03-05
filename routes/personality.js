/* File: personality.js
* Load 'personalities.json' to match 4 letter personality type
* Post 'team.json' w/ trait matrix and 4 letter personality type
*/

//loads json and renders user_prof
var traits = require('../traits.json');
exports.view = function(req, res){
    res.render('personality', traits);
  };

//posts traits + p_type