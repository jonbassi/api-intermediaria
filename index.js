const express = require("express");
const app = express();
const GETpokemon = require("./api/functionsGETpokemon");
const GETmove = require("./api/functionGETmove");
const GETitem = require("./api/functionGETitem");

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


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));