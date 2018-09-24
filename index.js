const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';
var pokemon;
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
jsonfile.readFile(file, function (err,obj){
	if(err){console.error(err)}
		//console.dir(obj);
		pokemon = obj["pokemon"];
		console.log(pokemon[0].name);
})


// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('*', (request, response) => {
  // send response with some data (a string)
	let exist = false;

	for(var i=0;i<pokemon.length;i++){
	  	if("/"+pokemon[i].name.toLowerCase() == request.path){
	  		response.status(200).send("This is "+pokemon[i].name+ ", he is "+pokemon[i].weight+" in weight!");
	  		exist = true;
	  	}
  	}
	if(exist==false&&request.path!="/"){
	  	var name = request.path.split("/")[1];
	  	response.status(404).send("Could not find "+name+". Is that a new pokemon? Gotta catch em' all!");
	}
	if(request.path=="/"){
	  	response.status(200).send("Welcome to Pokedex!");
	}
 })

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
