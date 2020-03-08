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
/*    for (var t=0; t<team_list.length; t++) {
                var teamName = team_list[t];
                var htmlTeams = "<div class='teams'>" +teamName +"</div>";
                userTeams.push(htmlTeams);
    }*/

    var htmlTeams1 = "<div class='teams' id='text' onclick='changeColor(id)' style='position:absolute;padding-top:10px;padding-left:10px;width:100px;height:36px;left: 70px;top: 310px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams1 = htmlTeams1 + team_list[0] + "</div>";
    userTeams.push(htmlTeams1);

    var htmlTeams2 = "<div class='teams' id='text1' onclick='changeColor(id)' style='position: absolute;padding-top:10px;padding-left:10px;width:100px;height: 36px;left: 70px;top: 360px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams2 = htmlTeams2 + team_list[1] + "</div>";
    userTeams.push(htmlTeams2);

    var htmlTeams3 = "<div class='teams' id='text2' onclick='changeColor(id)' style='position: absolute;padding-top:10px;padding-left:10px;width:100px;height: 36px;left: 70px;top: 410px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams3 = htmlTeams3 + team_list[2] + "</div>";
    userTeams.push(htmlTeams3);

    var htmlTeams4 = "<div class='teams' id='text3' onclick='changeColor(id)' style='position: absolute;padding-top:10px;padding-left:10px;width:100px;height: 36px;left: 70px;top: 460px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams4 = htmlTeams4 + team_list[3] + "</div>";
    userTeams.push(htmlTeams4);

    var htmlTeams5 = "<div class='teams' id='text4' onclick='changeColor(id)' style='position: absolute;padding-top:10px;padding-left:10px;width:100px;height: 36px;left: 70px;top: 510px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams5 = htmlTeams5 + team_list[4] + "</div>";
    userTeams.push(htmlTeams5);

    var htmlTeams6 = "<div class='teams' id='text5' onclick='changeColor(id)' style='position:absolute;padding-top:10px;padding-left:10px;width:100px;height:36px;left: 230px;top: 310px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams6 = htmlTeams6 + team_list[5] + "</div>";
    userTeams.push(htmlTeams6);

    var htmlTeams7 = "<div class='teams' id='text6' onclick='changeColor(id)' style='position: absolute;padding-top:10px;padding-left:10px;width:100px;height: 36px;left: 230px;top: 360px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams7 = htmlTeams7 + team_list[6] + "</div>";
    userTeams.push(htmlTeams7);

    var htmlTeams8 = "<div class='teams' id='text7' onclick='changeColor(id)' style='position: absolute;padding-top:10px;padding-left:10px;width:100px;height: 36px;left: 230px;top: 410px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams8 = htmlTeams8 + team_list[7] + "</div>";
    userTeams.push(htmlTeams8);

    var htmlTeams9 = "<div class='teams' id='text8' onclick='changeColor(id)' style='position: absolute;padding-top:10px;padding-left:10px;width:100px;height: 36px;left: 230px;top: 460px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams9 = htmlTeams9 + team_list[8] + "</div>";
    userTeams.push(htmlTeams9);

    var htmlTeams10 = "<div class='teams' id='text9' onclick='changeColor(id)' style='position: absolute;padding-top:10px;padding-left:10px;width:100px;height: 36px;left: 230px;top: 510px;background: #D4F5E9;border: 1px solid #0A47A2;box-sizing: border-box; font-weight:normal;'>";
    htmlTeams10 = htmlTeams10 + team_list[9] + "</div>";
    userTeams.push(htmlTeams10);

    console.log(userTeams);
    //append the html display
    $('.browse').append(userTeams);
}  

function changeColor(id) {
    document.getElementById(id).style.background = "#50A8B4";
    document.getElementById(id).style.fontWeight = "bold";    
    return true;
}
/**
 * replace the 'add_index' with 'new_member' for the
 * user.js to distinguish
 * 
 * should clear the 'add_index' in order to allow new signup
 */

//document.getElementById('change').onclick = changeColor; 

function clearSignUp() {
    var member = JSON.parse(localStorage.getItem('add_index'));
    localStorage.setItem('new_member', JSON.stringify(member));

    //clear
    localStorage.removeItem('add_index');
}