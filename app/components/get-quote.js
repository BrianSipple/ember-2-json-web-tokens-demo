import Ember from 'ember';

let GetForm = Ember.Component.extend({
   
    gotQuote: false,
    quote: '',
    
    actions: {
        getQuote: function () {
            
            (function () {
                Ember.$.ajax({
                    type: 'GET',
                    url: 'http://localhost:3001/api/protected/random-quote',
                    success: function (response) { 
                        this.setProperties({
                            quote: response,
                            gotQuote: true
                        });
                    }.bind(this),
                    error: function () {
                        alert('An error occurred while processing the response');
                    }
                });
            }.bind(this)());            
        }    
    }
    
});


export default GetForm;