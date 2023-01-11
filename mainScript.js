
//Global variable
const API = `https://pokeapi.co/api/v2/pokemon/`;
let currentPokemon = [];
let loadedPokemon = [];
let next = [];
let currentID;
let isSearchResult = false;

function loadAllPokemons() {
    loadPokemon();
}

//Load next 20 Pokemon's automatically 
window.addEventListener('scroll', function () {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        if (!isSearchResult) {
            loadPokemon();
        }
    }
})

//Load next 20 Pokemon's
async function loadPokemon() {
    await loadNewPokemonBaseData(); 
    await loadNewPokemonData();  
} 

//Load the next 20 Pokemon's
async function loadNewPokemonBaseData() {
    let url = API + next;
    let response = await fetch(url);
    let newPokemon = await response.json();
    defineNextPokemon(newPokemon);                  
    let pokemon = newPokemon['results'];
    addToCurrentPokemon(pokemon);
}     

//The next 20 Pokemon's pushed in the Array
function defineNextPokemon(newPokemon) {
    let newNext = newPokemon['next'].split('?')[1];    
    next = [];                                          
    next.push('?' + newNext);                           
}

//Added loaded Pokemon's in Array
function addToCurrentPokemon(pokemon) {
    currentPokemon = [];                                     
    for (let i = 0; i < pokemon.length; i++) {
        currentPokemon.push(pokemon[i])
    };
}

//Load all datas from the Pokemon
async function loadNewPokemonData() {
    for (let i = 0; i < currentPokemon.length; i++) {            
        let currentSinglePokemon = currentPokemon[i];
        let url = currentSinglePokemon['url'];                        
        let response = await fetch(url);
        let newPokemon = await response.json();                 

        renderPokemon(newPokemon);                              
        checkTypeForColor(newPokemon, newPokemon['id']);        
        addToLoadedPokemon(newPokemon);                         
        
    }
}

//Add Pokemon to loadedPokemon
function addToLoadedPokemon(newPokemon) {
    loadedPokemon.push(newPokemon);
}

//Load the current img of the Pokemon
function loadPokemonImg(pokemon) {
    document.getElementById('stat-img').src = `${pokemon['sprites']['other']['official-artwork']['front_default']}`;
}

//First letter uppercase
function renderPokemon(newPokemon) {
    let firstLetter = newPokemon['name'].charAt(0);
    let firstLetterCap = firstLetter.toUpperCase();
    let remainingLetters = newPokemon['name'].slice(1);
    let pokemonCapitalized = firstLetterCap + remainingLetters;
    renderPokemonHtml(newPokemon, pokemonCapitalized);
    renderTypeHtml(newPokemon);
}

//Load the searched Pokemon/'s
function loadSearchedPokemon(search) {
    for (let i = 0; i < loadedPokemon.length; i++) {                        
        let pokemon = loadedPokemon[i];
        if (pokemon['species']['name'].toLowerCase().includes(search)) {    
            renderPokemon(pokemon, i);                                      
            checkTypeForColor(pokemon, pokemon['id']);
        }
    }
}

//Select the color by type
function checkTypeForColor(newPokemon, id) {
    let type = newPokemon['types'][0]['type']['name']; //Define type
    document.getElementById(`pokemon${id}`).classList.add('bg-' + type); //Select right classlist
}

//Load name with uppercase
function loadNameCapitalized(pokemon) {
    let firstLetter = pokemon['name'].charAt(0);
    let firstLetterCap = firstLetter.toUpperCase();
    let remainingLetters = pokemon['name'].slice(1);
    let pokemonCapitalized = firstLetterCap + remainingLetters;
    document.getElementById('species').innerHTML = pokemonCapitalized;
}

//Show arrow
function showArrows(id) {
    if (id > 1) {                                                                     
        document.getElementById('slide-left').classList.remove('d-none');
    }                                                                                
    document.getElementById('slide-right').classList.remove('d-none');
}

//Hide arrow
function hideArrows() {
    document.getElementById('slide-left').classList.add('d-none');
    document.getElementById('slide-right').classList.add('d-none');
}

//Open stats 
function openStats(id) {
    currentId = id;
    let pokemon = loadedPokemon[id - 1];
    let name = pokemon['types'][0]['type']['name'];        
    loadStatsContainer(name);
    loadPokemonImg(pokemon);
    showArrows(id);
    loadNameCapitalized(pokemon);
    addPokemonNumber(id);
    renderStatsTypes(pokemon);
    loadAbout(pokemon);
    loadBaseStats(pokemon, name);
    loadMoves(pokemon);
}

//Load container of the stats from the Pokemon's
function loadStatsContainer(name) {
    document.getElementById('pokeStats-container').className = '';                                 
    document.getElementById('pokeStats-container').classList.add('pokeStats-container');          
    document.getElementById('pokeStats-container').classList.add('show-stats');                    

    let type = name;
    document.getElementById('pokeStats-container').classList.add('bg-' + type);                    

    document.getElementById('pokeStats-bg').classList.add('show-stats-bg');                        

    document.getElementById('body').classList.add('overflow-hidden');                               
}

//Add number of the Pokemon
function addPokemonNumber(id) {
    document.getElementById('id-container').innerHTML = '';
    document.getElementById('id-container').innerHTML = id;
}

//Open about
function openAbout() {
    document.getElementById('about-selector').classList.add('selected-info');
    document.getElementById('base-stats-selector').classList.remove('selected-info');
    document.getElementById('moves-selector').classList.remove('selected-info');

    document.getElementById('about').classList.remove('d-none');
    document.getElementById('base-stats').classList.add('d-none');
    document.getElementById('moves').classList.add('d-none');
}

//Load all stats
function loadAbout(pokemon) {
    loadBaseExperience(pokemon);                
    loadHeight(pokemon);                                    
    loadWeight(pokemon);                        
    loadAbilities(pokemon);                     
}

//Open base stats
function openBaseStats() {
    document.getElementById('about-selector').classList.remove('selected-info');
    document.getElementById('base-stats-selector').classList.add('selected-info');
    document.getElementById('moves-selector').classList.remove('selected-info');

    document.getElementById('about').classList.add('d-none');
    document.getElementById('base-stats').classList.remove('d-none');
    document.getElementById('moves').classList.add('d-none');
}

//Load base stats
function loadBaseStats(pokemon, name) {
    for (let i = 0; i < pokemon['stats'].length; i++) {                                 

        let stat = pokemon['stats'][i]['base_stat'];                                         
        document.getElementById('base-stat' + i).style = `width: ${stat}px;`
        document.getElementById('stat-number' + i).innerHTML = `${stat}`;

        document.getElementById('base-stat' + i).className = '';                        
        document.getElementById('base-stat' + i).classList.add('actual-progress');

        let type = name;
        //bar will be colored the same like type
        document.getElementById('base-stat' + i).classList.add('bg-' + type);          
    }
}

//Open moves
function openMoves() {
    document.getElementById('about-selector').classList.remove('selected-info');
    document.getElementById('base-stats-selector').classList.remove('selected-info');
    document.getElementById('moves-selector').classList.add('selected-info');

    document.getElementById('about').classList.add('d-none');
    document.getElementById('base-stats').classList.add('d-none');
    document.getElementById('moves').classList.remove('d-none');
}

//Load moves on stats
function loadMoves(pokemon) {
    document.getElementById('moves').innerHTML = '';
    for (let i = 1; i < pokemon['moves'].length; i++) {
        let move = pokemon['moves'][i]['move']['name'];
        renderMoves(move);
    }
}

//Close the stats
function closeStats() {
    document.getElementById('pokeStats-container').classList.remove('show-stats');
    document.getElementById('pokeStats-bg').classList.remove('show-stats-bg');
    document.getElementById('body').classList.remove('overflow-hidden');
    hideArrows();
}

//Next Pokemon
async function slideRight() {
    if (currentId == loadedPokemon.length) {            
        await loadPokemon();                            
        currentId++;
        openStats(currentId);                           
    } else {
        currentId++;
        openStats(currentId);
    }
}

//Previous Pokemon
function slideLeft() {
    currentId--;
    openStats(currentId);
    if (currentId == 1) {
        document.getElementById('slide-left').classList.add('d-none');         
    }
}

//Search function
function pokemonNames() {
    let search = document.getElementById('search-pokemon').value;
    search = search.toLowerCase();
    document.getElementById('allPokemons').innerHTML = '';//delete the index page, to show the searched pokemon
    loadSearchedPokemon(search);                                        
}

//Load searched Pokemon
function loadSearchedPokemon(search) {
    for (let i = 0; i < loadedPokemon.length; i++) {                        
        let pokemon = loadedPokemon[i];
        //If the first letters matches, then shows the right Pokemon's
        if (pokemon['species']['name'].toLowerCase().includes(search)) {  
            renderPokemon(pokemon, i);                                      
            checkTypeForColor(pokemon, pokemon['id']);
        }
    }
}


