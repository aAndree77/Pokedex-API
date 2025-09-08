let params = new URLSearchParams(window.location.search);
let id = params.get("id");

const culori = {
    normal: "linear-gradient(135deg, #f0f0e7ff, #A8A77A, #8a6747ff)",
    fire: "linear-gradient(135deg, #f0f0e7ff, #EE8130, #FFB347)",
    water: "linear-gradient(135deg, #f0f0e7ff, #6390F0, #1E3C72)",
    electric: "linear-gradient(135deg, #f0f0e7ff, #F7D02C, #FFD700)",
    grass: "linear-gradient(135deg, #f0f0e7ff, #7AC74C, #2E8B57)",
    ice: "linear-gradient(135deg, #f0f0e7ff, #96D9D6, #00CED1)",
    fighting: "linear-gradient(135deg, #f0f0e7ff, #C22E28, #FF5C5C)",
    poison: "linear-gradient(135deg, #f0f0e7ff, #A33EA1, #DA70D6)",
    ground: "linear-gradient(135deg, #f0f0e7ff, #E2BF65, #D2B48C)",
    flying: "linear-gradient(135deg, #f0f0e7ff, #A98FF3, #6A5ACD)",
    psychic: "linear-gradient(135deg, #f0f0e7ff, #F95587, #FF69B4)",
    bug: "linear-gradient(135deg, #f0f0e7ff, #A6B91A, #9ACD32)",
    rock: "linear-gradient(135deg, #f0f0e7ff,  #B6A136, #C2B280)",
    ghost: "linear-gradient(135deg, #f0f0e7ff,  #735797, #9370DB)",
    dragon: "linear-gradient(135deg, #f0f0e7ff, #6F35FC, #1A1AFF)",
    dark: "linear-gradient(135deg, #f0f0e7ff, #705746, #2F2F2F)",
    steel: "linear-gradient(135deg, #f0f0e7ff, #B7B7CE, #D3D3D3)",
    fairy: "linear-gradient(135deg, #f0f0e7ff, #D685AD, #FFB6C1)"
};

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
async function getPokemon() {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let data = await response.json();
    console.log(data)

    let response2 = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

    document.querySelector("#name").textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    document.title = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    document.querySelector("#id"). textContent = `#${data.id}`;
    document.querySelector("#img-container img").src = response2;
    document.querySelector("#putere").textContent = data.types.map(t => t.type.name).join(", ")
    document.querySelector("#putere").style.background = culori[data.types.map(t => t.type.name)[0]];
    let img = document.querySelector("#type")
    if (tipuri[data.types[0].type.name]) {
        img.src = tipuri[data.types[0].type.name];
}

    document.body.style.background = culori[data.types.map(t => t.type.name)[0]];

    document.querySelectorAll(".increments")[0].textContent = data.weight + " kg";
    document.querySelectorAll(".increments")[1].textContent = data.height + " m";
    document.querySelectorAll(".increments")[2].textContent = data.abilities.map(a => a.ability.name).join(", ")

    let responseS = await fetch(data.species.url);
    let dataS = await responseS.json();
    document.querySelector("#desc").textContent = dataS.flavor_text_entries[1].flavor_text
    console.log(dataS)

    let stats = data.stats;
    document.querySelector("#bar1").value = stats[0].base_stat;
    document.querySelector("#bar2").value = stats[1].base_stat;
    document.querySelector("#bar3").value = stats[2].base_stat;
    document.querySelector("#bar4").value = stats[3].base_stat;
    document.querySelector("#bar5").value = stats[4].base_stat;
    document.querySelector("#bar6").value = stats[5].base_stat;

    document.querySelector("#genera").textContent = dataS.genera[7].genus

    document.querySelectorAll(".stats p:nth-child(3)")[0].textContent = stats[0].base_stat;
    document.querySelectorAll(".stats p:nth-child(3)")[1].textContent = stats[1].base_stat;
    document.querySelectorAll(".stats p:nth-child(3)")[2].textContent = stats[2].base_stat;
    document.querySelectorAll(".stats p:nth-child(3)")[3].textContent = stats[3].base_stat;
    document.querySelectorAll(".stats p:nth-child(3)")[4].textContent = stats[4].base_stat;
    document.querySelectorAll(".stats p:nth-child(3)")[5].textContent = stats[5].base_stat;


    let responseE = await fetch(dataS.evolution_chain.url);
    let dataE = await responseE.json();
    console.log(dataE)

    let evo1 = dataE.chain.species.name;
    let evo2 = dataE.chain?.evolves_to[0]?.species.name;
    let evo3 = dataE.chain?.evolves_to[0]?.evolves_to[0]?.species.name;


    if (evo1) {
        let res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo1}`);
        let poke1 = await res1.json();
        document.querySelector("#evo-name1").textContent = evo1
        document.querySelector("#evo1").src = 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke1.id}.svg`;
    } else {
        document.querySelector("#evo1").src = "";
        document.querySelector("#evo-name1").textContent = "No evolution"
    }

    if (evo2) {
        let res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo2}`);
        let poke2 = await res2.json();
        document.querySelector("#evo-name2").textContent = evo2
        document.querySelector("#evo2").src = 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke2.id}.svg`;
    } else {
        document.querySelector("#evo2").src = "";
        document.querySelector("#evo-name2").textContent = "No evolution"
    }

    if (evo3) {
        let res3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${evo3}`);
        let poke3 = await res3.json();
        document.querySelector("#evo-name3").textContent = evo3
        document.querySelector("#evo3").src = 
            `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${poke3.id}.svg`;
    } else {
        document.querySelector("#evo3").src = "";
        document.querySelector("#evo-name3").textContent = "No evolution"
    }


}

let prev = document.querySelector("#prev")
let next = document.querySelector("#next")
let back = document.querySelector("#back")

prev.addEventListener("click", () => {
    if (id > 1) {
        id = parseInt(id) - 1;
        window.location.href = `pokemon.html?id=${id}`;
    }
})

next.addEventListener("click", () => {
    id = parseInt(id) + 1;
    window.location.href = `pokemon.html?id=${id}`;
})


back.addEventListener("click", () => {
    window.location.href = "index.html"
})

getPokemon()