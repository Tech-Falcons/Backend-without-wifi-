const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const expressThymeleaf =require('express-thymeleaf');
const {TemplateEngine} = require('thymeleaf');

require('dotenv').config();


const app = express();


const port = process.env.PORT || 8080;

const router = express.Router();

app.use(cors());
app.use(express.json());
app.set('view engine','ejs')


const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const mpdRouter  = require('./app');
app.use('/', mpdRouter);

app.listen(port, () => {
    console.log("Server running on port: ${port}");
});