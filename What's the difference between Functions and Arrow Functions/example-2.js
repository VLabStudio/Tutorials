class Person {
    constructor(name) {
        this.name = name;
    }

    getName() {
        console.log(this.name);
    }

    setName(newName) {

        // Arow function
        let set1 = (newName) => {
            this.name = newName;
            console.log(this)
        }

        // Anonymous Regular function
        let set2 = function (newName) {
            this.name = newName;
            console.log(this)
        }

        set1(newName);
        // set2(newName);

        // setTimeout(function (name) {
        //     this.name = name;
        // }, 100);

        // setInterval(function (name) {
        //     this.name = name;
        // }, 100)
    }
}

const person1 = new Person("Bob");

person1.setName("Jon");
person1.getName();