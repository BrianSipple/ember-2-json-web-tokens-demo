var quoter = (function () {
    
    var 
        quotes = require('./lib/data/chuck-norris-quotes.json'),
        
        getRandomOne = function getRandomOne() {
            
            var quoteIdx = Math.floor(Math.random() * quotes.length);
            return quotes[quoteIdx];
        };
    
    return {
        getRandomOne: getRandomOne
    };
    
}());

module.exports = quoter;