'use strict';

//Ready initialize
$(document).ready(function() {
	initializePage();
})

/*
 * Function called when document is ready
 *
 */

/* given a user, returns the deleted traits and not-deleted traits of that user.
 * not-deleted traits = all possible traits of the user's personality 
 *	  				MINUS 
 *					the traits user deleted 
 */
function getTraits(user) {
	var type;
	var allTraits;
	var personality = user[2];
	var deletedTraits = [];
	if (user.length > 3) {
		deletedTraits = user[3];
	}

	// first get ALL the possible traits related to that personality
	if (personality.charAt(0) == 'I') {
		type = (JSON.parse(localStorage.getItem('intro')))["introverted"];
	} else {
		type = (JSON.parse(localStorage.getItem('extro')))["extroverted"];
	}

	for (var i = 0; i < type.length; i++) {
		if (type[i]["type"] == personality) {
			allTraits = type[i]["attributes"];
		}
	}

	var notdeletedTraits = allTraits.filter(x => !deletedTraits.includes(x));
	return [deletedTraits, notdeletedTraits];
}



function initializePage() {
	var user = JSON.parse(localStorage.getItem('current'));
	var userName = user[0];
	var userTeams = user[1];
	var userPersonality = user[2];
	var [deletedTraits, notdeletedTraits] = getTraits(user);

	var htmlUser = "<h1 style='text-align: center'>Profile Page</h1>";
	htmlUser += "<div class='users'><h2>" + userName + "</h2> \
						<div class='teams'><h4> Teams </h4>";
						for (var i in userTeams) {
							htmlUser += "<h6>" + userTeams[i] +"<br> </h6>";
						}
		htmlUser += "</div>"; // close teams div
		htmlUser += "<div class='traits'><h4> Personality: " + userPersonality + "</h4>";
						for (var i in notdeletedTraits) {
							htmlUser += "<h6 style='font-weight:bold' id='" + notdeletedTraits[i] + "' onclick=editTrait()>" + notdeletedTraits[i] + "</h6>";
						}
						for (var i in deletedTraits) {
							htmlUser += "<h6 style='font-weight:normal' id='" + deletedTraits[i] + "' onclick=editTrait()>" + deletedTraits[i] + "</h6>";
						}
		htmlUser += "</div>"; // close traits div 
		htmlUser += "</div>"; // close users div

	$('.user').append(htmlUser);

}


// user[3] keeps track of the deleted traits
function editTrait() {
	var traitToEdit = event.srcElement.id;
	var user = JSON.parse(localStorage.getItem('current'));

	// trait needs to be deleted
	if (event.srcElement.style.fontWeight == 'bold') {
		// check if there had been any deleted traits
		if (user.length <= 3) {
			user.push([traitToEdit]);
		} else {
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
	localStorage.setItem('current', JSON.stringify(user));
	console.log(localStorage.getItem('current'));
}