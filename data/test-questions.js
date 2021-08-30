export const questions = [
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
    level: 2,
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
    level: 2,
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
  }
];
