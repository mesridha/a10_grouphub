'use strict';

//Ready initialize
$(document).ready(function() {
	/**
	 * load which dataset to use
	 */
	initializePage(); //add div for teams of sign_up or log_in
	incorporateData(); //listners on the divs
});

/*
 * Function called w/ doc.ready --- 1st order
 *
 */
function initializePage() {
    //listeners

	/*
	* ----- display correct projects -----
	* add <a>team</a> for each localstr name.teams
	* load on page ready
	* add from localstr the teams as anchors
	*/

	/**
	* routed by sign up-creation page
	* looking in 'new_member' localstr
	* if whoToAdd then change href
	*/
	var whoToAdd = localStorage.getItem('new_member');
	if (whoToAdd) {
		var user = JSON.parse(whoToAdd);
		var name = user[0];
		console.log(user);

		var addThese = [];
		var whereToGo = [];

		for (var r=0; r<user[1].length; r++) {
			//add div class w/ append html
			var html_add = "<div " + "id='" +user[1][r] +"' " +"style='text-align: center'" +">" 
				+user[1][r] +"</div>";

			whereToGo.push("/" +name +"/project/" +user[1][r]);
			addThese.push(html_add);
		}

		for (var b=0; b<addThese.length; b++) {
			$('.teams').append(addThese[b]);
		}

		console.log(addThese);
		console.log(whereToGo);

		//update data localstr 'current'
		var member = localStorage.getItem('new_member');
		console.log(member);
		localStorage.setItem('current', member);

		console.log(JSON.parse(localStorage.getItem('current'))[0]);
				
	} else {
		/**
		* routed by log in-index page
		* looking in 'log_me_in'
		*/
		var loadMe = localStorage.getItem('log_me_in');
		var user = JSON.parse(loadMe);

		var addThese = [];
		var whereToGo = [];
				
		for (var t=0; t < user[1].length; t++) {
			//console.log(user[1][t]);
					
			//add to anchor tag string var
			var html_add = "<div " + "id='" +user[1][t] +"' " +"style='text-align: center'" +">" 
				+user[1][t] +"</div>";

			whereToGo.push("/" +user[0] +"/project/" +user[1][t]);
			addThese.push(html_add);
		}

		console.log(whereToGo);
						
		//same lengths whereTG and AT
		for (var a=0; a<addThese.length; a++) {
			$('.teams').append(addThese[a]);
		}

		//store data in 'current' localstr for incorporateData to use
		localStorage.setItem('current', JSON.stringify(user));

	}

}

/**
 * doc.ready calls in 2nd order
 * incorporate the team divs with click handlers
 */
function incorporateData() {
	//create a friend list on load
	//calls to add members for the team
	addFriends();

	//listeners for children divs of team
	$('.teams > div').each(function(i) {
		$(this).on('click', function() {

			//get correct data from 'current' localstr
			//console.log($(this).attr('id'));
			var id = $(this).attr('id');
			var loadMe = localStorage.getItem('current');
			var user = JSON.parse(loadMe);
			var name = user[0];
			//console.log(user);

			/**
			 * loop user[1].length && change localstr 'friends' to array[loop index]
			 * 
			 */
			//get array[li] && set to localstr
			var friend_list = localStorage.getItem('friends');
			var friend_list = JSON.parse(friend_list);
			var friend_list = friend_list[i];
			//console.log(friend_list[i]);

			//local str 'friends_traits' for teams page
			localStorage.setItem('friends_traits', JSON.stringify(friend_list));

			//add url links
			var nameID = name;
			var groupID = id;
			var groupURL = "/user/" +nameID +"/project/" +groupID;
			console.log(groupURL);
			window.location.href = groupURL;
		});
	});

}

/**
 * creates random profiles to populate later in the process
 * 'friends' localstr in public users.js to display team members
 * called by incorporateData() 
 */
function addFriends() {

    //create random information_names
    //array of each member
    var othersToAdd = [];
    
	
	var groups = localStorage.getItem('current');
	var groups = JSON.parse(groups);
	console.log(groups);
	var groups = groups[1];
	console.log(groups);
	for (var h=0; h<groups.length; h++) {
		var howmany = getHowMany(1, 3);
		var where = h;
		var teamnumbers = createOthers(howmany, where);
		othersToAdd.push(teamnumbers);
		//console.log(othersToAdd);
	}
	
	

	//set localstr 'friends' to array
	//console.log(othersToAdd);
	localStorage.setItem('friends', JSON.stringify(othersToAdd));
}

//called from addFriends()
function getHowMany(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max -min +1) +min);
}

//called from addFriends() to create random profile names
function createOthers(howmany, where) {
    //who can they be?
    var name10 = ['Freddy', 'Sam', 'Griffin', 'Katie', 'Emily',
                    'Mia', 'Harper', 'Charlotte', 'Jacob', 'Ethan'];
    var type10 = ['INFJ', 'ISTP', 'ESTP', 'ISFP', 'ISTJ',
                  'INTP', 'ESFP', 'ISTP', 'ESFJ', 'ENTJ'];

    var othersID = [];
    for (var n=0; n<howmany; n++) {
		if (where == 0) {
			othersID.push(name10[n]);
		} else if (where == 2)
		othersID.push(name10[n+3]);
		else {
			othersID.push(name10[n+6]);
		}

		//add the pIDs
		var pID = Math.floor(Math.random() * 10);
		othersID.push(type10[pID]);
    }
	//console.log(othersID);
	return othersID;
}