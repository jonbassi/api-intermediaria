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

      // TAKE SECOND STAGE EVOLUTION(S) AND DETAIL(S)
      let allEvolutions = [];
      let isAlternative = 'false';

      // function to specify alternative forms
      function isGalar(name){
        let galarForms = ["obstagoon","perrserker", "cursola", "sirfecth", "mr.rime", "runegrigus"]
        for(let i = 0; i < galarForms.length; i++) {
          if(name == galarForms[i]) isAlternative = 'galar';  
        }
        return isAlternative
      }

      data.chain.evolves_to.forEach(element => {
        if (element.species.name != chosenPokemon && element.species.name != previousEvolution) {
            if (!chosenPokemon.includes('-alola') || !chosenPokemon.includes('-galar')){
                let evolutionObj = { 
                  "evolutionName": element.species.name, 
                  "evolutionDetails": element['evolution_details'],
                  "isGalarForm": isGalar(element.species.name)
                }
                allEvolutions.push(evolutionObj);
            } else {
                let evolutionObj = {
                  "evolutionName": element.species.name, 
                  "evolutionDetails": element['evolution_details'],
                  "isGalarForm": isGalar(element.species.name)
                }
                allEvolutions.push(evolutionObj);
              }
        }
    });
      // TAKE THIRD STAGE EVOLUTION(S) AND DETAIL(S)
      data.chain.evolves_to[0].evolves_to.forEach(element => {
        if (element.species.name != chosenPokemon && element.species.name != previousEvolution) {
            if (chosenPokemon.includes('-alola') || chosenPokemon.includes('-galar')){
                let evolutionObj = { 
                  "evolutionName": element.species.name, 
                  "evolutionDetails": element['evolution_details'],
                  "isGalarForm": isGalar(element.species.name)
                }
                allEvolutions.push(evolutionObj);
            } else {
                let evolutionObj = {
                  "evolutionName": element.species.name, 
                  "evolutionDetails": element['evolution_details'],
                  "isGalarForm": isGalar(element.species.name)
                }
                allEvolutions.push(evolutionObj);
            }
        }
    });

      console.log(chosenPokemon);
      // END
      return allEvolutions;
    }
      catch (err) {
        return err.response.data;
    }
  }
}