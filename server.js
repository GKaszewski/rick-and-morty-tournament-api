const express = require("express");
const cors = require("cors");
const app = express();

let env = process.env.NODE_ENV || 'dev';
const config = require('./environment')[env];
const db = require('./database');
db.connectToDatabase(config);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const characterRoutes = require('./routes/character.routes');

app.use('/', characterRoutes);

app.get("/", async (req, res) => {
    res.send("Welcome to Rick & Morty Tournament API!");
});

app.listen(config.server.port);