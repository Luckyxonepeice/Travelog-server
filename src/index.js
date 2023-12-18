const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const logs = require('./api/logs')

require('dotenv').config({path: "./vars/.env"});

const {notFound,errorHandler}= require('./middlewares')

require('./db');

const app= express();

app.use(express.json())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();}
);

app.use(helmet());

app.use(morgan('common'));

app.get('/', (req,res)=>{
    res.json({
        message:"Hello World!",
    });
});

app.use('/api/logs',logs);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Listening in Port:-${port}`);
});
