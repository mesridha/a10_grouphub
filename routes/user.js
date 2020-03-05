/* File: user.js
* Load 'users.json'
*/

//loads json and renders user_prof
exports.view = function(req, res){
    
    var name = req.params.user;
    
    var name = {
        "name" : name
    };

    res.render('user', name);
    
};
