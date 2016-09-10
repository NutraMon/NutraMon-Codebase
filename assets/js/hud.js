

$('.hud-item').on('click', function(){
    var id = $(this).id; 
    triggerMenu(id); 
})

function triggerMenu(hudItem){
    $('.overlay-menu').css('display', 'block');
    $('.game').css('opacity', '0.5');
    $('.game').addClass('blurred');
    expandSearch();
    
    
}



function fillMenu(html){
    $('overlay-menu').html(html); 
}


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


function expandSearch(){
    $('.search').animate({width:'250px'}, 500); 
    $('#search-field').animate({width:'200px'} ,500); 
    $('#search-field').css('border-left-style', 'solid');
    $('#search-field').focus(); 
}

