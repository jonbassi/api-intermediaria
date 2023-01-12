const axios = require('axios');
//
module.exports = {
    async itemInformations(item) {
        try {
            let url = `https://pokeapi.co/api/v2/item/${item}`;

            const response = await axios.get(url);

            let data = (response.data);
            return this.itemData(data);
        }
        catch (err) {
            return err.response.data;
        }
    },

    itemData(item) {

        let category = item.category.name;
        let price = item.cost;
        let flingEffect = item.fling_effect;
        let flingPower = item.fling_power;
        let name = item.name;
        let sprite = item.sprites.default;
        
        let held_by_pokemon = item.held_by_pokemon;
        let listOfPokes = [];
        held_by_pokemon.forEach(item => {
            listOfPokes.push(item.pokemon.name);
        });

        informations = {
            "category": category,
            "price": price,
            "flingEffect": flingEffect,
            "flingPower": flingPower,
            "name": name,
            "sprite": sprite,
            "heldBy": listOfPokes
        }
        return informations;
    }
}
