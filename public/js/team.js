'use strict';

//Ready initialize
$(document).ready(function() {
	initializePage();
});

/*
 * Function called when document is ready
 *
 */
function initializePage() {
}

function readJSONData() {
	$('.edits').each(function( ) {

        var trait_editing = $(this);
        var trait = trait_editing[0].attributes['id'].textContent;
        var trait = trait.split("_");

		//console.log(trait_editing[0]);
		var split = trait.values();
		var trait = split.next()['value'];
        var name = split.next()['value'];

		//concat () with trait
		$("a[id='trait_id']").text(trait);
		//makeUpdates(trait[0], trait[1]);

		var track = new Object();
		track.name = name;
		track.trait = trait;
		var tracked = JSON.stringify(track);
		console.log(tracked);

	});
}

/**
 * load localstr 'user' THEN 'friends' | div = personality type
 * add handlebar {{syntax}} to access traits.json for traits/roles
 */
 function addMembers() {

 	// add user
	var user = JSON.parse(localStorage.getItem('current'));
	var userName = user[0];
	var userType = user[2];
	var htmlUser = "<div class='users' id='" + userName + "'><h3>" + userName + "</h3>";
	htmlUser += "<div class='types' id='" + userType + "'><h4>" + userType + "</h4></div></div>";
	$('.team_container').append(htmlUser);	

	// add friends: search local str for 'friend'
	var members = JSON.parse(localStorage.getItem('friends_traits'));	
	for (var f=0; f<members.length;) {
		//get member and type; (++) to skip array[name, type, name, type...]
		var memberName = members[f];
		var memberType = members[++f];
		var htmlMember = "<div class='users' id='" + memberName + "'><h3>" + memberName + "</h3>";
		htmlMember += "<div class='types' id='" + memberType + "'><h4>" + memberType + "</h4></div></div>";
		$('.team_container').append(htmlMember);	
		f++;
	}


	addType();
 }

/* givem a user, returns the deleted traits and not-deleted traits of that user.
not-deleted traits = all possible traits of the user's personality 
					MINUS 
					the traits user deleted */
function getTraits(user) {
	var types;
	var allTraits;
	var personality = user[2];
	var deletedTraits = [];
	if (user.length > 3) {
		deletedTraits = user[3];
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
		}
	}

	var notdeletedTraits = allTraits.filter(x => !deletedTraits.includes(x));
	return [deletedTraits, notdeletedTraits];
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
					var [_, traits] = getTraits(user);
				} else {
					var traits = type[i]["attributes"];
				}
				// gather all the traits of this personality
				var htmlTraits = "<div class='traits'>";
				for (var j in traits) {
					htmlTraits += "<h6>" + traits[j] + "<br>" + "</h6>";
				}
				htmlTraits += "</div>";
				$(this).append(htmlTraits);
			}
		}

 	});
}