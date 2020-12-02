const routes = require('express').Router();
const Character = require('../models/character.model');
const axios = require('axios').default;

const EloRating = require('elo-rating');

routes.get('/characters', async (req, res) => {
    await Character.find({}, (err, characters) => {
        if (err) return res.sendStatus(400);
    }).sort({ eloRating: -1 }).exec((err, characters) => {
        if (err) return res.sendStatus(400);

        return res.send(characters);
    });
});

routes.get('/fetch-characters', async (req, res) => {
    let url = 'https://rickandmortyapi.com/api/character/';
    let charactersFromAPI = [];
    let pages = 0;

    await axios.get(url).then(res => {
        let charactersInfo = res.data.results;
        pages = res.data.info.pages;
        charactersInfo.map(character => charactersFromAPI.push(character));
    });

    for (let i = 2; i <= pages; i++) {
        await axios.get(`${url}?page=${i}`).then(res => {
            let charactersInfo = res.data.results;
            charactersInfo.map(character => charactersFromAPI.push(character));
        });
    }

    let error = false;
    charactersFromAPI.map(async (character) => {
        let characterModel = new Character(character);
        let alreadyExists = await Character.findOne({ id: characterModel.id });
        if (!alreadyExists) {
            await characterModel.save((err, result) => { }).catch(err => error = true);
        }
    });

    if (error) return res.sendStatus(400);

    return res.sendStatus(200);
});

routes.post('/rate', async (req, res) => {
    let data = req.body;
    let winner = data.winner;
    let loser = data.loser;
    let result = EloRating.calculate(winner.eloRating, loser.eloRating, true);

    let updateWinnerError = false;
    let updateLoserError = false;

    await Character.findByIdAndUpdate({ _id: winner._id }, { eloRating: result.playerRating }, (err, result) => {
    }).catch(err => updateWinnerError = true);

    await Character.findByIdAndUpdate({ _id: loser._id }, { eloRating: result.opponentRating }, (err, result) => {
    }).catch(err => updateLoserError = true);


    if (updateWinnerError || updateLoserError) return res.sendStatus(400);

    return res.sendStatus(200);
});

module.exports = routes;
