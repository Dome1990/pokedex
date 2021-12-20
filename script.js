let currentPokemon;

/**
 * https://www.pokemon.com/de/pokedex/ a pokedex
 * https://pokeapi.co/ the api website
 * https://pokeapi.co/api/v2/gender/{id or name} for the gender
 */

async function loadPokemon() {
    // let speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/2/`;
    // let resp = await fetch(speciesUrl);
    // let species = await resp.json();
    // console.log(species);

    // for (let i = 1; i < 20; i++){ // iterate thru the pokemon id´s
    // let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    // let response = await fetch(url);
    // currentPokemon = await response.json();
    // console.log(currentPokemon); //the json of the pokemone
    // console.log('name of pokemon ' + currentPokemon['name']); //name of the pokemon in english
    // console.log('id of pokemon ' + currentPokemon['id']); //the right id in the pokedex
    // console.log('artstyle ' + currentPokemon['sprites']['other']['official-artwork']['front_default']); //nice art style
    // for (let j = 0; j < currentPokemon['types'].length; j++){
    // console.log('type ' + currentPokemon['types'][j]['type']['name']);

    document.getElementById('pokedex').innerHTML = '';
    for (i = 1; i < 300; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        let imgBg = currentPokemon['types'][0]['type']['name'];

        document.getElementById('pokedex').innerHTML += `
        <div class="pokemon">
        <img class="pokemonImgSmall ${imgBg}" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        <div class"pokemonName"><h3>${capitalizeFirstLetter(currentPokemon['name'])}</h3></div>
        <div class="types" id="typ${i}"></div>
        </div>
        `;
            for (let j = 0; j < currentPokemon['types'].length; j++){
                let typ = currentPokemon['types'][j]['type']['name'];
                document.getElementById('typ'+i).innerHTML +=`
                <div class="typ ${typ}">${typ}</div>
                `;}
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }