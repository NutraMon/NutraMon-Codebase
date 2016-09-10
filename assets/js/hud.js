var currentMenu; 

$('.hud-item').on('click', function(){
    var id = $(this).attr('id'); 
    triggerOverlayMenu();
    setMenu(id);

})

function triggerOverlayMenu(){
    $('.overlay-menu').empty(); 
    $('.overlay-menu').css('display', 'block');
    $('.game').css('opacity', '0.8');
    $('.game').addClass('blurred');
    
}

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
            
    }
}

function loadFoodMenu(){
    
    var search = '<div class="food-menu"><div class="col-xs-12"><h1><span><i class ="fa fa-cutlery fa-sm"></i></span> Enter your <span>meal</span> items!</h1><div class ="search"><label id="search-icon" for="search"><img src="http://www.freeiconspng.com/uploads/search-icon-png-2.png" alt="search"></label><input type="text" name = "search" id = "search-field" size = 18 autocomplete="on" ></div></div>'; 
    
    var results = '<div class="col-xs-12"><div class ="results"><h3>Bagel with cream cheese...</h3><h3>Bagel-blueberry..</h3><h3>Bagel-plain...</h3></div></div>'; 
                    
    //loads the search              
    $('.overlay-menu').append(search);
    expandSearch();
    
    //load results 
    setTimeout(function(){
        $('.overlay-menu').append(results);
    }, 2000);  
   
    console.log('food menu loaded'); 
    
    $('#search-field').blur(function(){
    var currentVal = $('#search-field').val(); 
    if(currentVal === ''){
        $('.search').animate({width:'50px'}, 500); 
        $('#search-field').animate({width:'0px'} ,500); 
        $('#search-field').css('border-left-style', 'hidden');
        $('.overlay-menu').css('display', 'none'); 
        $('.game').css('opacity', '1');
        $('.game').removeClass('blurred');
    }
})
}

function loadStatsMenu(){
    var maxEnergy =0, strength = 0, defense = 0, speed = 0, level=1; 
    $('.overlay-menu').append('<div class= "stats">'); 
    
    
    
   var statsH1= $('.stats').append('<h1><i style="color:darkred;" class="fa fa-heartbeat fa-sm"></i> Nutristats!</h1>')
   
   var info = $('<div>');
    info.append('<h2>Max Energy: '+maxEnergy+ '</h2>'); 
    info.append('<h2>Strength: '+strength+ '</h2>'); 
    info.append('<h2>Defense: '+defense+ '</h2>'); 
    info.append('<h2>Speed: '+speed+ '</h2>'); 
    info.append('<h2>Level: '+level+ '</h2>'); 
    
    
   var back = $('<h3><div class="back"><i class="fa fa-undo fa-sm"></i> Back</div></h3>');
    
    back.on('click',function(){
        $('.overlay-menu').hide();
        $('.game').css('opacity', '1');
        $('.game').removeClass('blurred');
    })
    
    console.log('stats menu loaded'); 
    
    
    $('.overlay-menu').append(statsH1);
    $('.overlay-menu').append(info); 
    $('.overlay-menu').append(back); 
    
}

function loadSettingsMenu(){
    console.log('settings menu loaded'); 
}


function loadShareMenu(){
    console.log('share menu loaded'); 
}

function signOut(){
    console.log('signed out'); 
}



function expandSearch(){
    $('.search').animate({width:'250px'}, 500); 
    $('#search-field').animate({width:'200px'} ,500); 
    $('#search-field').css('border-left-style', 'solid');
    $('#search-field').focus(); 
}



