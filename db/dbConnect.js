const { MongoClient } = require("mongodb");
require("dotenv").config();

async function dbConnection() {
    const client = new MongoClient(process.env.DB_URL);
    const connection = client.connect();
    return connection;
    
}

module.exports = dbConnection;