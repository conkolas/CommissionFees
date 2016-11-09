module.exports = class User {
    constructor(name, surname){
        this.name = name
        this.surname = surname
    }
    greet() {
        console.log(`Hi, ${this.name} ${this.surname}!`)
    }
}

