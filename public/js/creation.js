'use strict';

$(document).ready(function() {
    initializePage();
});

function initializePage() {
    /*
    * START-- creation.handlebars
    */
    $('form#name_invites').submit(function(e) {
        e.preventDefault();
        //begin writing a new user.json data object
        //add into users: name:username:password
        //leave rest empty

        var $form = $(this),
            username = $form.find("input[id='username']").val(),
            password = $form.find("input[id='password']").val();

        //get user's preferred name from url
        var url = window.location.pathname,
            block = url.split("/"),
            name = block[block.length-1];

        console.log(name);

        //create json object to send
        var sign_up = [],
            teams = [],
            p_type = "";

        sign_up.push(name);
        sign_up.push(teams);
        sign_up.push(p_type);
        console.log(sign_up);

        localStorage.setItem('add_index', JSON.stringify(sign_up));
        var checker = localStorage.getItem('add_index');
        console.log(checker);

        //add hide and remove the hide class
        $('#user_info').addClass("hide");
        $('#trait_input').removeClass("hide");
    });

    $('form#lc').submit(function(e) {
        e.preventDefault();

        var $form = $(this),
            lc1 = $form.find("input[id='1_letter']").val(),
            lc2 = $form.find("input[id='2_letter']").val(),
            lc3 = $form.find("input[id='3_letter']").val(),
            lc4 = $form.find("input[id='4_letter']").val();
        //verify inputs
        //I or E
        // if (lc1 != "I" || lc1 != "E" || lc1 != "i" || lc1 != "e") {
        //     console.log("Response must correspond to 'I-i' or 'E-e'");
        //     findOut = false;
        // } else if (lc2 != "N" || lc2 != "n" || lc2 != "S" || lc2 != "s"){
        //     console.log("Response must correspond to 'N-n' or 'S-s'");
        //     findOut = false;
        // } else if (lc3 != "T" || lc3 != "t" || lc3 != "F" || lc3 != "f"){
        //     console.log("Response must correspond to 'T-t' or 'F-f'");
        //     findOut = false;
        // } else if (lc4 != "J" || lc4 != "j" || lc4 != "P" || lc4 != "p"){
        //     console.log("Response must correspond to 'J-j' or 'P-p'");
        //     findOut = false;
        // }

        var lc = "" + lc1 + lc2 + lc3 + lc4;

        var p_code = JSON.parse(localStorage.getItem('add_index'));
        p_code[2] = lc;

        //go to personality page
        var newURL = "/user/" +p_code[0] +"/sel/pageA";
        window.location.href = newURL;

        //create current variable
        localStorage.setItem('add_index', JSON.stringify(p_code));
    });
    
}

