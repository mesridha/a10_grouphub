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
        var sign_up = new Object();
        sign_up.name = name;
        sign_up.p_type = "";
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
        var lc = "" + lc1 + lc2 + lc3 + lc4;

        var p_code = JSON.parse(localStorage.getItem('add_index'));
        localStorage.removeItem('add_index');
        p_code.p_type = lc;
        console.log(p_code);
        localStorage.setItem('current', JSON.stringify(p_code));

        //go to personality page
        var newURL = "/user/" +p_code.name +"/sel/pageA";
        window.location.href = newURL;
    });
    
}

