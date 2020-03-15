'use strict';

$(document).ready(function() {
    initializePage();
});

/**
 * Function to getTraits from the signup-current user 'add_index' localstr
 * given a user, returns deleted and not deleted for modification later
 */
 function getTraits(user) {
     //from the localstr 'sign_me_up' recreated as 'add_index'
     //called in the initializePage function
     var type;
     var allTraits;
     var allRoles;
     var personality;
     var deletedTraits = [];
     var deletedRoles = [];
     if (user.length > 3) {
         deletedTraits = user[3];
     }
     if (user.length > 4){
         deletedRoles = user[4];        
     }

     //add psuedo for wrong data
     var possibles = ['I', 'E', 'i', 'e'];
     if (possibles.includes(user[2].charAt(0))){
         console.log(user[2]);
         personality = user[2];
     } else {
         personality = "INTJ";
     }

     // ALL possible traits related to personality type
     if (personality.charAt(0) == 'I') {
         type = (JSON.parse(localStorage.getItem('intro')))["introverted"];
     } else {
         type = (JSON.parse(localStorage.getItem('extro')))["extroverted"];
     }

     //console.log(type);

     for (var i=0; i<type.length; i++) {
         if (type[i]["type"] == personality) {
             allTraits = type[i]["attributes"];
             allRoles = type[i]["roles"];
         }
     }

     var notdeletedTraits = allTraits.filter(x => !deletedTraits.includes(x));
     var notdeletedRoles = allRoles.filter(x => !deletedRoles.includes(x));
     return [deletedTraits, notdeletedTraits, deletedRoles, notdeletedRoles];
 }

 /**
  * searches the index for sign_me_up process
  * slightly different from edit.js
  */
function initializePage() {
    var user = JSON.parse(localStorage.getItem('current'));
    console.log(user);
    var userName = user[0];
    var userPersonality = user[2];
    var [deletedTraits, notdeletedTraits, deletedRoles, notdeletedRoles] = getTraits(user);
    var increment = 315;
    console.log([deletedTraits, notdeletedTraits, deletedRoles, notdeletedRoles]);

    //add the html for traits and roles selection
    var htmlUser = "<div class='users'><h2\
                     style='position: absolute;\
                            left: 145px;\
                            top: 210px;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 18px;\
                            line-height: 22px;\
                            color: #000000;'>"
                    +userName +"</h2> \
                        <div class='traits'><h4\
                        style='position: absolute;\
                            left: 60px;\
                            top: 295px;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: bold;\
                            font-size: 16px;\
                            line-height: 22px;\
                            color: #000000;'>Delete Traits</h4>\
                            <h4 style='position: absolute;\
                            left: 250px;\
                            top: 295px;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: bold;\
                            font-size: 14px;\
                            line-height: 22px;\
                            color: #000000;'>Delete Roles</h4>";
                        // for (var i in userTeams) {
                        //     htmlUser += "<h6>" +userTeams[i] + "<br></h6>";
                        // }
    htmlUser += "</div>"; //close traits div

    htmlUser += "<div class='type'><h4\
                     style='position: absolute;\
                            left: 140px;\
                            top: 255px;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 20px;\
                            line-height: 30px;\
                            color: #000000;'>Personality: " +userPersonality +"</h4>";
                        for (var i in notdeletedTraits) {
                            htmlUser += "<h6 style='position: absolute;\
                                                    padding-top:10px;\
                                                    padding-left:10px;\
                                                    width:100px;\
                                                    height: 30px;\
                                                    left: 60px;\
                                                    font-weight:bold;\
                                                    top: " + increment + "px;\
                                                    background: #50A8B4;\
                                                    border: 1px solid #0A47A2;\
                                                    box-sizing: border-box;' \
                                                    id='" + notdeletedTraits[i] + "' onclick=editTrait()>" + notdeletedTraits[i] + "</h6>";
                            increment = increment + 40;
                        }   
                        for (var i in deletedTraits) {
                            htmlUser += "<h6 style='position: absolute;\
                                                    padding-top:10px;\
                                                    padding-left:10px;\
                                                    width:100px;\
                                                    height: 30px;\
                                                    left: 60px;\
                                                    font-weight:normal;\
                                                    top: " + increment + "px;\
                                                    background: #D4F5E9;\
                                                    border: 1px solid #0A47A2;\
                                                    box-sizing: border-box;' \ id='" + deletedTraits[i] + "' onclick=editTrait()>" + deletedTraits[i] + "</h6>";
                        }
                        var top_inc = 315;
                        for (var i in notdeletedRoles) {
                            htmlUser += "<h6 style='position: absolute;\
                                                    padding-top:10px;\
                                                    padding-left:10px;\
                                                    width:100px;\
                                                    height: 40px;\
                                                    left: 250px;\
                                                    font-weight:bold;\
                                                    top: " + top_inc + "px;\
                                                    background: #50A8B4;\
                                                    border: 1px solid #0A47A2;\
                                                    box-sizing: border-box;' \
                                                    id='" + notdeletedRoles[i] + "' onclick=editRole()>" + notdeletedRoles[i] + "</h6>";
                            top_inc = top_inc + 50;
                        }   
                        for (var i in deletedRoles) {
                            htmlUser += "<h6 style='position: absolute;\
                                                    padding-top:10px;\
                                                    padding-left:10px;\
                                                    width:100px;\
                                                    height: 40px;\
                                                    left: 250px;\
                                                    font-weight:normal;\
                                                    top: " + top_inc + "px;\
                                                    background: #D4F5E9;\
                                                    border: 1px solid #0A47A2;\
                                                    box-sizing: border-box;' \ id='" + deletedRoles[i] + "' onclick=editRole()>" + deletedRoles[i] + "</h6>";
                        }                        
    htmlUser += "</div>"; //close type div
    htmlUser += "</div>"; //close users div

    $('.user').append(htmlUser);
}

/**
 * editTraits from the onclick in htmlUser
 * user[3] keeps track of the deleted traits
 * 
 * 'add_index' is from sign_up
 */
function editTrait() {
    var traitToEdit = event.srcElement.id;
	var user = JSON.parse(localStorage.getItem('current'));

	// trait needs to be deleted
	if (event.srcElement.style.fontWeight == 'bold') {
		// check if there had been any deleted traits
		if (user.length <= 3) {
			user.push([traitToEdit]);
		} else {
            console.log(user);
			user[3].push(traitToEdit);
		}
		alert("You have DELETED trait " + traitToEdit);
		event.srcElement.style.fontWeight='normal';
        event.srcElement.style.background='#D4F5E9';        
	} 
	// trait needs to be added back
	else {
		if (user.length > 3) {
			for (var i in user[3]) {
				if (user[3][i] == traitToEdit) {
					(user[3]).splice(i, 1);
				}
			}
		}
		alert("You have ADDED trait " + traitToEdit);
		event.srcElement.style.fontWeight='bold';
        event.srcElement.style.background='#50A8B4';        
	}
	localStorage.setItem('current', JSON.stringify(user));
	console.log(localStorage.getItem('current'));
}

function editRole() {
    var roleToEdit = event.srcElement.id;
    var user = JSON.parse(localStorage.getItem('current'));

    // trait needs to be deleted
    if (event.srcElement.style.fontWeight == 'bold') {
        // check if there had been any deleted traits
        if (user.length <= 4) {
            user.push([roleToEdit]);
        } else {
            console.log(user);
            user[4].push(roleToEdit);
        }
        alert("You have DELETED role " + roleToEdit);
        event.srcElement.style.fontWeight='normal';
        event.srcElement.style.background='#D4F5E9';
    } 
    // trait needs to be added back
    else {
        if (user.length > 4) {
            for (var i in user[4]) {
                if (user[4][i] == roleToEdit) {
                    (user[4]).splice(i, 1);
                }
            }
        }
        alert("You have ADDED role " + roleToEdit);
        event.srcElement.style.fontWeight='bold';
        event.srcElement.style.background='#50A8B4';        
    }
    localStorage.setItem('current', JSON.stringify(user));
    console.log(localStorage.getItem('current'));
}