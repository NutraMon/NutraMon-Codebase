var array = [1,2,3,4,5]; 


var document = {
	ready:function(callback){
		for(var i = 0 ; i < array.length; i++){
			callback(array[i]);  
		} 
	
	}
}

var addTwo = function(element){
	console.log(element + 2); 
}

var multiplyTwo = function(element){
	console.log(element * 2); 
} 


function getFactorial(num){
	for(var i = num -1; i > 0; i--){
		num = num * i; 
	}
	console.log(num); 
}

getFactorial(6)