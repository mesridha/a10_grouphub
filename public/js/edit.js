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

	var htmlUser = "<img style='position: absolute;\
                    width: 250px;\
                    height: 200px;\
                    left: 62px;\
                    top: 5px;' \
                src='../../../../images/logo.jpeg' ... /> \
            <img style='position: absolute;\
                            width: 340px;\
                            height: 30px;\
                            left: 25px;\
                            top: 180px;' \
                src='../../../../images/dots.jpeg' ... /> ";
	htmlUser += "<div class='users'><h2\
                     style='position: absolute;\
                            left: 30%;\
                            right: 58.4%;\
                            top: 30.5%;\
                            bottom: 55.92%;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 18px;\
                            line-height: 22px;\
                            color: #000000;'>" + userName + "</h2> \
						<div class='teams'><h4\
                        style='position: absolute;\
                            left: 20%;\
                            right: 58.4%;\
                            top: 45.33%;\
                            bottom: 55.92%;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: bold;\
                            font-size: 16px;\
                            line-height: 22px;\
                            color: #000000;'> Teams </h4>";
                        var inc = 310;
						for (var i in userTeams) {
							htmlUser += "<h6 id='text3' \
											onclick='changeColor(id)' \
											style='position: absolute;\
											padding-top:10px;\
											padding-left:10px;\
											width:100px;\
											height: 36px;\
											left: 60px;\
											top: " + inc + "px;\
											background: #50A8B4;\
											border: 1px solid #0A47A2;\
											box-sizing: border-box;\
											font-weight: bold'>" 
											+ userTeams[i] +"<br> </h6>";
							inc = inc + 50;
						}
		htmlUser += "</div>"; // close teams div
		htmlUser += "<div class='traits'><h4\
                     style='position: absolute;\
                            left: 29.87%;\
                            right: 26.13%;\
                            top: 38.38%;\
                            bottom: 51.87%;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 20px;\
                            line-height: 30px;\
                            color: #000000;'> Personality: " + userPersonality + "</h4>" +
                            "<h4 style='position: absolute;\
                            left: 60.87%;\
                            right: 26.13%;\
                            top: 45.33%;\
                            bottom: 51.87%;\
                            font-family: 'Sniglet Bold', arial;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 20px;\
                            line-height: 30px;\
                            color: #000000;'> Traits </h4>";
                            var increment = 310;
						for (var i in notdeletedTraits) {
							htmlUser += "<h6 style='position: absolute;\
                                                    padding-top:10px;\
                                                    padding-left:10px;\
                                                    width:100px;\
                                                    height: 30px;\
                                                    left: 220px;\
                                                    font-weight:bold;\
                                                    top: " + increment + "px;\
                                                    background: #50A8B4;\
                                                    border: 1px solid #0A47A2;\
                                                    box-sizing: border-box;' \
                                                    id='" + notdeletedTraits[i] + "' onclick=editTrait()>" + notdeletedTraits[i] + "</h6>";
                            increment = increment + 40;
						}
						for (var i in deletedTraits) {
							htmlUser += "<h6 style='font-weight:normal; color:#FFFFFF' id='" + deletedTraits[i] + "' onclick=editTrait()>" + deletedTraits[i] + "</h6>";
						}
		htmlUser += "</div>"; // close traits div 
		htmlUser += "</div>"; // close users div

	$('.user').append(htmlUser);

}

function changeColor(id) {
    document.getElementById(id).style.background = "#D4F5E9";
    return true;
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