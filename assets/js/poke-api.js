
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    console.log('Criando instancia do pokemon...');
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    //pokemon.sprite1 = pokeDetail.sprites.front_default
    //pokemon.sprite2 = pokeDetail.sprites.front_shiny
    
    console.log(pokeDetail.sprites.other);

    pokemon.sprite1 = pokeDetail.sprites.other.home.front_default
    pokemon.sprite2 = pokeDetail.sprites.other.home.front_shiny
    
    pokemon.url = pokeDetail.pokeDetail



    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then(function(response)
        {
            console.log('Obtendo detalhes do pokemon'); 
            return  response.json()
        })
        .then(convertPokeApiDetailToPokemon)
}

function lidar(aObj)
{
    console.log('first call');
    return aObj.json()
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        //.then((response) =>  response.json())
        .then(
            (response) =>
            {
                    console.log('Faendo chamado à API...');
                    console.log('call 1'); 
                    
                    let resultado = response.json();
                    console.log(resultado);
                    return resultado


            })
        .then(
            (jsonBody) =>
            {
                console.log('call 2'); 
                return jsonBody.results
            })
        .then(
            (pokemons)  =>
            {
                console.log('call 3');
                return  pokemons.map(pokeApi.getPokemonDetail)
            })
        .then(
            (detailRequests)  =>
            {
                console.log('call 4');
                return Promise.all(detailRequests)
            })
        .then(
            (pokemonsDetails)  =>
            {
                console.log('call 5');
                return  pokemonsDetails
            })
        //.then((jsonBody) => jsonBody.results)
        //.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //.then((detailRequests) => Promise.all(detailRequests))
        //.then((pokemonsDetails) => pokemonsDetails)
}
