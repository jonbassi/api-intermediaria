let held_by_pokemon = [];

let listOfPokes = [];

held_by_pokemon.forEach(item => {
    listOfPokes.push(item.pokemon.name);
});

console.log(listOfPokes)