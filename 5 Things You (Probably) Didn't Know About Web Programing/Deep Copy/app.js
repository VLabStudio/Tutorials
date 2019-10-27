const obj1 = {
    name: "Bob"
};

// By reference
const obj2 = obj1; 

// Deep Copy
const obj2 = JSON.parse(JSON.stringify(obj1));