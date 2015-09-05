import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

let BaseAuthenticator = Base.extend({
    
    tokenEndpoint: 'http://localhost:3001/sessions/create',
    
    restore: function (data) {
        return new Ember.RSVP.Promise(function (resolve, reject) {
           if (!Ember.isEmpty(data.token)) {
               resolve(data);
           } else {
               reject();
           }
        });
    },
    
    authenticate: function (options) {
                
        return new Ember.RSVP.Promise((resolve, reject) => {
                       
            // TODO: Create our own Promise-based, Pure JS AJAX helpers
            Ember.$.ajax({
                url: this.tokenEndpoint,
                type: 'POST',
                data: JSON.stringify({
                    username: options.identification,
                    password: options.password
                }),
                contentType: 'application/json;charset=utf-8',
                dataType: 'json'
            })
            .then(
                function (response) {
                    debugger;
                    return Ember.run(function () {
                        resolve({
                            token: response.id_token
                        });
                    });
                }, 
                function (xhr /*, status, error */) {
                    debugger;
                    let response = xhr.responseText;
                    Ember.run(function () {
                        reject(response);
                    });
                }
            );                
        });        
    },
    
    invalidate: function () {
        console.log('Invalidate....');
        return Ember.RSVP.resolve();
    }
    
});


export default BaseAuthenticator;