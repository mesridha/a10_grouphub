'use strict';

$(document).ready(function() {
    addDisplay();
    initializePage();
});

function initializePage() {
    console.log(JSON.parse(localStorage.getItem('add_index')));
    //create listeners for '.teams' div click
    $('.teams').on('click', function() {
        var t = $(this).text();

        //push localstr 'add_index'[1] (teams array)
        var u = JSON.parse(localStorage.getItem('add_index'));
        console.log(u);
        //catch if u[1] includes
        if (u[1].includes(t)) {
            console.log("already chosen");
        } else {
            u[1].push(t);
            localStorage.setItem('add_index', JSON.stringify(u));
        }

        console.log(JSON.parse(localStorage.getItem('add_index')));
    });
}

/**
 * Browse Teams
 *
 *          add a list of pre-defined teams as buttons
 *          add to user[1] (teams array) when clicked
 *          push to user[1] when on submit
 */
function addDisplay() {
    var team_list = ['COGS 120', 'ENG 100D', 'CSE 170', 'COGS 102C', 'COGS 100',
                   'CSE 190', 'COGS 108', 'DSGN 100', 'COGS 187A', 'COGS 187B'];
    var userTeams = [];
    //render as buttons
    for (var t=0; t<team_list.length; t++) {
                var teamName = team_list[t];
                var htmlTeams = "<div class='teams'>" +teamName +"</div>";
                userTeams.push(htmlTeams);
    }

    console.log(userTeams);
    //append the html display
    $('.browse').append(userTeams);
}

/**
 * replace the 'add_index' with 'new_member' for the
 * user.js to distinguish
 * 
 * should clear the 'add_index' in order to allow new signup
 */
function clearSignUp() {
    var member = JSON.parse(localStorage.getItem('add_index'));
    localStorage.setItem('new_member', JSON.stringify(member));

    //clear
    localStorage.removeItem('add_index');
}