let currentPokemon;

/**
 * https://www.pokemon.com/de/pokedex/ a pokedex
 * https://pokeapi.co/ the api website
 */

async function loadPokemon(){
    let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/2/`;
    let resp = await fetch(speciesUrl);
    let species = await resp.json();
    console.log(species);

    for (let i = 1; i < 20; i++){ // iterate thru the pokemon id´s
    let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log(currentPokemon); //the json of the pokemone
    console.log(currentPokemon['name']); //name of the pokemon in english
    console.log(currentPokemon['id']); //the right id in the pokedex
    console.log(currentPokemon['sprites']['other']['official-artwork']['front_default']); //nice art style
    for (let j = 0; j < currentPokemon['types'].length; j++){
    console.log(currentPokemon['types'][j]['type']['name']);
}}
}