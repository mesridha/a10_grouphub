'use strict';

//Ready initialize
$(document).ready(function() {
	initializePage();
});
var inc = 33.39;
var role_inc = 37.39;
/*
 * Function called when document is ready
 *
 */
function initializePage() {
}

// function readJSONData() {
// 	$('.edits').each(function( ) {

//         var trait_editing = $(this);
//         var trait = trait_editing[0].attributes['id'].textContent;
//         var trait = trait.split("_");

// 		//console.log(trait_editing[0]);
// 		var split = trait.values();
// 		var trait = split.next()['value'];
//         var name = split.next()['value'];

// 		//concat () with trait
// 		$("a[id='trait_id']").text(trait);
// 		//makeUpdates(trait[0], trait[1]);

// 		var track = new Object();
// 		track.name = name;
// 		track.trait = trait;
// 		var tracked = JSON.stringify(track);
// 		console.log(tracked);

// 	});
// }

/**
 * load localstr 'user' THEN 'friends' | div = personality type
 * add handlebar {{syntax}} to access traits.json for traits/roles
 */
 function addMembers() {

 	// add user
	var user = JSON.parse(localStorage.getItem('current'));
	var userName = user[0];
	var userType = user[2];
	var htmlUser = "<div class='users' id='" + userName + "'><h3\
					 style='position: absolute;\
                            left: 5.87%;\
                            right: 72.8%;\
                            top: 35.39%;\
                            bottom: 75.86%;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 18px;\
                            line-height: 21px;\
                            color: #1C2472;'>" + userName + "</h3>";
	htmlUser += "<div class='types' id='" + userType + "'><h4 style='color:#FFFFFF'>" + userType + "</h4></div></div>";
	$('.team_container').append(htmlUser);	

	// add friends: search local str for 'friend'
	var members = JSON.parse(localStorage.getItem('friends_traits'));
	var increment = 52.39;	
	for (var f=0; f<members.length;) {
		//get member and type; (++) to skip array[name, type, name, type...]
		var memberName = members[f];
		var memberType = members[++f];
		var htmlMember = "<div class='users' id='" + memberName + "'><h3\
					 style='position: absolute;\
                            left: 5.87%;\
                            right: 72.8%;\
                            top: " + increment + "%;\
                            bottom: 75.86%;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 18px;\
                            line-height: 21px;\
                            color: #1C2472;'>" + memberName + "</h3>";
		htmlMember += "<div class='types' id='" + memberType + "'><h4 style='color:#FFFFFF'>" + memberType + "</h4></div></div>";
		$('.team_container').append(htmlMember);	
		f++;
		increment = increment + 23;
	}


	addType();
	addRole();
 }

/* givem a user, returns the deleted traits and not-deleted traits of that user.
not-deleted traits = all possible traits of the user's personality 
					MINUS 
					the traits user deleted */
function getTraits(user) {
	var types;
	var allTraits;
	var allRoles;
	var personality = user[2];
	var deletedTraits = [];
	var deletedRoles = [];
	if (user.length > 3) {
		deletedTraits = user[3];
	}
	if (user.length > 4) {
		deletedRoles = user[4];
	}

	// first get ALL the possible traits related to that personality
	if (personality.charAt(0) == 'I') {
		types = (JSON.parse(localStorage.getItem('intro')))["introverted"];
	} else {
		types = (JSON.parse(localStorage.getItem('extro')))["extroverted"];
	}

	for (var i = 0; i < types.length; i++) {
		if (types[i]["type"] == personality) {
			allTraits = types[i]["attributes"];
			allRoles = types[i]["roles"];
		}
	}

	var notdeletedTraits = allTraits.filter(x => !deletedTraits.includes(x));
	var notdeletedRoles = allRoles.filter(x => !deletedRoles.includes(x));	
	return [deletedTraits, notdeletedTraits, deletedRoles, notdeletedRoles];
}



 function addType() {
	var intro = (JSON.parse(localStorage.getItem('intro')))["introverted"];
	var extro = (JSON.parse(localStorage.getItem('extro')))["extroverted"];
	var user = JSON.parse(localStorage.getItem('current'));

	$('.users').each(function() {
		//find this id for personality type
		var name = $(this).attr("id");
		var id = ($(this).find(".types")).attr("id");
		var type;

		if (id.charAt(0) == 'I') {
			type = intro;
		} else {
			type = extro;
		}

		for (var i = 0; i < type.length; i++) {
			if (type[i]["type"] == id) {
				// current user, so should only display not-deleted traits
				if (name == user[0]) {
					var [_, traits, _, roles] = getTraits(user);
				} else {
					var traits = type[i]["attributes"];
				}
				// gather all the traits of this personality
				var htmlTraits = "<div class='traits'>";
				for (var j in traits) {
					htmlTraits += "<h6\
					style='position: absolute;\
                            left: 39.47%;\
                            right: 39.2%;\
                            top: "+ inc + "%;\
                            bottom: 75.86%;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 10px;\
                            line-height: 21px;\
                            color: #1C2472;'>" + traits[j] + "<br>" + "</h6>" ;
                    inc = inc + 3;
				}
				htmlTraits += "</div>";
				$(this).append(htmlTraits);
				inc = inc + 3;
			}
		}

 	});
}

 function addRole() {
	var intro = (JSON.parse(localStorage.getItem('intro')))["introverted"];
	var extro = (JSON.parse(localStorage.getItem('extro')))["extroverted"];
	var user = JSON.parse(localStorage.getItem('current'));

	$('.users').each(function() {
		//find this id for personality type
		var name = $(this).attr("id");
		var id = ($(this).find(".types")).attr("id");
		var type;

		if (id.charAt(0) == 'I') {
			type = intro;
		} else {
			type = extro;
		}

		for (var i = 0; i < type.length; i++) {
			if (type[i]["type"] == id) {
				// current user, so should only display not-deleted traits
				if (name == user[0]) {
					var [_, traits, _, roles] = getTraits(user);
				} else {
					var roles = type[i]["roles"];
				}
				// gather all the traits of this personality
				var htmlRoles = "<div class='traits'>";
				for (var j in roles) {
					htmlRoles += "<h6\
					style='position: absolute;\
                           left: 74.13%;\
                            right: 4.53%;\
                            top: "+ role_inc + "%;\
                            bottom: 75.86%;\
                            font-style: normal;\
                            font-weight: normal;\
                            font-size: 10px;\
                            line-height: 21px;\
                            color: #1C2472;'>" + roles[j] + "<br>" + "</h6>" ;
                    role_inc = role_inc + 3;
				}
				htmlRoles += "</div>";
				console.log($(this));
				$(this).append(htmlRoles);
				role_inc = role_inc + 7;
			}
		}

 	});
}