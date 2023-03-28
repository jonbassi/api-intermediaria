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


        // function traduzirTipoPokemon(tipo) {
        //     return tipo.replaceAll("normal", "Normal")
        //                .replaceAll("fighting", "Lutador")
        //                .replaceAll("flying", "Voador")
        //                .replaceAll("poison", "Venenoso")
        //                .replaceAll("ground", "Terra")
        //                .replaceAll("rock", "Pedra")
        //                .replaceAll("bug", "Inseto")
        //                .replaceAll("ghost", "Fantasma")
        //                .replaceAll("steel", "Aço")
        //                .replaceAll("fire", "Fogo")
        //                .replaceAll("water", "Água")
        //                .replaceAll("grass", "Grama")
        //                .replaceAll("electric", "Elétrico")
        //                .replaceAll("psychic", "Psíquico")
        //                .replaceAll("ice", "Gelo")
        //                .replaceAll("dragon", "Dragão")
        //                .replaceAll("dark", "Noturno")
        //                .replaceAll("fairy", "Fada");
        // }

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