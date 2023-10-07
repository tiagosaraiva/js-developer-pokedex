
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
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
    

    pokemon.url = pokeDetail.pokeDetail



    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then(function(response)
        {
            return  response.json()
        })
        .then(convertPokeApiDetailToPokemon)
}

function lidar(aObj)
{
    return aObj.json()
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        //.then((response) =>  response.json())
        .then(
            (response) =>
            {
                 
                    
                    let resultado = response.json();
                    return resultado


            })
        .then(
            (jsonBody) =>
            {
                return jsonBody.results
            })
        .then(
            (pokemons)  =>
            {
                return  pokemons.map(pokeApi.getPokemonDetail)
            })
        .then(
            (detailRequests)  =>
            {
                return Promise.all(detailRequests)
            })
        .then(
            (pokemonsDetails)  =>
            {
                return  pokemonsDetails
            })
        //.then((jsonBody) => jsonBody.results)
        //.then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        //.then((detailRequests) => Promise.all(detailRequests))
        //.then((pokemonsDetails) => pokemonsDetails)
}
