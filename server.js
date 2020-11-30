const express = require("express");
const cors = require("cors");
const app = express();

let env = process.env.NODE_ENV || 'dev';
const config = require('./environment')[env];
const db = require('./database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async (req, res) => {
    let dbResponse = await db.connectToDatabase(config);
    if (!dbResponse) return res.send('Error: Cannot connect to the database!');
    res.send("Welcome to Rick & Morty Tournament API!");
});

app.listen(config.server.port);