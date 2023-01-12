const axios = require("axios");

module.exports = {
  async moveInformations(move) {
    try {
        let url = `https://pokeapi.co/api/v2/move/${move}`;

    const response = await axios.get(url);
    let data = response.data;

    return this.getMove(data);
    }
    catch (err) {
       return err.response.data
    }
  },

  getMove(move) {
    let accuracy = move.accuracy;
    let dmgClass = move.damage_class.name;
    let percent = String(move.effect_chance) + " %";
    let listOfPokes = move.learned_by_pokemon;
    let name = move.name;
    let power = move.power;
    let pp = move.pp;
    let target = move.target.name;
    let moveType = move.type.name;

    let seed = 0;
    let pokes = [];
    let listMax = 3;

    listOfPokes = this.filterPokeName(listOfPokes);

    if (listMax.length < 3) listMax = listOfPokes.length;

    for (let i = 0; i < 3; i++) {
      seed = Math.round(Math.random() * listOfPokes.length);
      let duplicated = false;

      if (seed == listOfPokes.length) seed--;

      let name = listOfPokes[seed].name;

      name = name.charAt(0).toUpperCase() + name.slice(1);

      pokes.forEach((item) => {
        if (item == name) {
          duplicated = true;
          i--;
        }
      });

      if (!duplicated) pokes.push(name);
    }

    informations = {
      accuracy: accuracy,
      dmgClass: dmgClass,
      percent: percent,
      name: name,
      power: power,
      pp: pp,
      target: target,
      moveType: moveType,
      pokesWhoCanLearn: pokes,
    };

    return informations;
  },

  // função para bloquear alguns pokemons

  filterPokeName(array) {
    for (let i = 0; i < array.length; i++) {
      if (
        array[i].name.includes("pikachu-")    ||
        array[i].name.includes("-gmax")       ||
        array[i].name.includes("-mega")       ||
        array[i].name.includes("-aria")       ||
        array[i].name.includes("-hangry")     ||
        array[i].name.includes("-amped")      ||
        array[i].name.includes("-primal")     ||
        array[i].name.includes("-disguised")  ||
        array[i].name.includes("-totem")      ||
        array[i].name.includes("-busted")
      ) {
        array.splice(i, 1);
        i--;
      }
    }
    return array;
  },
};
