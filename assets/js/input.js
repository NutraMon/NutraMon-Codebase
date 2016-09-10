$('#search-field').blur(function(){
    var currentVal = $('#search-field').val(); 
    if(currentVal === ''){
       $('.search').animate({width:'50px'}, 500); 
        $('#search-field').animate({width:'0px'} ,500); 
        $('#search-field').css('border-left-style', 'hidden');
    }
})


$('.search').on('click',function(){
    $('.search').animate({width:'250px'}, 500); 
    $('#search-field').animate({width:'200px'} ,500); 
    $('#search-field').css('border-left-style', 'solid');
    $('#search-field').focus(); 
   
})
