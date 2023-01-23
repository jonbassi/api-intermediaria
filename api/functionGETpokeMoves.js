const axios = require('axios');
//
module.exports = {
    async getMoveSet(pokemon) {
        try {
            let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

            const response = await axios.get(url);

            let data = (response.data);
            return this.moveset(data);
        }
        catch (err) {
            return err.response.data;
        }
    },

    moveset(data) {
        try {
            let pokemonMoves = [];
            let moveset = data.moves;

            moveset.forEach(move => {
                let obj = {
                    "move": move.move.name,
                    "learned": move.version_group_details[0].level_learned_at,
                    "gameVersion": move.version_group_details[0].version_group.name
                }
                pokemonMoves.push(obj);
            });

            return pokemonMoves;

        }catch (err){
            
            return err.response.data;
        } 
    }
}
