const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const UsersModel = require("./models/Users");

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/users");

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UsersModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success");
            } else {
                res.json("Password is incorrect");
            }
        } else {
            res.json("No record exists");
        }
    })
})

app.post("/register", (req, res) => {
    UsersModel.create(req.body)
    .then(userss => res.json(userss))
    .catch(err => res.json(err))
})

app.listen(3000, () => {
    console.log("Server is running");
})