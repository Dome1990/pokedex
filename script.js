let currentPokemon;
let renderedPokemon = [];
let loadedPokemon = 1;
let addingAmount = 50;
/**
 * render the pokemon cards
 */
async function loadPokemon() {
    // document.getElementById('pokedex').innerHTML = '';
    for (i = loadedPokemon; i < loadedPokemon+addingAmount; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        let imgBg = currentPokemon['types'][0]['type']['name'];
        renderedPokemon.push(currentPokemon['name']);

        document.getElementById('pokedex').innerHTML += `
        <div id="${currentPokemon['name']}" onclick="showDetails(${i})" class="pokemon">
        <img class="pokemonImgSmall ${imgBg}" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
        <div class="innerPokemon">
        <div class"pokemonName"><h3>${capitalizeFirstLetter(currentPokemon['name'])}</h3></div>
        <div class="types" id="typ${i}"></div>
        </div>
        </div>
        `;
        for (let j = 0; j < currentPokemon['types'].length; j++) {
            let typ = currentPokemon['types'][j]['type']['name'];
            document.getElementById('typ' + i).innerHTML += `
                <div class="typ ${typ}">${typ}</div>
                `;
        }
    }
    loadedPokemon = loadedPokemon+addingAmount;
}
/**
 * 
 * @param {*} string 
 * @returns string with first letter upper case
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
    document.getElementById('bigPokemonCard').innerHTML += `
    <img class="pokemonImgBig ${imgBg}" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
    <div class="info">
        <div><h1>${capitalizeFirstLetter(currentPokemon['name'])}</h1></div>
        <div class="types" id="typesInfoCard"></div>
        <div class="spaceEven">
            <div>height ${(currentPokemon['height']) / 10} m</div>
            <div>weight ${(currentPokemon['weight']) / 10} kg</div>
        </div>
        <div class="statsParent">
        <table id="stats"></table>
        </div>
    </div>
    `;
    document.getElementById('typesInfoCard').innerHTML = '';
    for (let j = 0; j < currentPokemon['types'].length; j++) {
        let typ = currentPokemon['types'][j]['type']['name'];
        document.getElementById('typesInfoCard').innerHTML += `
            <div class="typ ${typ}">${typ}</div>
            `;
    }


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

function search() {
    let search = document.getElementById('search').value;
    for (let i = 0; i < renderedPokemon.length; i++) {
        if (!renderedPokemon[i].includes(search)) {
            console.log('HI' + i)
            document.getElementById(renderedPokemon[i]).style.display = 'none';
        }
        else {
            document.getElementById(renderedPokemon[i]).style = '';
        }
    }
}