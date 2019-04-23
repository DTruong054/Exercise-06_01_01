export class MainController {
  constructor ($http) {
    'ngInject';
    //'ngInject' is a string literal. A tool called ng-annotate uses it as a flag : if a function starts with 'ngInject';, it will be processed by ng-annotate.
    this.$http = $http;
    this.getMessages();
  }

  postMessage(){
      this.$http.post('http://localhost:8080/api/message', {
        msg: this.message
    });
  }

  getMessages(){
    //Go into database to grab a thread. This will be used in the future to grab messages
    var vm = this; //Doing this do we don't lose scope once we swtch to the .then function
    this.$http.get('http://localhost:8080/api/message')
    .then((result) =>{
      vm.messages = result.data; //The vm is this.messages since we already made a variable of it
    })
  }
}