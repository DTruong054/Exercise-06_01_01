export class AuthController {
    constructor($auth) {
        'ngInject';
        //This refers to the object that we are building atm
        this.$auth = $auth;
    }

    register(){
        //This will record our email and password for the sign in
        this.$auth.signup(this.user);
    }
}