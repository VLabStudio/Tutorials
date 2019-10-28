this.name = "Bob";

const person = {
    name: "Jon",

    // Anonymous Regular function
    func1: function () {
        console.log(this);
    },

    // Arow function
    func2: () => {
        console.log(this);
    }
}

person.func1(); // Set context
person.func2(); // Call