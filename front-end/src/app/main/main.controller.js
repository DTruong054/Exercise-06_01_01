export class MainController {
  constructor ($http) {
    'ngInject';
    //'ngInject' is a string literal. A tool called ng-annotate uses it as a flag : if a function starts with 'ngInject';, it will be processed by ng-annotate.
    this.$http = $http;
  }

  postMessage(){
      this.$http.post('http://localhost:8080/api/message', {
        msg: this.message
    });
  }
}