export class NavbarController {
    constructor($auth) {
        'ngInject';
        //We can build these in a constucture and use these at a later time
        this.$auth = $auth;
        this.isAuthenticated = $auth.isAuthenticated;
    }

    logout(){
        //Using the constucter above, and calling the logout in satilizer
        this.$auth.logout();
    }
}