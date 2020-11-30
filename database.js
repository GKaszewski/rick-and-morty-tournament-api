const mongoose = require('mongoose');

const connectToDatabase = async (config) => {
    return mongoose.connect(config.database.uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

exports.connectToDatabase = connectToDatabase;
