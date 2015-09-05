var 
    express = require('express'),
    quoter = require('../quoter'),
    
    app = module.exports = express.Router();

function sendRandomQuote (req, res) {
    res.status(200).send(quoter.getRandomOne());
}

app.get('/api/random-quote', sendRandomQuote);