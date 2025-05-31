class Person {
  constructor(name) {
    this.name = name;
  }
}

const member = new Person('John');
console.log(typeof member);
// Output will be 'object' because 'member' is an instance of the Person class.