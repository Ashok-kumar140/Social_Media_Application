const express = require('express');
const mongoose = require('mongoose');
import cors from 'cors'
import { readdirSync } from 'fs';
require("dotenv").config();

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const hostname = 'localhost';
const serverdbURL = process.env.SERVERURL;
const port = process.env.PORT;



mongoose.connect(serverdbURL,
    { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(res => {
        app.listen(port, hostname, () => {
            console.log(`Server is running at ${hostname}: ${port}`);
        })

    })
    .catch(err => console.log(err));

readdirSync('./routes').map((r) => {
    app.use('/api', require(`./routes/${r}`))
});

// app.post('/api/register', (req, res) => {
//     console.log("Registered endpoint=>", req.body);
// })