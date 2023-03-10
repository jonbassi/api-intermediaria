const axios = require('axios');

module.exports = {
    async pokeInformations(pokemon) {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

            const response = await axios.get(url)

            let data = (response.data);
            return this.pokemonBigData(data);
        }
        catch (err) {
            return err.response.data
        }
    },

    pokemonBigData(poke) {

        const pokeNumber = poke.id;

        let pokeName = poke.name
        pokeName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);
        
        const pokeWeight = (poke.weight / 10);
        const pokeHeight = (poke.height / 10);
        const pokeImage = poke.sprites.other['official-artwork'];

        let pokeTypes = '';
        const listOfTypes = poke.types.forEach(item => {
            pokeTypes += ", " + item.type.name;
        });
        pokeTypes = pokeTypes.substring(1)
        pokeTypes = pokeTypes.trim();


        let pokeAbilities = '';
        const listOfAbilities = poke.abilities.forEach(item => {
            pokeAbilities += ", " + item.ability.name;
        });
        pokeAbilities = pokeAbilities.substring(1)
        pokeAbilities = pokeAbilities.trim();


        informations = {
            "pokeNumber": pokeNumber,
            "pokeWeight": pokeWeight,
            "pokeName": pokeName,
            "pokeHeight": pokeHeight,
            "pokeImage": pokeImage,
            "pokeTypes": pokeTypes,
            "pokeAbilities": pokeAbilities
        }

        return informations;
    }
};