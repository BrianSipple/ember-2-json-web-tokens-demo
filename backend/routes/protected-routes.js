var
    express = require('express'),
    jwt = require('express-jwt'),
    config = require('../config'),
    quoter = require('../quoter'),


    app = module.exports = express.Router(),
        
    jwtCheck = jwt({
        secret: config.secret 
    });

function sendRandomQuote(req, res) {
    res.status(200).send(quoter.getRandomOne());
}

app.use('/api/protected', jwtCheck);

app.get('/api/protected/random-quote', sendRandomQuote);
        
        