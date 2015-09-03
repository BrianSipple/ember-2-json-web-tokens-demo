import Ember from 'ember';
import Base from 'simple-auth/authorizers/base';

let BaseAuthorizer = Base.extend({
    
    /**
     * Gets the saved token and adds the Authorization 
     * header in each Ajax call.
     */
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