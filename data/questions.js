export default [
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function sayHi() {
      console.log(name);
      console.log(age);
      var name = 'Lydia';
      let age = 21;
    }
    `,
    answer: 'd',
    a: 'Lydia and undefined',
    b: 'Lydia and ReferenceError',
    c: 'ReferenceError and 21',
    d: 'undefined and ReferenceError',
    explanation: `
    Within the function, we first declare the name variable with the var keyword. This means that the variable gets hoisted (memory space is set up during the creation phase) with the default value of undefined, until we actually get to the line where we define the variable. We haven't defined the variable yet on the line where we try to log the name variable, so it still holds the value of undefined.

    Variables with the let keyword (and const) are hoisted, but unlike var, don't get initialized. They are not accessible before the line we declare (initialize) them. This is called the "temporal dead zone". When we try to access the variables before they are declared, JavaScript throws a ReferenceError.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    for (var i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 1);
    }
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => console.log(i), 1);
    }
    `,
    answer: 'c',
    a: '0 1 2 and 0 1 2',
    b: '0 1 2 and 3 3 3',
    c: '3 3 3 and 0 1 2',
    d: 'undefined and undefined',
    explanation: `
    Because of the event queue in JavaScript, the setTimeout callback function is called after the loop has been executed. Since the variable i in the first loop was declared using the var keyword, this value was global. During the loop, we incremented the value of i by 1 each time, using the unary operator ++. By the time the setTimeout callback function was invoked, i was equal to 3 in the first example.

    In the second loop, the variable i was declared using the let keyword: variables declared with the let (and const) keyword are block-scoped (a block is anything between { }). During each iteration, i will have a new value, and each value is scoped inside the loop.
    `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const shape = {
      radius: 10,
      diameter() {
        return this.radius * 2;
      },
      perimeter: () => 2 * Math.PI * this.radius,
    };
    
    console.log(shape.diameter());
    console.log(shape.perimeter());
    `,
    answer: 'b',
    a: '20 and 62.83185307179586',
    b: '20 and NaN',
    c: '20 and 63',
    d: 'NaN and 63',
    explanation: `
    Note that the value of diameter is a regular function, whereas the value of perimeter is an arrow function.

    With arrow functions, the this keyword refers to its current surrounding scope, unlike regular functions! This means that when we call perimeter, it doesn't refer to the shape object, but to its surrounding scope (window for example).

    There is no value radius on that object, which returns NaN.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    +true;
    !'Lydia';
    `,
    answer: 'a',
    a: '1 and false',
    b: 'false and NaN',
    c: 'false and false',
    d: '1 and NaN',
    explanation: `
    The unary plus tries to convert an operand to a number. true is 1, and false is 0.

    The string 'Lydia' is a truthy value. What we're actually asking, is "is this truthy value falsy?". This returns false.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'Which one is true?',
    questionText: `
    const bird = {
      size: 'small',
    };
    
    const mouse = {
      name: 'Mickey',
      small: true,
    };
    `,
    answer: 'a',
    a: 'mouse.bird.size is not valid',
    b: 'mouse[bird.size] is not valid',
    c: 'mouse[bird["size"]] is not valid',
    d: 'All of them are valid',
    explanation: `
    In JavaScript, all object keys are strings (unless it's a Symbol). Even though we might not type them as strings, they are always converted into strings under the hood.

    JavaScript interprets (or unboxes) statements. When we use bracket notation, it sees the first opening bracket [ and keeps going until it finds the closing bracket ]. Only then, it will evaluate the statement.

    mouse[bird.size]: First it evaluates bird.size, which is "small". mouse["small"] returns true

    However, with dot notation, this doesn't happen. mouse does not have a key called bird, which means that mouse.bird is undefined. Then, we ask for the size using dot notation: mouse.bird.size. Since mouse.bird is undefined, we're actually asking undefined.size. This isn't valid, and will throw an error similar to Cannot read property "size" of undefined.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    let c = { greeting: 'Hey!' };
    let d;
    
    d = c;
    c.greeting = 'Hello';
    console.log(d.greeting);
    `,
    answer: 'a',
    a: 'Hello',
    b: 'Hey!',
    c: 'undefined',
    d: 'ReferenceError',
    explanation: `
    In JavaScript, all objects interact by reference when setting them equal to each other.

    First, variable c holds a value to an object. Later, we assign d with the same reference that c has to the object.

    When you change one object, you change all of them.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    let a = 3;
    let b = new Number(3);
    let c = 3;
    
    console.log(a == b);
    console.log(a === b);
    console.log(b === c);
    `,
    answer: 'c',
    a: 'true false true',
    b: 'false false true',
    c: 'true false false',
    d: 'false true true',
    explanation: `
    new Number() is a built-in function constructor. Although it looks like a number, it's not really a number: it has a bunch of extra features and is an object.

    When we use the == operator, it only checks whether it has the same value. They both have the value of 3, so it returns true.

    However, when we use the === operator, both value and type should be the same. It's not: new Number() is not a number, it's an object. Both return false.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    class Chameleon {
      static colorChange(newColor) {
        this.newColor = newColor;
        return this.newColor;
      }
    
      constructor({ newColor = 'green' } = {}) {
        this.newColor = newColor;
      }
    }
    
    const freddie = new Chameleon({ newColor: 'purple' });
    console.log(freddie.colorChange('orange'));
    `,
    answer: 'd',
    a: 'orange',
    b: 'purple',
    c: 'green',
    d: 'TypeError',
    explanation: `
    The colorChange function is static. Static methods are designed to live only on the constructor in which they are created, and cannot be passed down to any children. Since freddie is a child, the function is not passed down, and not available on the freddie instance: a TypeError is thrown.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    let greeting;
    greetign = {}; // Typo!
    console.log(greetign);
    `,
    answer: 'a',
    a: '{}',
    b: 'ReferenceError: greetign is not defined',
    c: 'undefined',
    d: 'greetign',
    explanation: `
    It logs the object, because we just created an empty object on the global object! When we mistyped greeting as greetign, the JS interpreter actually saw this as global.greetign = {} (or window.greetign = {} in a browser).

    In order to avoid this, we can use "use strict". This makes sure that you have declared a variable before setting it equal to anything.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What happens when we do this?',
    questionText: `
    function bark() {
      console.log('Woof!');
    }
    
    bark.animal = 'dog';
    `,
    answer: 'a',
    a: 'Nothing, this is totally fine!',
    b: 'SyntaxError. You cannot add properties to a function this way',
    c: '"Woof" gets logged',
    d: 'ReferenceError',
    explanation: `
    This is possible in JavaScript, because functions are objects! (Everything besides primitive types are objects)

    A function is a special type of object. The code you write yourself isn't the actual function. The function is an object with properties. This property is invocable.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output??',
    questionText: `
    function Person(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    
    const member = new Person('Lydia', 'Hallie');
    Person.getFullName = function() {
      return \`${this.firstName} ${this.lastName}\`;
    };
    
    console.log(member.getFullName());
    `,
    answer: 'a',
    a: 'TypeError',
    b: 'SyntaxError',
    c: 'Lydia Hallie',
    d: 'undefined undefined',
    explanation: `
    In JavaScript, functions are objects, and therefore, the method getFullName gets added to the constructor function object itself. For that reason, we can call Person.getFullName(), but member.getFullName throws a TypeError.

    If you want a method to be available to all object instances, you have to add it to the prototype property:

    Person.prototype.getFullName = function() {
      return \`${this.firstName} ${this.lastName}\`;
    };
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function Person(firstName, lastName) {
      this.firstName = firstName;
      this.lastName = lastName;
    }
    
    const lydia = new Person('Lydia', 'Hallie');
    const sarah = Person('Sarah', 'Smith');
    
    console.log(lydia);
    console.log(sarah);
    `,
    answer: 'a',
    a: 'Person {firstName: "Lydia", lastName: "Hallie"} and undefined',
    b: 'Person {firstName: "Lydia", lastName: "Hallie"} and Person {firstName: "Sarah", lastName: "Smith"}',
    c: 'Person {firstName: "Lydia", lastName: "Hallie"} and {}',
    d: 'Person {firstName: "Lydia", lastName: "Hallie"} and ReferenceError',
    explanation: `
    For sarah, we didn't use the new keyword. When using new, this refers to the new empty object we create. However, if you don't add new, this refers to the global object!

    We said that this.firstName equals "Sarah" and this.lastName equals "Smith". What we actually did, is defining global.firstName = 'Sarah' and global.lastName = 'Smith'. sarah itself is left undefined, since we don't return a value from the Person function.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'Select the best answer',
    questionText: 'What are the three phases of event propagation?',
    answer: 'd',
    a: 'Target > Capturing > Bubbling',
    b: 'Bubbling > Target > Capturing',
    c: 'Target > Bubbling > Capturing',
    d: 'Capturing > Target > Bubbling',
    explanation: `
    During the capturing phase, the event goes through the ancestor elements down to the target element. It then reaches the target element, and bubbling begins.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'Select the best answer',
    questionText: 'All objects have prototypes.',
    answer: 'b',
    a: 'True',
    b: 'False',
    c: 'There are no objects in JavaScript',
    d: 'No JavaScript objects have prototypes',
    explanation: `
    All objects have prototypes, except for the base object. The base object is the object created by the user, or an object that is created using the new keyword. The base object has access to some methods and properties, such as .toString. This is the reason why you can use built-in JavaScript methods! All of such methods are available on the prototype. Although JavaScript can't find it directly on your object, it goes down the prototype chain and finds it there, which makes it accessible for you.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function sum(a, b) {
      return a + b;
    }
    
    sum(1, '2');
    `,
    answer: 'c',
    a: 'NaN',
    b: 'TypeError',
    c: '"12"',
    d: '3',
    explanation: `
    JavaScript is a dynamically typed language: we don't specify what types certain variables are. Values can automatically be converted into another type without you knowing, which is called implicit type coercion. Coercion is converting from one type into another.

    In this example, JavaScript converts the number 1 into a string, in order for the function to make sense and   return a value. During the addition of a numeric type (1) and a string type ('2'), the number is treated as a  string. We can concatenate strings like "Hello" + "World", so what's happening here is "1" + "2" which returns "12".
  `,
    language: 'JavaScript'
  },
];
