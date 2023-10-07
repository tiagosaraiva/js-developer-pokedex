const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const previewButtons = document.getElementsByClassName('preview')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {


    return `
        <li class="pokemon">
          
            <div class="pokemon-box ${pokemon.type}">

            <div class="detail">
                <!--<ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>-->

                <a class="preview">
                    <img src="${pokemon.photo}" id="${pokemon.number}" alt="${pokemon.name}">
                </a>
                <!--<button value="${pokemon.number}" type="button">
                     Preview
                </button>-->
            </div>
           
            </div>
            <div class="etiqueta">
                <span class="number font-${pokemon.type}">#${pokemon.number}</span>
                <span class="name font-${pokemon.type}">${pokemon.name}</span>
            </div>

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
        buttons[i].addEventListener('mouseover',
        (e) => 
            {
            
                if(e.target.id!=null){
                    let poke_url = "https://pokeapi.co/api/v2/pokemon/" +e.target.id;  
                    fetch(poke_url)
                    .then(function(detalhe)
                    {
                            return detalhe.json();
                    }
                    )
                    .then(function(detalhe_expand)
                    {
                        let img1 =  detalhe_expand.sprites.other['official-artwork'].front_default;
                        let img2 =  detalhe_expand.sprites.other['official-artwork'].front_shiny;

                        document.getElementById('image1').src = img1;
                        document.getElementById('image2').src = img2;
                        document.getElementById('box-preview-name').innerHTML = detalhe_expand.name
  
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