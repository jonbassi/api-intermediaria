const axios = require('axios');

module.exports = {
    async moveInformations(move) {
        try {
            let url = `https://pokeapi.co/api/v2/move/${move}`

            const response = await axios.get(url)

            let data = (response.data);
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

        for (let i = 0; i < 3; i++) {
            seed = Math.round(Math.random() * listOfPokes.length);
            let name = listOfPokes[seed].name;

            if (name.includes('pikachu-')) {
                i--;
                break;
            }
            name = name.charAt(0).toUpperCase()
                + name.slice(1)
            pokes.push(name);
        }

        let txT = `${pokes[0]}, ${pokes[1]} e ${pokes[2]} podem aprender esse golpe.`;

        informations = {
            "accuracy": accuracy,
            "dmgClass": dmgClass,
            "percent": percent,
            "name": name,
            "power": power,
            "pp": pp,
            "target": target,
            "moveType": moveType,
            "pokesWhoCanLearn": txT,
        }

        return informations;
    }
}