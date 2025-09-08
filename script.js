const pokemoni = 50
let pokemonContainer = document.querySelector("#pokemon-container")


const totiPokemonii = []


const tipuri = {
    normal: "/types/Normal type.ico",
    fire: "/types/Fire type.ico",
    water: "/types/Water type.ico",
    electric: "/types/Electric type.ico",
    grass: "/types/Grass type.ico",
    ice: "/types/Ice type.ico",
    fighting: "/types/Fighting type.ico",
    poison: "/types/Poison type.ico",
    ground: "/types/Ground type.ico",
    flying: "/types/Flying type.ico",
    psychic: "/types/Psychic type.ico",
    bug: "/types/Bug type.ico",
    rock: "/types/Rock type.ico",
    ghost: "/types/Ghost type.ico",
    dragon: "/types/Dragon type.ico",
    dark: "/types/Dark type.ico",
    steel: "/types/Steel type.ico",
    fairy: "/types/Fairy type.ico"
}

async function getPokemon(){
  const response =  await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemoni}`);
  let data =  await response.json();
  data = data.results
  for(let i = 0; i<pokemoni; i++){
    let id = data[i].url.split("/")[6]

    const responseT = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const dataT = await responseT.json();
    const primaryType = dataT.types[0].type.name;

    let card = document.createElement("div")
    card.className="pokemon"
    card.innerHTML = `
        <div class="id-container">
          <p class="id">#${id}</p>
          <img class="type" src="${tipuri[primaryType]}" alt="${primaryType}">
        </div>
        <img class="imagine" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt=${data[i].name}>
        <div class="grey-div">
          <p class="nume">${data[i].name}</p>
        </div>
    `
    totiPokemonii.push({name:data[i].name, id:data[i].url.split("/")[6]})
    pokemonContainer.appendChild(card)
  }
}

pokemonContainer.addEventListener("click",(e)=>{
  let card = e.target.closest(".pokemon")
  let id = card.children[0].children[0].textContent.split("#")[1]
  window.location.href=`pokemon.html?id=${id}`
})

let cards = document.querySelectorAll(".pokemon")
let input = document.querySelector("#input")
async function searchPokemon() {
  input.addEventListener("input",(e)=>{
  for(let i = 0; i < totiPokemonii.length; i++){
    if(totiPokemonii[i].name === input.value){
      console.log(totiPokemonii[i].name)
      fetch(`https://pokeapi.co/api/v2/pokemon/${totiPokemonii[i].name}`)
      .then(response => response.json())
      .then(data => {
        pokemonContainer.innerHTML = ""
        let id = data.id

        const primaryType = data.types[0].type.name;

        let card = document.createElement("div")
        card.className="pokemon"
        card.innerHTML = `
          <div class="id-container">
            <p class="id">#${id}</p>
            <img class="type" src="${tipuri[primaryType]}" alt="${primaryType}">
          </div>
            <img class="imagine" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt=${data.name}>
            <div class="grey-div">
          <p class="nume">${data.name}</p>
        </div>
    `
        pokemonContainer.appendChild(card)
        })
      .catch(error => {
        console.log(error)
      })
    }
    else if(totiPokemonii[i].id === input.value){
      console.log(totiPokemonii[i].id)
      fetch(`https://pokeapi.co/api/v2/pokemon/${totiPokemonii[i].id}`)
      .then(response => response.json())
      .then(data => {
        pokemonContainer.innerHTML = ""
        let id = data.id

        const primaryType = data.types[0].type.name;

        let card = document.createElement("div")
        card.className="pokemon"
        card.innerHTML = `
          <div class="id-container">
            <p class="id">#${id}</p>
            <img class="type" src="${tipuri[primaryType]}" alt="${primaryType}">
          </div>
            <img class="imagine" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg" alt=${data.name}>
            <div class="grey-div">
          <p class="nume">${data.name}</p>
        </div>
    `
        pokemonContainer.appendChild(card)
        })
      .catch(error => {
        console.log(error)
      })
    }
  }
  if(!input.value){
    pokemonContainer.innerHTML = ""
    getPokemon()
  }
})
}

searchPokemon()
getPokemon()
