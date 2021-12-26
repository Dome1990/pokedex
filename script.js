let currentPokemon;
let renderedPokemon = [];   //storage array for search()
let loadedPokemon = 1;
let addingAmount = 50;      //the amount of pokemon that will be loadet by loadPokemon()

/**
 * render the pokemon cards by using the pokeapi.co api
 */
async function loadPokemon() {
    for (i = loadedPokemon; i < loadedPokemon + addingAmount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        let imgBg = currentPokemon['types'][0]['type']['name'];
        renderedPokemon.push(currentPokemon['name']);
        renderCard(currentPokemon, imgBg);
    };
    loadedPokemon = loadedPokemon + addingAmount;
}

/**
 * will load the pokemon cards to the pokedex
 * @param {json} currentPokemon 
 * @param {img} imgBg 
 */
function renderCard(currentPokemon, imgBg) {
    document.getElementById('pokedex').innerHTML += `
    <div id="${currentPokemon['name']}" onclick="showDetails(${i})" class="pokemon">
    <img class="pokemonImgSmall ${imgBg}" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
    <div class="innerPokemon">
    <div class"pokemonName"><h3>${capitalizeFirstLetter(currentPokemon['name'])}</h3></div>
    <div class="types" id="typ${i}"></div>
    </div>
    </div>
    `;
    renderNameType(currentPokemon);
}

/**
 * adding the name and type of the pokemon to the card 
 * @param {json} currentPokemon 
 */
function renderNameType(currentPokemon) {
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let typ = currentPokemon['types'][j]['type']['name'];
        document.getElementById('typ' + i).innerHTML += `
            <div class="typ ${typ}">${typ}</div>
            `;
    };
}

/**
 * @param {*} id of the pokemon the user clicked on
 * will show a big card of the pokemon the user clicked on
 * with details like:
 * height, weight and the base stats
 */
async function showDetails(id) {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let response = await fetch(url);
    currentPokemon = await response.json();
    let imgBg = currentPokemon['types'][0]['type']['name'];
    document.getElementById('bigPokemonCard').innerHTML = '';
    document.body.style.overflow = 'hidden';
    document.getElementById('bigPokemonBackground').classList.remove('d-none');
    loadBigCard(currentPokemon, imgBg);
}

/**
 * render a big detailed card of the pokemon
 * @param {json} currentPokemon 
 * @param {img} imgBg 
 */
function loadBigCard(currentPokemon, imgBg) {
    document.getElementById('bigPokemonCard').innerHTML += `
    <img class="pokemonImgBig ${imgBg}" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
    <div class="info">
        <div class="name"><h1>${capitalizeFirstLetter(currentPokemon['name'])}</h1></div>
        <div class="types" id="typesInfoCard"></div>
        <div class="spaceEven">
            <div class="heightWeight"><h4>Height ${(currentPokemon['height']) / 10} m</h4></div>
            <div class="heightWeight"><h4>Weight ${(currentPokemon['weight']) / 10} kg</h4></div>
        </div>
        <div class="statsParent">
        <table id="stats"></table>
        </div>
    </div>`;
    loadTypes();
    loadStats();
}

/**
 * load the types of the selected pokemon in the detailed pokemon card
 */
function loadTypes() {
    document.getElementById('typesInfoCard').innerHTML = '';
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let typ = currentPokemon['types'][j]['type']['name'];
        document.getElementById('typesInfoCard').innerHTML += `
        <div class="typ ${typ}">${typ}</div>
        `;
    }
}

/**
 * render the basic stats for the detailed pokemon card
 */
function loadStats() {
    let statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = '';
    for (k = 0; k < currentPokemon["stats"].length; k++) {
        let statName = currentPokemon["stats"][k]["stat"]["name"];
        let statValue = currentPokemon["stats"][k]["base_stat"];
        statsDiv.innerHTML += `
        <tr>
        <td style="width: 36%">
        ${statName}
        </td>
        <td><div class="statusbar" style="width:calc(${statValue}%*0.5)">${statValue}</div></td>
        </tr>
        `;
    }
}

/**
 * will hide the detailed pokemon info card
 */
function hideDetails() {
    document.body.style = '';
    document.getElementById('bigPokemonBackground').classList.add('d-none');
}

/**
 * changes the first character of a string to upper case
 * @param {*} string 
 * @returns string with first letter upper case
 */
 function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * iterate thru the renderedPokemon array and check if the searched pokemon
 * is already loadet and shows it and hide the other
 */
function search() {
    let search = document.getElementById('search').value;
    for (let i = 0; i < renderedPokemon.length; i++) {
        if (isNotMatch(renderedPokemon, i, search)) {
            document.getElementById(renderedPokemon[i]).style.display = 'none';
        }
        else {
            document.getElementById(renderedPokemon[i]).style = '';
        };
    };
}

/**
 * check if the searched name is the pokemon wich is rendered and listed in the
 * renderedPokemon array at the position i
 * @param {array} renderedPokemon 
 * @param {number} i 
 * @param {string} search 
 * @returns 
 */
function isNotMatch(renderedPokemon, i, search){
    return !renderedPokemon[i].includes(search.toLowerCase());
}