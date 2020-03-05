'use strict';

//Ready initialize
$(document).ready(function() {
	initializePage();
})

/*
 * Function called when document is ready
 *
 */
function initializePage() {
    //listeners

    /*
    * ----- 1/4 Letter Listener -----
    */
   $('form#name_invites').submit(function(e) {
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

        //call addtrait and roles
        p_code.roles = upRolesWithCode();
        p_code.traits = upTraitsWithCode();

        localStorage.setItem('add_index', JSON.stringify(p_code));
        /* test storage
        var checker = localStorage.getItem('add_index');
        console.log(checker);
        */

		/*
        * transfer 'add_index' to 'new_user'
        */

        //grab the name value
        var name = localStorage.getItem('add_index');
        var name = JSON.parse(name);

        var newURL = "/user/"+name.name;
        window.location.href = newURL;

        //clear 'add_index' for next user
        var full_profile = name;
        console.log(full_profile);
        localStorage.setItem('new_user', full_profile);
        localStorage.removeItem('add_index');

   });
}
