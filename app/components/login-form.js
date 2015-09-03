import Ember from 'ember';

let LoginForm = Ember.Component.extend({
    
    authenticator: 'authenticator:custom',
    
    actions: {
        authenticate: function () {
            let credentials = this.getProperties('identification', 'password');
            
            this.get('session')
                .authenticate(this.authenticator, credentials)
                .catch((message) => {
                    this.set('errorMessage', message);
                });
        }
    }
    
});


export default LoginForm;