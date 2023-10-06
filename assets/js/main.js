const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const previewButtons = document.getElementsByClassName('preview')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {


    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button value="${pokemon.number}" class="preview" type="button">
                Preview
            </button>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit)
    .then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

    })
    .then(() => 
    {
        registerHoverEvent(previewButtons)
    })
}


function registerHoverEvent(buttons)
{
    for(let i = 0;i<buttons.length;i++)
    {
        console.log('ok');
        buttons[i].addEventListener('mouseenter',
        (e) => 
            {
            
                if(e.target.value!=null){
                    let poke_url = "https://pokeapi.co/api/v2/pokemon/" +e.target.value;  
                    fetch(poke_url)
                    .then(function(detalhe)
                    {
                            return detalhe.json();
                            console.log(detalhe.json())
                    }
                    )
                    .then(function(detalhe_expand)
                    {
                        console.log(detalhe_expand.sprites)
                        let img1 =  detalhe_expand.sprites.other['official-artwork'].front_default;
                        let img2 =  detalhe_expand.sprites.other['official-artwork'].front_shiny;

                        document.getElementById('image1').src = img1;
                        document.getElementById('image2').src = img2;

                        console.log(img1);
                        console.log(img2);

                        

                    })
                }  
               
            
                document.getElementById('box-preview').style.display = 'flex';
            }
        );

        buttons[i].addEventListener('mouseout',
        (e) => 
            {
                document.getElementById('box-preview').style.display = 'none';
            }
        );
    }
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})




function girarImagem() {

    setTimeout(function() {

        
    if(document.getElementById('image1').style.display === 'flex'){
        document.getElementById('image1').style.display = 'none';
        document.getElementById('image2').style.display = 'flex'
    }else{
        document.getElementById('image1').style.display = 'flex'
        document.getElementById('image2').style.display = 'none'
    }
    
    
  

      girarImagem();

    }, 300);
}

// Begins
girarImagem();