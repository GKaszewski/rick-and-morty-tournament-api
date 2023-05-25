const express = require("express");
const cors = require("cors");
const app = express();
const path = require('path');

let env = process.env.NODE_ENV || 'dev';
const config = require('./environment')[env];
const db = require('./database');
db.connectToDatabase(config);

app.use(express.static('public/'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: ['https://rickandmorty.gabrielkaszewski.dev',],
	optionsSuccessStatus: 200,
}));

const characterRoutes = require('./routes/character.routes');

app.use('/', characterRoutes);

app.get("/", async (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(config.server.port, ()=>console.log("listening"));
