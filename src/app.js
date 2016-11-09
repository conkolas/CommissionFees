var User = require('./user');

class App {
    constructor(){
        this.user = new User('Aistis', 'Matulis');
    }
    greetUser() {
        this.user.greet();
    }
}

var app = new App();
app.greetUser();