
// RENDER FUNCTION's
function renderPokemonHtml(newPokemon, pokemonCap) {
    document.getElementById('allPokemons').innerHTML += `
    <div id="pokemon${newPokemon['id']}" class="pokemon" onclick="openStats(${newPokemon['id']})">
            <span>${pokemonCap}</span>
        <div id="types${newPokemon['id']}">
    </div>
        <img class="pokeball-img" src="img/pokeball.png">
        <img class="pokemon-img" src="${newPokemon['sprites']['other']['official-artwork']['front_default']}">
    </div>
    `;
}

//Pokemon types on the main page
function renderTypeHtml(newPokemon) {
    for (let i = 0; i < newPokemon['types'].length; i++) {
        const type = newPokemon['types'][i];
        document.getElementById('types' + newPokemon['id']).innerHTML += `
    <div>
         <div class="type-container">${type['type']['name']}</div>
    </div>
    `;
    }
}

//Base experience 
function loadBaseExperience(pokemon) {
    document.getElementById('base-experience').innerHTML = `${pokemon['base_experience']}`;
}

//Stats height of Pokemon
function loadHeight(pokemon) {
    let heightt = pokemon['height'];                                            
    let height = heightt / 10;                                                                  
    document.getElementById('height').innerHTML = height;
}

//Weight of pokemon
function loadWeight(pokemon) {
    let weightt = pokemon['weight'];
    let weight = weightt / 10;                                                                  
    document.getElementById('weight').innerHTML = weight;
}

//Abilities of Pokemon
function loadAbilities(pokemon) {
    document.getElementById('abilities').innerHTML = '';                                        
    for (let i = 0; i < pokemon['abilities'].length; i++) {
        let ability = pokemon['abilities'][i];
        document.getElementById('abilities').innerHTML += `
        <span>${ability['ability']['name']}</span>
        `;
    }
}

//Moves of Pokemon
function renderMoves(move) {
    document.getElementById('moves').innerHTML += `
    <div class="move">${move}</div>
    `;
}

//Pokemon type details
function renderStatsTypes(pokemon) {
    document.getElementById('stat-type-container').innerHTML = '';
    for (let i = 0; i < pokemon['types'].length; i++) {
        const type = pokemon['types'][i];
        document.getElementById('stat-type-container').innerHTML += `
    <div><div class="type-container">${type['type']['name']}</div></div>
    `;
    }
}


