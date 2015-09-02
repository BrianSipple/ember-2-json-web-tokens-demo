import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

let BaseAuthorizer = Base.extend({
    
    authorize: function (jqXHR, requestOptions) {
        var accessToken = this.get('session.content.secure.token');
        if ( 
            this.get('session.isAuthenticated') && 
            !Ember.isEmpty(accessToken) 
        ) {
            jqXHR.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        }
    }    
});

export default BaseAuthorizer;