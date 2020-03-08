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
     var personality;
     var deletedTraits = [];
     if (user.length > 3) {
         deletedTraits = user[3];
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
         }
     }

     var notdeletedTraits = allTraits.filter(x => !deletedTraits.includes(x));
     return [deletedTraits, notdeletedTraits];
 }

 /**
  * searches the index for sign_me_up process
  * slightly different from edit.js
  */
function initializePage() {
    var user = JSON.parse(localStorage.getItem('add_index'));
    console.log(user);
    var userName = user[0];
    var userPersonality = user[2];
    var [deletedTraits, notdeletedTraits] = getTraits(user);
    var increment = 330;
    console.log([deletedTraits, notdeletedTraits]);

    //add the html for traits and roles selection
    var htmlUser = "<div class='users'><h2\
                     style='position: absolute;\
                            left: 30%;\
                            right: 58.4%;\
                            top: 35.33%;\
                            bottom: 55.92%;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 18px;\
                            line-height: 22px;\
                            color: #000000;'>"
                    +userName +"</h2> \
                        <div class='traits'><h4\
                        style='position: absolute;\
                            left: 20%;\
                            right: 58.4%;\
                            top: 49.33%;\
                            bottom: 55.92%;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: bold;\
                            font-size: 16px;\
                            line-height: 22px;\
                            color: #000000;'>Traits</h4>";
                        // for (var i in userTeams) {
                        //     htmlUser += "<h6>" +userTeams[i] + "<br></h6>";
                        // }
    htmlUser += "</div>"; //close traits div

    htmlUser += "<div class='type'><h4\
                     style='position: absolute;\
                            left: 29.87%;\
                            right: 26.13%;\
                            top: 43.38%;\
                            bottom: 51.87%;\
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
                            htmlUser += "<h6 style='font-weight:normal' id='" + deletedTraits[i] + "' onclick=editTrait()>" + deletedTraits[i] + "</h6>";
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
	var user = JSON.parse(localStorage.getItem('add_index'));

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
	}
	localStorage.setItem('add_index', JSON.stringify(user));
	console.log(localStorage.getItem('add_index'));
}