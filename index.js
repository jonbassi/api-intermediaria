const express = require("express");
const app = express();
const GETpokemon = require("./api/functionsGETpokemon");
const GETmove = require("./api/functionGETmove");
const GETpokeMoves = require("./api/functionGETpokeMoves");
const GETitem = require("./api/functionGETitem");
const GETability = require("./api/functionGETability");
const GETevolution = require("./api/functionGETevolution");

app.use(express.json({ extended: false }));
app.use(express.json())


app.get('/pokemon/:name', async (req, res) => {

    const response = await GETpokemon.pokeInformations(req.params.name);

    if (response != 'Not Found') res.status(200).json(response);
    else {
        res.status(404).send(response);
    }
})

app.get('/move/:name', async (req, res) => {

    const response = await GETmove.moveInformations(req.params.name);
    if (response != 'Not Found') res.status(200).json(response);
    else {
        res.status(404).send(response);
    }
});

app.get('/item/:name', async (req, res) => {

    const response = await GETitem.itemInformations(req.params.name);
    if (response != 'Not Found') res.status(200).json(response);
    else {
        res.status(404).send(response);
    }
});

app.get('/ability/:name', async (req, res) => {

    const response = await GETability.abilityInformations(req.params.name);
    if (response != 'Not Found') res.status(200).json(response);
    else {
        res.status(404).send(response);
    }
});

// testing 
app.get('/evolution/:name', async (req, res) => {

    const response = await GETevolution.evolution(req.params.name);
    if (response != 'Not Found') res.status(200).json(response);
    else {
        res.status(404).send(response);
    }
});

app.get('/movesetPokemon/:name', async (req, res) => {

    const response = await GETpokeMoves.getMoveSet(req.params.name);
    if (response != 'Not Found') res.status(200).json(response);
    else {
        res.status(404).send(response);
    }
});
// end


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));