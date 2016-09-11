
//
$("#addFoodBtn").on("click", function(event){
    event.preventDefault();
    
        var userFood = $('#foodNameInput').val().trim();
        console.log(userFood);
    
        var queryURL = "http://api.nal.usda.gov/ndb/search/?format=json&q="+userFood+"&sort=n&max=1&offset=0&api_key=HZETQl5FX9HBdYG4NyJzVta13UMr7ln8UtkIZmPJ";
    
    
    


    $.ajax({url: queryURL, method: 'GET'}).done(function getFood (response){

        var foods=[];
        //code loops through response array
        for(var i=0; i<response.list.item.length; i++){


            var userFoodInfo = {
                name:response.list.item[i].name,

                id:response.list.item[i].ndbno
            }

            foods.push(userFoodInfo);

        }
        console.log(foods);
       getNutrients(foods[0].id);


              

    });
    
});

function getNutrients(userFoodInfo){
    
 var queryURL2 = "http://api.nal.usda.gov/ndb/reports/?ndbno=" +userFoodInfo+ "&type=f&format=json&api_key=HZETQl5FX9HBdYG4NyJzVta13UMr7ln8UtkIZmPJ";
    

    $.ajax({url: queryURL2, method: 'GET'}).done(function(response2){
            console.log(response2.report.food.nutrients);


              });   
}