//globals 

var menu = []; 

//audio assests 
var menuSound = new Audio('assets/audio/menuSound.mp3'); 
var confirmSound= new Audio('assets/audio/confirmSound.mp3'); 

//plays sound 

function playSound(sound){
    sound.volume = .5;  
    sound.play(); 
}

//on click handler for hud items 
$('.hud-item').on('click', function(){
    var id = $(this).attr('id'); 
    triggerOverlayMenu();
    
    //call to set menu 
    setMenu(id);

})

//displays the overlay menu 
function triggerOverlayMenu(){
    playSound(menuSound); 
    $('.overlay-menu').empty();
    $('.overlay-menu').fadeTo('fast', 1);
    $('.overlay-menu').css('max-height', '600px'); 
    $('.overlay-menu').css('display', 'block');
    $('.game').css('opacity', '0.9');
    $('.game').addClass('blurred');
    
}

//runs the function to fill the overlay menu with the appropriate content
function setMenu(menu){ 
    switch(menu){
        case 'food-input-icon':
            loadFoodMenu();
            break; 
            
        case 'stats-icon':
            loadStatsMenu(); 
            break; 
            
        case 'settings-icon':
            loadSettingsMenu(); 
            break;
            
        case 'share-icon':
            loadShareMenu(); 
            break;
            
        case 'sign-out-icon':
            signOut(); 
            break;
        case 'nav-icon':
            loadNavMenu(); 
            
    }
}

 //creates a back button and onclick handler
function createBackBtn(){
    
   setTimeout(function(){
         var back = $('<h3><div class="back"><i class="fa fa-undo fa-sm"></i> Back</div></h3>');
         back.on('click',function(){
             playSound(confirmSound); 
            $('.overlay-menu').empty(); 
            $('.game').css('opacity', '1');
            $('.overlay-menu').css('max-height', '0px');
            $('.game').removeClass('blurred');
            $('.search').animate({width:'50px'}, 500); 
            $('#search-field').animate({width:'0px'} ,500); 
            $('#search-field').css('border-left-style', 'hidden');
             menu = []; 
        })
         
         //writes the back button to the page
         $('.overlay-menu').append(back);
   }, 400)
}

//creates a done button and on click handler
function createDoneBtn(){
    
    setTimeout(function(){
           var done = $('<h3><div class="done"><i class="fa fa-check fa-sm"></i> Done</div></h3>');
         done.on('click',function(){
             playSound(confirmSound); 
            $('.overlay-menu').empty(); 
            $('.overlay-menu').css('max-height', '0px');
            $('.game').css('opacity', '1');
            $('.game').removeClass('blurred');
            $('.search').animate({width:'50px'}, 500); 
            $('#search-field').animate({width:'0px'} ,500); 
            $('#search-field').css('border-left-style', 'hidden');
            
        })
    
    $('.overlay-menu').append(done); 
    }, 400)
}


//fills the overlay menu with the food menu screen. This is the core method of input for the application. 

function loadFoodMenu(){
    
    //html for the search input
    var search = '<div class="food-menu"><div class="col-xs-12"><h1><span><i class ="fa fa-cutlery fa-sm"></i></span> Enter your <span>meal</span> items!</h1><div class ="search"><label id="search-icon" for="search"><img src="http://www.freeiconspng.com/uploads/search-icon-png-2.png" alt="search"></label><input type="text" name = "search" id = "search-field" size = 18 autocomplete="off" ></div></div>'; 
    
    //sets the html for the results pane
    var results = '<div class="col-xs-12"><div class ="results"></div></div>'; 
    
    //html for the added notification
    var added = $('<div class="added"><h3>Added to Menu!</h3></div>'); 
                    
    //loads the search              
    $('.overlay-menu').append(search);
    expandSearch();
    
    //set results container
    $('.overlay-menu').append(results);
    
    //for added notification 
    $('.overlay-menu').append(added); 
    
    //set back button
    createBackBtn();   
         
    //set the done button 
    createDoneBtn();   
         

    /*on keyup event trigger for live search type of functionality 
    initialize timer and variable for the interval*/
    var typingTimer;                
    var doneTypingInterval = 1000; 
    var $input = $('#search-field');

    //on keyup, start the countdown
    $input.on('keyup', function () {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    //on keydown, clear the countdown 
    $input.on('keydown', function () {
      clearTimeout(typingTimer);
    });

    
}

//animates the search bar for the food menu
function expandSearch(){
    $('.search').animate({width:'250px'}, 500); 
    $('#search-field').animate({width:'200px'} ,500); 
    $('#search-field').css('border-left-style', 'solid');
    $('#search-field').focus(); 
}

//when the user is done typing this function triggers getfood
function doneTyping(){
    $('.results').empty(); 
    
    //call to the getFood function which launches the ajax request to the api 
    getFood(); 
}

//runs the ajax query to the api and returns an array foods with the name and id# of the response objects
function getFood(){
    
        //how many response objects to return
        var limit = 100; 
        
        //input from the search filed 
        var userFood = $('#search-field').val().trim();
        
        //url to run in the ajax call
        var queryURL = "http://api.nal.usda.gov/ndb/search/?format=json&q="+userFood+"&sort=n&max="+limit+"&offset=0&api_key=HZETQl5FX9HBdYG4NyJzVta13UMr7ln8UtkIZmPJ";
    
        //array with the food items to be set in the results pane
        var foods=[];
        
        //checks to see if there is data in the search field in order to process a new request 
    
        if(userFood === ''){
            return false;
        }
        else{
            apiCall(); 
        }
       
        //ajax get request to the USDA api 
    function apiCall(){
            $.ajax({url: queryURL, method: 'GET'}).done(function getFood (response){

            //code loops through response array
            for(var i=0; i<response.list.item.length; i++){

                //new object with the foods name and database number
                var userFoodInfo = {
                    name:response.list.item[i].name,

                    id:response.list.item[i].ndbno
                }
                //pushes newly created obj to the food array 
                foods.push(userFoodInfo);

                //displays the food item to the screen 
                $('.results').append('<div><h3 id='+foods[i].id+' class=\'result-item\'>'+foods[i].name+'</h3></div>'); 

            }

            //sets the results on click handler 
            $('.result-item').on('click', function(){
                var self = $(this); 
                
                //sets resultId to the elements id
                var resultId = self.attr('id');
                //gets the text of the element for use in the getNutrients call
                var name = self.text(); 
                
                //call to get the nutrients for the food 
                getNutrients(resultId ,name);
                
                //lets user know they've slected an item 
                playSound(confirmSound);
                self.css('border-width', '3px'); 
                self.css('color', 'gold'); 
                self.css('border-color', 'darkgreen');
                $('.added').fadeTo('fast', 1); 
                $('.added').animate({fontSize:"50px"}, 500); 
                
                setTimeout(function(){
                    self.hide();
                    $('.added').fadeTo('fast', 0); 
                    $('.added').animate({fontSize:"0px"}); 
                },550); 
            })

        });
    }
    
    // In case of an invalid search 
      setTimeout(function(){
            if(foods.length < 1){
            $('.results').append('<div><h3>No results found..</h3></div>'); 
        }
      },1000)
        
}


//queries the USDA nutrients database to get the nutritional info of the selected food
function getNutrients(foodId, food){
    
     
    var queryURL2 = "http://api.nal.usda.gov/ndb/reports/?ndbno=" +foodId+ "&type=f&format=json&api_key=HZETQl5FX9HBdYG4NyJzVta13UMr7ln8UtkIZmPJ";
    

    $.ajax({url: queryURL2, method: 'GET'}).done(function(response){
            //initialize nutrients variable
            var nutrients; 
        
            //sets nutrients to the nutrients array 
            nutrients = response.report.food.nutrients; 
        
            //set up nutrient variables to push to new object with information
            var calories = nutrients[1].value.toString() + ' ' + nutrients[1].unit; 
            var protein = nutrients[3].value.toString() + ' ' + nutrients[3].unit;
            var fat = nutrients[4].value.toString() + ' ' + nutrients[4].unit;
            var carbs = nutrients[6].value.toString() + ' ' + nutrients[6].unit;
            var fiber = nutrients[7].value.toString() + ' ' + nutrients[7].unit;

            var menuItem = {
                name:food,
                calories:calories,
                fat:fat, 
                carbs:carbs,
                fiber:fiber
            }

            menu.push(menuItem); 
            console.log(menu);   

    });
    
   
}

//loads the player stats menu with database info
function loadStatsMenu(){
    
   //sets a stats container div for the information
    $('.overlay-menu').append('<div class= "stats">'); 
    
    //html for the h1 header 
   var statsH1= $('.stats').append('<h1><i style="color:darkred;" class="fa fa-heartbeat fa-sm"></i> Nutristats!</h1>')
   
   //sets a new div 
    var info = $('<div class=\'info\'>');
    
    //appends the players statistics to the new div
    setTimeout(function(){
        info.append('<h2><i class="fa fa-bolt fa-sm"></i> Energy: '+energy+ '</h2>'); 
        info.append('<h2><i class="fa fa-hand-rock-o fa-sm"></i> Strength: '+strength+ '</h2>'); 
        info.append('<h2><i class="fa fa-mail-reply fa-sm"></i> Defense: '+defense+ '</h2>'); 
        info.append('<h2><i class="fa fa-leaf fa-sm"></i> Speed: '+speed+ '</h2>'); 
        info.append('<h2><i class="fa fa-level-up fa-sm"></i> Level: '+level+ '</h2>');
    },200) 

    
    
    //writes the stats info to the page and sets the back button
    $('.overlay-menu').append(statsH1);
    $('.overlay-menu').append(info); 
   
    //set back button 
    createBackBtn(); 
    
}

//loads the settings menu for nutrimon customization
function loadSettingsMenu(){
    $('.overlay-menu').append('<h1>Settings</h1>');
    
     //set back button
    createBackBtn(); 
    
    
}

//loads the share menu
function loadShareMenu(){
    $('.overlay-menu').append('<h1>Share Options</h1>');
    
    //set back button
    createBackBtn(); 
}

//signs out the user
function signOut(){
    $('.overlay-menu').append('<h1>Sign Out?</h1>');
    
    var info = $('<div class="info">')
    info.append('<div id="Yes""><h2>Yes</h2></div><div id="No"><h2>No</h2></div>'); 
    
    $('.overlay-menu').append(info); 
    
    $('#Yes').on('click',function(){
        playSound(confirmSound); 
        console.log('signed out'); 
    })
    
    $('#No').on('click',function(){
        playSound(confirmSound);
        $('.overlay-menu').empty(); 
        $('.overlay-menu').css('max-height', '0px');
        $('.game').removeClass('blurred');
        
    })
    
      
}

//loads the nav menu 

function loadNavMenu(){
    $('.overlay-menu').append('<h1>Navigation</h1>');
    
    //set back button
    createBackBtn();  
}









