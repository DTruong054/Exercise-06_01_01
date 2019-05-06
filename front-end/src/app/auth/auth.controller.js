export class AuthController {
    constructor($auth) {
        'ngInject';
        //This refers to the object that we are building atm
        this.$auth = $auth;
    }

    register(){
        //This is a virtural memory because it will take this out of scope
        var vm = this
        //This will record our email and password for the sign in
        this.$auth.signup(this.user)
        .then(function (token) {
            vm.$auth.setToken(token)
        });
    }
    login(){
        var vm = this;
        this.$auth.login(this.login.user)
        .then(function(token) { //.this will lose its scope once you enter this
            vm.$auth.setToken(token)
        })
    }
}