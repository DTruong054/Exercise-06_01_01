export class AuthController {
    constructor($auth) {
        'ngInject';
        //This refers to the object that we are building atm
        this.$auth = $auth;
    }

    register(){
        this.$auth.signip({email: 'test@test.com'});
    }
}