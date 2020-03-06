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

    console.log([deletedTraits, notdeletedTraits]);

    //add the html for traits and roles selection
    var htmlUser = "<h1 style='text-align: center'>Profile Page</h1>";
    htmlUser = "<div class='users'><h2>" +userName +"</h2> \
                        <div class='traits'><h4>Traits</h4>";
                        // for (var i in userTeams) {
                        //     htmlUser += "<h6>" +userTeams[i] + "<br></h6>";
                        // }
            htmlUser += "</div>"; //close traits div

    htmlUser += "<div class='type'><h4> Personality: " +userPersonality +"</h4>";
                        for (var i in notdeletedTraits) {
                            htmlUser += "<h6 style='font-weight:bold' id='" + notdeletedTraits[i] + "' onclick=editTrait()>" + notdeletedTraits[i] + "</h6>";
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