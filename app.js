const dbConnection = require("./db/dbConnect");
const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require('body-parser')

const userModel = require('./db/userModel');

const app = express();
const jsonParser = bodyParser.json()

app.post('/register', jsonParser, async (req, res) => {
    const client = await dbConnection();
    const db = client.db("AuthDB");
    const collection = db.collection("user");
    const query = { email: req.body.email };
    const email_result = await collection.findOne(query);
    if(email_result != null){
        res.status(400).send({
            message: "User email already exists"
        });
    } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = userModel(req.body.email, hashedPassword);
        try {
            const result = await collection.insertOne(user);
            res.status(201).send({
                message: "User created successfully",
                result: result
            });
            
        } finally {
            client.close()
        }
    }
    
});



app.listen(3000, () => {
    console.log("Listening on port 3000")
})