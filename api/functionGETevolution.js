const axios = require('axios');
//
module.exports = {
  async evolution(pokemon) {
    try {
      let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

      const responseFromSeach = await axios.get(url);
      let data = (responseFromSeach.data);

      // -> TAKE NAME AND SPECIES LINK
      let chosenPokemon = data.name;
      
      // GET DATA FROM specieUrl AND responseData
      let specieUrl = data.species.url;

      const responseFromSpecies = await axios.get(specieUrl);
      data = (responseFromSpecies.data);

      // TAKE PRE-STAGE EVOLUTION NAME, IF THE CHOSEN POKEMON DOES'T HAVE ANY PRE-FORM, RETURN NULL
      let previousEvolution;
      try {
        previousEvolution = data.evolves_from_species.name
      } catch {
        previousEvolution = data.evolves_from_species;
      }

      // TAKE EVOLUTION CHAIN URL AND responseData
      let evoChain = data.evolution_chain.url;

      const responseFromEvoChain = await axios.get(evoChain);
      data = (responseFromEvoChain.data);

      // TAKE SECOND STAGE EVOLUTION(S) AND DETAIL(S) | IF THE POKEMON IS A SECOND STAGE OR DOES'T HAVE SECOND STAGE EVOLUTION RETURNS EMPTY
      let allEvolutions = [];
      data.chain.evolves_to.forEach(element => {
          if (element.species.name != chosenPokemon && element.species.name != previousEvolution) {
              allEvolutions.push(element.species.name);
              allEvolutions.push(element['evolution_details'][0]);
          }
      });

      // TAKE THIRD STAGE EVOLUTION(S) AND DETAIL(S) | IF THE POKEMON IS A THIRD STAGE OR DOES'T HAVE THIRD STAGE EVOLUTION RETURNS EMPTY
      data.chain.evolves_to[0].evolves_to.forEach(element => {
          if (element.species.name != chosenPokemon && element.species.name != previousEvolution) {
              allEvolutions.push(element.species.name);
              allEvolutions.push(element['evolution_details'][0]);
          }
      });
      
      // END
      return allEvolutions;
    }
      catch (err) {
        return err.response.data;
    }
  }
}