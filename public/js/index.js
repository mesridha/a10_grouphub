'use strict';

//Ready initialize
$(document).ready(function() {
    initializePage();
    addData();
    login();
    signup();
})

/*
 * Function called when document is ready
 *
 */
function initializePage() {
    //listeners

	/* ----- A1 -----
    * open the initial form-inputs for either
    * login: username + password
    * signup: name
    */
    $('#log_in').click(function() {
        $('#hide_me_sign').addClass("hide");
        $('#hide_me_log').removeClass("hide");
    });
    // --- A2 ---
    $('#sign_up').click(function() {
        $('#hide_me_log').addClass("hide");
        $('#hide_me_sign').removeClass("hide");
    });

}

/**
 * Function set up the login listener
 * localstr: 'log_me_in' contains [.username, .password]
 */
function login() {
    //return false if not in local str 'current' _from signup page
    /* ----- B1 -----
    * Stores input form data into localstorage
    */
   $(function(){
      $("form#logBtn").on('click',function() {
        $(this).hide();
        $("#hidden-div").show();
      }); 
   });    
   $('form#logBtn').submit(function(e) {
        e.preventDefault();

        var $form = $(this),
            username = $form.find("input[id='log_username']").val(),
            password = $form.find("input[id='log_password']").val();

        if (username == "") {
            console.log("missing username");
            //listen for 'Enter' and route to '/' if run
            var newURL = "/";
            window.location.href = newURL;
        }

        if (password == "") {
            console.log("missing password");
            //listen for 'Enter' and route to '/' if run
            var newURL = "/";
            window.location.href = newURL;
        }

        //set localstorage var 'log_me_in'
        var logData = new Object();
        logData.username = username;
        logData.password = password;

        //change href based on psuedo profiles
        if (username != "" &&
            password != "") {

            //if username and password aren't empty, create random profile
            var nameI = Math.floor(Math.random()*10);
            var teamI = Math.floor(Math.random()*10);
            var pI = Math.floor(Math.random()*10);
            var load_user = create10(nameI, teamI, pI);

            //set log_me_in localstr
            localStorage.setItem('log_me_in', JSON.stringify(load_user));

            /**
              * test stored data before page load
            */
            var me = localStorage.getItem('log_me_in');
            var lookup = JSON.parse(me);
            console.log(lookup);

            var newURL = '/user/' +load_user[0];
            window.location.href = newURL;
        }

    });

}

//called by login() for random profile creation
function create10(nameI, teamI, pI) {

    /**
     * fake data for username and password inputs == false
     * store in local str to apply to fields
     * 10 names, 10 teams[]
     */
    //console.log(nameI, teamI, pI);
    var name10 = ['Kyle', 'Sandra', 'Leo', 'Josh', 'Baylee',
                  'Spencer', 'Valerie', 'Meghana', 'Chase', 'Lola'];
    var teams10 = ['COGS 120', 'ENG 100D', 'CSE 170', 'COGS 102C', 'COGS 100',
                   'CSE 190', 'COGS 108', 'DSGN 100', 'COGS 187A', 'COGS 187B'];
    var p10 = ['INTJ', 'INTJ', 'ISFP', 'ISFP', 'INTP',
                'ESFP', 'ENTP', 'ESFJ', 'ENTJ', 'ENTJ'];

    var team = [];
    var t1 = teamI,
        t2,
        t3;

    //generate t2 != t1
    do {
        t2 = Math.floor(Math.random()*10);
    } while (t2 == t1);

    //generate t3 != t2 || t1
    do {
        t3 = Math.floor(Math.random()*10);
    } while (t3 == t1 || t3 == t2);

    //set team data but check for repeat groups
    team.push(teams10[t1]);
    team.push(teams10[t2]);
    team.push(teams10[t3]);

    var user = [];
    user.push(name10[nameI]);
    user.push(team);
    user.push(p10[pI]);
    return user;

}

/**
 * Function to set signup listeners to the page
 * localstr: 'sign_me_up' contains [.name]
 *            turns into 'add_index' (see creation.js)
 */
function signup() {
    // --- B2 ---
   $('form#signBtn').submit(function() {

        var $form = $(this),
            name = $form.find("input[id='sign_name']").val();

        //create new user localstorage var 'sign_me_up'
        var newUser = new Object();
        newUser.name = name;
        console.log(name);

        localStorage.setItem('sign_me_up', JSON.stringify(newUser));
        /* test stored data */
        var me = localStorage.getItem('sign_me_up');
        console.log(me);

        /*
        * set 'Submit' value to window.loc.input
        */
        $(document).ready(function() {
            //grab the name value
            var name = localStorage.getItem('sign_me_up');
            var name = JSON.parse(name);

            var newURL = "/creation/"+name.name;
            window.location.href = newURL;
        });
    });
}

/**
 * called to add the personality types to localstr 'intro' and 'extro'
 * needed for help, personality test, and team/edits page
 * 
 * on initializePage
 */
function addData() {
    // --- intro ---
    var intro = 
    {
        "introverted": [
          {
            "type": "ISTJ",
            "attributes": [
              "Responsible",
              "Sincere",
              "Analytical",
              "Reserved",
              "Realistic",
              "Systematic"
            ],
            "roles":[
               "Logistician",
               "Programmer",
               "Project Planner",
               "Data Analyst"
            ]
          },
          {
            "type": "ISFJ",
            "attributes": [
              "Warm",
              "Considerate",
              "Gentle",
              "Responsible",
              "Pragmatic",
              "Thorough"
            ],
            "roles":[
               "Analyst",
               "Liaison",
               "Brainstormer",
               "Group Coordinator"
            ]            
          },
          {
            "type": "INFJ",
            "attributes": [
              "Idealistic",
              "Organized",
              "Insightful",
              "Dependable",
              "Compassionate",
              "Gentle"
            ],
            "roles":[
               "Ethical Specialist",
               "Protest Organizer",
               "Rescue Effort",
               "Social Worker"
            ]             
          },
          {
            "type": "INTJ",
            "attributes": [
              "Innovative",
              "Independent",
              "Strategic",
              "Logical",
              "Reserved",
              "Insightful"
            ],
            "roles":[
               "Architect",
               "Analyst",
               "Strategist",
               "Researcher"
            ]            
          },
          {
            "type": "ISTP",
            "attributes": [
              "Action-oriented",
              "Logical",
              "Analytical",
              "Spontaneous",
              "Reserved",
              "Independent"
            ],
            "roles":[
               "Engineer",
               "Designer",
               "Constructor",
               "Mechanic"
            ]             
          },
          {
            "type": "ISFP",
            "attributes": [
              "Gentle",
              "Sensitive",
              "Nurturing",
              "Helpful",
              "Flexible",
              "Realistic"
            ],
            "roles":[
               "Adventurer",
               "Artist",
               "Philosopher",
               "Celebrity"
            ] 
          },
          {
            "type": "INFP",
            "attributes": [
              "Sensitive",
              "Creative",
              "Idealistic",
              "Perceptive",
              "Caring",
              "Loyal"
            ],
            "roles":[
               "Mediator",
               "Writer",
               "Actor",
               "Social Worker"
            ]
          },
          {
            "type": "INTP",
            "attributes": [
              "Intellectual",
              "Logical",
              "Precise",
              "Reserved",
              "Flexible",
              "Imaginative"
            ],
            "roles":[
               "Inventor",
               "Product Developer",
               "Professor",
               "Researcher"
            ]
          }
        ]
    }

    //add to localstr 'intro'
    localStorage.setItem('intro', JSON.stringify(intro));

    // --- extro ---
    var extro = 
    {
        "extroverted": [
          {
            "type": "ESTP",
            "attributes": [
              "Outgoing",
              "Realistic",
              "Action-oriented",
              "Curious",
              "Versatile",
              "Spontaneous"
            ],
            "roles":[
               "Entrepreneur",
               "Comedian",
               "Inventor",
               "Public Figure"
            ]  
          },
          {
            "type": "ESFP",
            "attributes": [
              "Playful",
              "Enthusiastic",
              "Friendly",
              "Spontaneous",
              "Tactful",
              "Flexible"
            ],
            "roles":[
               "Entertainer",
               "Actor",
               "Dancer",
               "Influencer"
            ] 
          },
          {
            "type": "ENFP",
            "attributes": [
              "Enthusiastic",
              "Creative",
              "Spontaneous",
              "Optimistic",
              "Supportive",
              "Playful"
            ],
            "roles":[
               "Campaigner",
               "Negotiator",
               "Literary Analyst",
               "Psychologist"
            ]              
          },
          {
            "type": "ENTP",
            "attributes": [
              "Inventive",
              "Enthusiastic",
              "Strategic",
              "Enterprising",
              "Inquisitive",
              "Versatile"
            ],
            "roles":[
               "Debater",
               "Lawyer",
               "Politician",
               "Marketer"
            ]
          },
          {
            "type": "ESTJ",
            "attributes": [
              "Efficient",
              "Outgoing",
              "Analytical",
              "Systematic",
              "Dependable",
              "Realistic"
            ],
            "roles":[
               "Executive",
               "Leader",
               "Project Manager",
               "Upholder of Law"
            ]
          },
          {
            "type": "ESFJ",
            "attributes": [
              "Friendly",
              "Outgoing",
              "Reliable",
              "Conscientious",
              "Organized",
              "Practical"
            ],
            "roles":[
               "Trend-setter",
               "Social Outreach",
               "Public Relations",
               "Event Coordinator"
            ]
          },
          {
            "type": "ENFJ",
            "attributes": [
              "Caring",
              "Enthusiastic",
              "Idealistic",
              "Organized",
              "Diplomatic",
              "Responsible"
            ],
            "roles":[
               "Politician",
               "Coach",
               "Teacher",
               "Public Figure"
            ] 
          },
          {
            "type": "ENTJ",
            "attributes": [
              "Strategic",
              "Logical",
              "Efficient",
              "Outgoing",
              "Ambitious",
              "Independent"
            ],
            "roles":[
               "Leader",
               "Businessperson",
               "Chief Officer",
               "Business Executive"
            ] 
          }
        ]
    }

    //add to localstr 'extro'
    localStorage.setItem('extro', JSON.stringify(extro));

    /**
     * test the localstr for 'intro' and 'extro'
    
    var testI = localStorage.getItem('intro');
    var testI = JSON.parse(testI);
    console.log(testI);

    var testE = localStorage.getItem('extro');
    var testE = JSON.parse(testE);
    console.log(testE);
    */
}