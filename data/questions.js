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
    questionTitle: 'Select the best answer.',
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
    questionTitle: 'Select the best answer.',
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
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    let number = 0;
    console.log(number++);
    console.log(++number);
    console.log(number);
    `,
    answer: 'c',
    a: '1 1 2',
    b: '1 2 2',
    c: '0 2 2',
    d: '0 1 2',
    explanation: `
    The postfix unary operator ++:

    Returns the value (this returns 0)
    Increments the value (number is now 1)
    The prefix unary operator ++:
    
    Increments the value (number is now 2)
    Returns the value (this returns 2)
    This returns 0 2 2.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function getPersonInfo(one, two, three) {
      console.log(one);
      console.log(two);
      console.log(three);
    }
    
    const person = 'Lydia';
    const age = 21;
    
    getPersonInfo\`\${person} is \${age} years old\`;
    `,
    answer: 'b',
    a: '"Lydia" 21 ["", " is ", " years old"]',
    b: '["", " is ", " years old"] "Lydia" 21',
    c: '"Lydia" ["", " is ", " years old"] 21',
    d: '["", " is ", " years old"] 21 "Lydia"',
    explanation: `
    If you use tagged template literals, the value of the first argument is always an array of the string values. The remaining arguments get the values of the passed expressions!
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function checkAge(data) {
      if (data === { age: 18 }) {
        console.log('You are an adult!');
      } else if (data == { age: 18 }) {
        console.log('You are still an adult.');
      } else {
        console.log(\`Hmm.. You don't have an age I guess\`);
      }
    }
    
    checkAge({ age: 18 });
    `,
    answer: 'c',
    a: 'You are an adult!',
    b: 'undefined',
    c: 'Hmm.. You don\'t have an age I guess',
    d: 'You are still an adult.',
    explanation: `
    When testing equality, primitives are compared by their value, while objects are compared by their reference. JavaScript checks if the objects have a reference to the same location in memory.

    The two objects that we are comparing don't have that: the object we passed as a parameter refers to a different location in memory than the object we used in order to check equality.

    This is why both { age: 18 } === { age: 18 } and { age: 18 } == { age: 18 } return false.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function getAge(...args) {
      console.log(typeof args);
    }
    
    getAge(21);
    `,
    answer: 'c',
    a: '"number"',
    b: '"array"',
    c: '"object"',
    d: '"NaN"',
    explanation: `
    The rest parameter (...args) lets us "collect" all remaining arguments into an array. An array is an object, so typeof args returns "object"
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function getAge() {
      'use strict';
      age = 21;
      console.log(age);
    }
    
    getAge();
    `,
    answer: 'c',
    a: '21',
    b: 'undefined',
    c: 'ReferenceError',
    d: 'TypeError',
    explanation: `
    With "use strict", you can make sure that you don't accidentally declare global variables. We never declared the variable age, and since we use "use strict", it will throw a reference error. If we didn't use "use strict", it would have worked, since the property age would have gotten added to the global object.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the value of sum?',
    questionText: `
    const sum = eval('10*10+5');
    `,
    answer: 'a',
    a: '105',
    b: '"105"',
    c: 'TypeError',
    d: '"10*10+5',
    explanation: `
    eval evaluates codes that's passed as a string. If it's an expression, like in this case, it evaluates the expression. The expression is 10 * 10 + 5. This returns the number 105.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'How long is cool_secret accessible?',
    questionText: `
    sessionStorage.setItem('cool_secret', 123);
    `,
    answer: 'b',
    a: 'Forever, the data doesn\'t get lost',
    b: 'When the user closes the tab',
    c: 'When the user closes the entire browser, not only the tab',
    d: 'When the user shuts off their computer',
    explanation: `
    The data stored in sessionStorage is removed after closing the tab.

    If you used localStorage, the data would've been there forever, unless for example localStorage.clear() is invoked.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    var num = 8;
    var num = 10;

    console.log(num);
    `,
    answer: 'b',
    a: '8',
    b: '10',
    c: 'SyntaxError',
    d: 'ReferenceError',
    explanation: `
    With the var keyword, you can declare multiple variables with the same name. The variable will then hold the latest value.

    You cannot do this with let or const since they're block-scoped.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const obj = { 1: 'a', 2: 'b', 3: 'c' };
    const set = new Set([1, 2, 3, 4, 5]);

    obj.hasOwnProperty('1');
    obj.hasOwnProperty(1);
    set.has('1');
    set.has(1);
    `,
    answer: 'c',
    a: 'false true false true',
    b: 'false true true true',
    c: 'true true false true',
    d: 'true true true true',
    explanation: `
    All object keys (excluding Symbols) are strings under the hood, even if you don't type it yourself as a string. This is why obj.hasOwnProperty('1') also returns true.

    It doesn't work that way for a set. There is no '1' in our set: set.has('1') returns false. It has the numeric type 1, set.has(1) returns true.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const obj = { a: 'one', b: 'two', a: 'three' };
    console.log(obj);
    `,
    answer: 'c',
    a: '{ a: "one", b: "two" }',
    b: '{ b: "two", a: "three" }',
    c: '{ a: "three", b: "two" }',
    d: 'SyntaxError',
    explanation: `
    If you have two keys with the same name, the key will be replaced. It will still be in its first position, but with the last specified value.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'Select the best answer.',
    questionText: `
    The JavaScript global execution context creates two things for you: the global object, and the "this" keyword.
    `,
    answer: 'a',
    a: 'true',
    b: 'false',
    c: 'it depends',
    d: 'JavaScript does not have a global execution context',
    explanation: `
    The base execution context is the global execution context: it's what's accessible everywhere in your code.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    for (let i = 1; i < 5; i++) {
      if (i === 3) continue;
      console.log(i);
    }
    `,
    answer: 'c',
    a: '1 2',
    b: '1 2 3',
    c: '1 2 4',
    d: '1 3 4',
    explanation: `
    The continue statement skips an iteration if a certain condition returns true.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    String.prototype.giveLydiaPizza = () => {
      return 'Just give Lydia pizza already!';
    };
    
    const name = 'Lydia';
    
    name.giveLydiaPizza();
    `,
    answer: 'a',
    a: '"Just give Lydia pizza already!"',
    b: 'TypeError: not a function',
    c: 'SyntaxError',
    d: 'undefined',
    explanation: `
    String is a built-in constructor, which we can add properties to. I just added a method to its prototype. Primitive strings are automatically converted into a string object, generated by the string prototype function. So, all strings (string objects) have access to that method!
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const a = {};
    const b = { key: 'b' };
    const c = { key: 'c' };

    a[b] = 123;
    a[c] = 456;

    console.log(a[b]);
    `,
    answer: 'b',
    a: '123',
    b: '456',
    c: 'undefined',
    d: 'ReferenceError',
    explanation: `
    Object keys are automatically converted into strings. We are trying to set an object as a key to object a, with the value of 123.

    However, when we stringify an object, it becomes "[object Object]". So what we are saying here, is that a["[object Object]"] = 123. Then, we can try to do the same again. c is another object that we are implicitly stringifying. So then, a["[object Object]"] = 456.

    Then, we log a[b], which is actually a["[object Object]"]. We just set that to 456, so it returns 456.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const foo = () => console.log('First');
    const bar = () => setTimeout(() => console.log('Second'));
    const baz = () => console.log('Third');
    
    bar();
    foo();
    baz();
    
    `,
    answer: 'b',
    a: 'First Second Third',
    b: 'First Third Second',
    c: 'Second First Third',
    d: 'Second Third First',
    explanation: `
    We have a setTimeout function and invoked it first. Yet, it was logged last.

    This is because in browsers, we don't just have the runtime engine, we also have something called a WebAPI. The WebAPI gives us the setTimeout function to start with, and for example the DOM.

    After the callback is pushed to the WebAPI, the setTimeout function itself (but not the callback!) is popped off the stack.

    Now, foo gets invoked, and "First" is being logged.

    foo is popped off the stack, and baz gets invoked. "Third" gets logged.

    The WebAPI can't just add stuff to the stack whenever it's ready. Instead, it pushes the callback function to something called the queue.

    This is where an event loop starts to work. An event loop looks at the stack and task queue. If the stack is empty, it takes the first thing on the queue and pushes it onto the stack.

    bar gets invoked, "Second" gets logged, and it's popped off the stack.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What is the event.target when clicking the button?',
    questionText: `
    <div onclick="console.log('first div')">
      <div onclick="console.log('second div')">
        <button onclick="console.log('button')">
          Click!
        </button>
      </div>
    </div>
    `,
    answer: 'c',
    a: 'Outer div',
    b: 'Inner div',
    c: 'button',
    d: 'An array of all nested elements',
    explanation: `
    The deepest nested element that caused the event is the target of the event. You can stop bubbling by event.stopPropagation
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'When you click the paragraph, what\'s the logged output?',
    questionText: `
    <div onclick="console.log('div')">
      <p onclick="console.log('p')">
        Click here!
      </p>
    </div>
    `,
    answer: 'a',
    a: 'p div',
    b: 'div p',
    c: 'p',
    d: 'div',
    explanation: `
    If we click p, we see two logs: p and div. During event propagation, there are 3 phases: capturing, target, and bubbling. By default, event handlers are executed in the bubbling phase (unless you set useCapture to true). It goes from the deepest nested element outwards.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const person = { name: 'Lydia' };

    function sayHi(age) {
      return \`\${this.name} is \${age}\`;
    }

    console.log(sayHi.call(person, 21));
    console.log(sayHi.bind(person, 21));
    `,
    answer: 'd',
    a: 'undefined is 21 Lydia is 21',
    b: 'function function',
    c: 'Lydia is 21 Lydia is 21',
    d: 'Lydia is 21 function',
    explanation: `
    With both, we can pass the object to which we want the this keyword to refer to. However, .call is also executed immediately!

    .bind. returns a copy of the function, but with a bound context! It is not executed immediately.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function sayHi() {
      return (() => 0)();
    }
    
    console.log(typeof sayHi());
    `,
    answer: 'b',
    a: '"object"',
    b: '"number"',
    c: '"function"',
    d: '"undefined"',
    explanation: `
    The sayHi function returns the returned value of the immediately invoked function expression (IIFE). This function returned 0, which is type "number".

    FYI: there are only 7 built-in types: null, undefined, boolean, number, string, object, and symbol. "function" is not a type, since functions are objects, it's of type "object".
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'Which of these values are falsy?',
    questionText: `
    0;
    new Number(0);
    ('');
    (' ');
    new Boolean(false);
    undefined;
    `,
    answer: 'a',
    a: '0, \'\', undefined',
    b: '0, new Number(0), \'\', new Boolean(false), undefined',
    c: '0, \'\', new Boolean(false), undefined',
    d: 'All of them are falsy',
    explanation: `
    There are 8 falsy values:

    undefined
    null
    NaN
    false
    '' (empty string)
    0
    -0
    0n (BigInt(0))

    Function constructors, like new Number and new Boolean, are truthy.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    console.log(typeof typeof 1);
    `,
    answer: 'b',
    a: '"number"',
    b: '"string"',
    c: '"object"',
    d: '"undefined"',
    explanation: `
    typeof 1 returns "number". typeof "number" returns "string"
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const numbers = [1, 2, 3];
    numbers[10] = 11;
    console.log(numbers);
    `,
    answer: 'c',
    a: '[1, 2, 3, 7 x null, 11]',
    b: '[1, 2, 3, 11]',
    c: '[1, 2, 3, 7 x empty, 11]',
    d: 'SyntaxError',
    explanation: `
    When you set a value to an element in an array that exceeds the length of the array, JavaScript creates something called "empty slots". These actually have the value of undefined, but you will see something like:

    [1, 2, 3, 7 x empty, 11]

    depending on where you run it (it's different for every browser, node, etc.)
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    (() => {
      let x, y;
      try {
        throw new Error();
      } catch (x) {
        (x = 1), (y = 2);
        console.log(x);
      }
      console.log(x);
      console.log(y);
    })();
    `,
    answer: 'a',
    a: '1 undefined 2',
    b: 'undefined undefined undefined',
    c: '1 1 2',
    d: '1 undefined undefined',
    explanation: `
    The catch block receives the argument x. This is not the same x as the variable when we pass arguments. This variable x is block-scoped.

    Later, we set this block-scoped variable equal to 1, and set the value of the variable y. Now, we log the block-scoped variable x, which is equal to 1.

    Outside of the catch block, x is still undefined, and y is 2. When we want to console.log(x) outside of the catch block, it returns undefined, and y returns 2.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'Select the best answer.',
    questionText: 'Everything in JavaScript is either a...',
    answer: 'a',
    a: 'primitive or object',
    b: 'function or object',
    c: 'trick question! only objects',
    d: 'number or object',
    explanation: `
    JavaScript only has primitive types and objects.

  Primitive types are boolean, null, undefined, bigint, number, string, and symbol.
  
  What differentiates a primitive from an object is that primitives do not have any   properties or methods; however, you'll note that 'foo'.toUpperCase() evaluates to 'FOO' and does not result in a TypeError. This is because when you try to access a property or method on a primitive like a string, JavaScript will implicitly wrap the primitive type using one of the wrapper classes, i.e. String, and then immediately discard the wrapper after the expression evaluates. All primitives except for null and undefined exhibit this behaviour.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    [[0, 1], [2, 3]].reduce(
      (acc, cur) => {
        return acc.concat(cur);
      },
      [1, 2],
    );
    `,
    answer: 'c',
    a: '[0, 1, 2, 3, 1, 2]',
    b: '[6, 1, 2]',
    c: '[1, 2, 0, 1, 2, 3]',
    d: '[1, 2, 6]',
    explanation: `
    [1, 2] is our initial value. This is the value we start with, and the value of the very first acc. During the first round, acc is [1,2], and cur is [0, 1]. We concatenate them, which results in [1, 2, 0, 1].
    
    Then, [1, 2, 0, 1] is acc and [2, 3] is cur. We concatenate them, and get [1, 2, 0, 1, 2, 3]
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    !!null;
    !!'';
    !!1;
    `,
    answer: 'b',
    a: 'false true false',
    b: 'false false true',
    c: 'false true true',
    d: 'true true false',
    explanation: `
    null is falsy. !null returns true. !true returns false.

    "" is falsy. !"" returns true. !true returns false.

    1 is truthy. !1 returns false. !false returns true.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What does the setInterval method return in the browser?',
    questionText: `
    setInterval(() => console.log('Hi'), 1000);
    `,
    answer: 'a',
    a: 'a unique id',
    b: 'the amount of milliseconds specified',
    c: 'the passed function',
    d: 'undefined',
    explanation: `
    It returns a unique id. This id can be used to clear that interval with the clearInterval() function.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What does this return?',
    questionText: `
    [...'Lydia'];
    `,
    answer: 'a',
    a: '["L", "y", "d", "i", "a"]',
    b: '["Lydia"]',
    c: '[[], "Lydia"]',
    d: '[["L", "y", "d", "i", "a"]]',
    explanation: `
    A string is an iterable. The spread operator maps every character of an iterable to one element.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function* generator(i) {
      yield i;
      yield i * 2;
    }
    
    const gen = generator(10);
    
    console.log(gen.next().value);
    console.log(gen.next().value);
    `,
    answer: 'c',
    a: '[0, 10], [10, 20]',
    b: '20, 20',
    c: '10, 20',
    d: '0, 10 and 10, 20',
    explanation: `
    Regular functions cannot be stopped mid-way after invocation. However, a generator function can be "stopped" midway, and later continue from where it stopped. Every time a generator function encounters a yield keyword, the function yields the value specified after it. Note that the generator function in that case doesn’t return the value, it yields the value.

    First, we initialize the generator function with i equal to 10. We invoke the generator function using the next() method. The first time we invoke the generator function, i is equal to 10. It encounters the first yield keyword: it yields the value of i. The generator is now "paused", and 10 gets logged.

    Then, we invoke the function again with the next() method. It starts to continue where it stopped previously, still with i equal to 10. Now, it encounters the next yield keyword, and yields i * 2. i is equal to 10, so it returns 10 * 2, which is 20. This results in 10, 20.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What does this return?',
    questionText: `
    const firstPromise = new Promise((res, rej) => {
      setTimeout(res, 500, 'one');
    });
    
    const secondPromise = new Promise((res, rej) => {
      setTimeout(res, 100, 'two');
    });
    
    Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
    `,
    answer: 'b',
    a: '"one"',
    b: '"two"',
    c: '"two" "one"',
    d: '"one" "two"',
    explanation: `
    When we pass multiple promises to the Promise.race method, it resolves/rejects the first promise that resolves/rejects. To the setTimeout method, we pass a timer: 500ms for the first promise (firstPromise), and 100ms for the second promise (secondPromise). This means that the secondPromise resolves first with the value of 'two'. res now holds the value of 'two', which gets logged.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    let person = { name: 'Lydia' };
    const members = [person];
    person = null;

    console.log(members);
    `,
    answer: 'd',
    a: 'null',
    b: '[null]',
    c: '[{}]',
    d: '[{ name: "Lydia" }]',
    explanation: `
    First, we declare a variable person with the value of an object that has a name property.

    Then, we declare a variable called members. We set the first element of that array equal to the value of the person variable. Objects interact by reference when setting them equal to each other. When you assign a reference from one variable to another, you make a copy of that reference. (note that they don't have the same reference!)

    Then, we set the variable person equal to null.

    We are only modifying the value of the person variable, and not the first element in the array, since that element has a different (copied) reference to the object. The first element in members still holds its reference to the original object. When we log the members array, the first element still holds the value of the object, which gets logged.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const person = {
      name: 'Lydia',
      age: 21,
    };
    
    for (const item in person) {
      console.log(item);
    }
    `,
    answer: 'b',
    a: '{ name: "Lydia" }, { age: 21 }',
    b: '"name", "age"',
    c: '"Lydia", 21',
    d: '["name", "Lydia"], ["age", 21]',
    explanation: `
    With a for-in loop, we can iterate through object keys, in this case name and age. Under the hood, object keys are strings (if they're not a Symbol). On every loop, we set the value of item equal to the current key it’s iterating over. First, item is equal to name, and gets logged. Then, item is equal to age, which gets logged.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    console.log(3 + 4 + '5');
    `,
    answer: 'b',
    a: '"345"',
    b: '"75"',
    c: '12',
    d: '"12"',
    explanation: `
    Operator associativity is the order in which the compiler evaluates the expressions, either left-to-right or right-to-left. This only happens if all operators have the same precedence. We only have one type of operator: +. For addition, the associativity is left-to-right.

    3 + 4 gets evaluated first. This results in the number 7.

    7 + '5' results in "75" because of coercion. JavaScript converts the number 7 into a string, see question 15. We can concatenate two strings using the +operator. "7" + "5" results in "75".
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the value of num?',
    questionText: `
    const num = parseInt('7*6', 10);
    `,
    answer: 'c',
    a: '42',
    b: '"42"',
    c: '7',
    d: 'NaN',
    explanation: `
    Only the first numbers in the string is returned. Based on the radix (the second argument in order to specify what type of number we want to parse it to: base 10, hexadecimal, octal, binary, etc.), the parseInt checks whether the characters in the string are valid. Once it encounters a character that isn't a valid number in the radix, it stops parsing and ignores the following characters.

    * is not a valid number. It only parses "7" into the decimal 7. num now holds the value of 7.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    [1, 2, 3].map(num => {
      if (typeof num === 'number') return;
      return num * 2;
    });
    `,
    answer: 'c',
    a: '[]',
    b: '[null, null, null]',
    c: '[undefined, undefined, undefined]',
    d: '[ 3 x empty ]',
    explanation: `
    When mapping over the array, the value of num is equal to the element it’s currently looping over. In this case, the elements are numbers, so the condition of the if statement typeof num === "number" returns true. The map function creates a new array and inserts the values returned from the function.

    However, we don’t return a value. When we don’t return a value from the function, the function returns undefined. For every element in the array, the function block gets called, so for each element we return undefined.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function getInfo(member, year) {
      member.name = 'Lydia';
      year = '1998';
    }
    
    const person = { name: 'Sarah' };
    const birthYear = '1997';
    
    getInfo(person, birthYear);
    
    console.log(person, birthYear);
    `,
    answer: 'a',
    a: '{ name: "Lydia" }, "1997"',
    b: '{ name: "Sarah" }, "1998"',
    c: '{ name: "Lydia" }, "1998"',
    d: '{ name: "Sarah" }, "1997"',
    explanation: `
    Arguments are passed by value, unless their value is an object, then they're passed by reference. birthYear is passed by value, since it's a string, not an object. When we pass arguments by value, a copy of that value is created (see question 46).

    The variable birthYear has a reference to the value "1997". The argument year also has a reference to the value "1997", but it's not the same value as birthYear has a reference to. When we update the value of year by setting year equal to "1998", we are only updating the value of year. birthYear is still equal to "1997".

    The value of person is an object. The argument member has a (copied) reference to the same object. When we modify a property of the object member has a reference to, the value of person will also be modified, since they both have a reference to the same object. person's name property is now equal to the value "Lydia"
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function greeting() {
      throw 'Hello world!';
    }
    
    function sayHi() {
      try {
        const data = greeting();
        console.log('It worked!', data);
      } catch (e) {
        console.log('Oh no an error:', e);
      }
    }
    
    sayHi();
    `,
    answer: 'd',
    a: 'It worked! Hello world!',
    b: 'Oh no an error: undefined',
    c: 'SyntaxError: can only throw Error objects',
    d: 'Oh no an error: Hello world!',
    explanation: `
    With the throw statement, we can create custom errors. With this statement, you can throw exceptions. An exception can be a string, a number, a boolean or an object. In this case, our exception is the string 'Hello world!'.

    With the catch statement, we can specify what to do if an exception is thrown in the try block. An exception is thrown: the string 'Hello world!'. e is now equal to that string, which we log. This results in 'Oh an error: Hello world!'.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    function Car() {
      this.make = 'Lamborghini';
      return { make: 'Maserati' };
    }
    
    const myCar = new Car();
    console.log(myCar.make);
    `,
    answer: 'b',
    a: '"Lamborghini"',
    b: '"Maserati"',
    c: 'ReferenceError',
    d: 'TypeError',
    explanation: `
    When you return a property, the value of the property is equal to the returned value, not the value set in the constructor function. We return the string "Maserati", so myCar.make is equal to "Maserati".
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    (() => {
      let x = (y = 10);
    })();
    
    console.log(typeof x);
    console.log(typeof y);
    `,
    answer: 'a',
    a: '"undefined", "number"',
    b: '"number", "number"',
    c: '"object", "number"',
    d: '"number", "undefined"',
    explanation: `
    let x = (y = 10); is actually shorthand for:

    y = 10;
    let x = y;

    When we set y equal to 10, we actually add a property y to the global object (window in browser, global in Node). In a browser, window.y is now equal to 10.

    Then, we declare a variable x with the value of y, which is 10. Variables declared with the let keyword are block scoped, they are only defined within the block they're declared in; the immediately invoked function expression (IIFE) in this case. When we use the typeof operator, the operand x is not defined: we are trying to access x outside of the block it's declared in. This means that x is not defined. Values who haven't been assigned a value or declared are of type "undefined". console.log(typeof x) returns "undefined".

    However, we created a global variable y when setting y equal to 10. This value is accessible anywhere in our code. y is defined, and holds a value of type "number". console.log(typeof y) returns "number".
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    class Dog {
      constructor(name) {
        this.name = name;
      }
    }
    
    Dog.prototype.bark = function() {
      console.log(\`Woof I am \${this.name}\`);
    };
    
    const pet = new Dog('Mara');
    
    pet.bark();
    
    delete Dog.prototype.bark;
    
    pet.bark();
    `,
    answer: 'a',
    a: '"Woof I am Mara", TypeError',
    b: '"Woof I am Mara", "Woof I am Mara"',
    c: '"Woof I am Mara", undefined',
    d: 'TypeError, TypeError',
    explanation: `
    We can delete properties from objects using the delete keyword, also on the prototype. By deleting a property on the prototype, it is not available anymore in the prototype chain. In this case, the bark function is not available anymore on the prototype after delete Dog.prototype.bark, yet we still try to access it.

    When we try to invoke something that is not a function, a TypeError is thrown. In this case TypeError: pet.bark is not a function, since pet.bark is undefined.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const set = new Set([1, 1, 2, 3, 4]);

    console.log(set);
    `,
    answer: 'd',
    a: '[1, 1, 2, 3, 4]',
    b: '[1, 2, 3, 4]',
    c: '{1, 1, 2, 3, 4}',
    d: '{1, 2, 3, 4}',
    explanation: `
    The Set object is a collection of unique values: a value can only occur once in a set.

    We passed the iterable [1, 1, 2, 3, 4] with a duplicate value 1. Since we cannot have two of the same values in a set, one of them is removed. This results in {1, 2, 3, 4}.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    // counter.js
    let counter = 10;
    export default counter;

    // index.js
    import myCounter from './counter';

    myCounter += 1;

    console.log(myCounter);
    `,
    answer: 'c',
    a: '10',
    b: '11',
    c: 'Error',
    d: 'NaN',
    explanation: `
    An imported module is read-only: you cannot modify the imported module. Only the module that exports them can change its value.

    When we try to increment the value of myCounter, it throws an error: myCounter is read-only and cannot be modified.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const name = 'Lydia';
    age = 21;

    console.log(delete name);
    console.log(delete age);
    `,
    answer: 'a',
    a: 'false, true',
    b: '"Lydia", 21',
    c: 'true, true',
    d: 'undefined, undefined',
    explanation: `
    The delete operator returns a boolean value: true on a successful deletion, else it'll return false. However, variables declared with the var, const or let keyword cannot be deleted using the delete operator.

    The name variable was declared with a const keyword, so its deletion is not successful: false is returned. When we set age equal to 21, we actually added a property called age to the global object. You can successfully delete properties from objects this way, also the global object, so delete age returns true.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const numbers = [1, 2, 3, 4, 5];
    const [y] = numbers;

    console.log(y);
    `,
    answer: 'c',
    a: '[[1, 2, 3, 4, 5]]',
    b: '[1, 2, 3, 4, 5]',
    c: '1',
    d: '[1]',
    explanation: `
    We can unpack values from arrays or properties from objects through destructuring. For example:

    [a, b] = [1, 2];

    The value of a is now 1, and the value of b is now 2. What we actually did in the question, is:

    [y] = [1, 2, 3, 4, 5];

    This means that the value of y is equal to the first value in the array, which is the number 1. When we log y, 1 is returned.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const user = { name: 'Lydia', age: 21 };
    const admin = { admin: true, ...user };

    console.log(admin);
    `,
    answer: 'b',
    a: '{ admin: true, user: { name: "Lydia", age: 21 } }',
    b: '{ admin: true, name: "Lydia", age: 21 }',
    c: '{ admin: true, user: ["Lydia", 21] }',
    d: '{ admin: true }',
    explanation: `
    It's possible to combine objects using the spread operator .... It lets you create copies of the key/value pairs of one object, and add them to another object. In this case, we create copies of the user object, and add them to the admin object. The admin object now contains the copied key/value pairs, which results in { admin: true, name: "Lydia", age: 21 }.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const person = { name: 'Lydia' };

    Object.defineProperty(person, 'age', { value: 21 });

    console.log(person);
    console.log(Object.keys(person));
    `,
    answer: 'b',
    a: '{ name: "Lydia", age: 21 }, ["name", "age"]',
    b: '{ name: "Lydia", age: 21 }, ["name"]',
    c: '{ name: "Lydia"}, ["name", "age"]',
    d: '{ name: "Lydia"}, ["age"]',
    explanation: `
    With the defineProperty method, we can add new properties to an object, or modify existing ones. When we add a property to an object using the defineProperty method, they are by default not enumerable. The Object.keys method returns all enumerable property names from an object, in this case only "name".

    Properties added using the defineProperty method are immutable by default. You can override this behavior using the writable, configurable and enumerable properties. This way, the defineProperty method gives you a lot more control over the properties you're adding to an object.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const settings = {
      username: 'lydiahallie',
      level: 19,
      health: 90,
    };
    
    const data = JSON.stringify(settings, ['level', 'health']);
    console.log(data);
    `,
    answer: 'a',
    a: '"{"level":19, "health":90}"',
    b: '"{"username": "lydiahallie"}"',
    c: '"["level", "health"]"',
    d: '"{"username": "lydiahallie", "level":19, "health":90}"',
    explanation: `
    The second argument of JSON.stringify is the replacer. The replacer can either be a function or an array, and lets you control what and how the values should be stringified.

    If the replacer is an array, only the property names included in the array will be added to the JSON string. In this case, only the properties with the names "level" and "health" are included, "username" is excluded. data is now equal to "{"level":19, "health":90}".

    If the replacer is a function, this function gets called on every property in the object you're stringifying. The value returned from this function will be the value of the property when it's added to the JSON string. If the value is undefined, this property is excluded from the JSON string.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    let num = 10;
    
    const increaseNumber = () => num++;
    const increasePassedNumber = number => number++;
    
    const num1 = increaseNumber();
    const num2 = increasePassedNumber(num1);
    
    console.log(num1);
    console.log(num2);
    `,
    answer: 'a',
    a: '10, 10',
    b: '10, 11',
    c: '11, 11',
    d: '11, 12',
    explanation: `
    The unary operator ++ first returns the value of the operand, then increments the value of the operand. The value of num1 is 10, since the increaseNumber function first returns the value of num, which is 10, and only increments the value of num afterwards.

    num2 is 10, since we passed num1 to the increasePassedNumber. number is equal to 10(the value of num1. Again, the unary operator ++ first returns the value of the operand, then increments the value of the operand. The value of number is 10, so num2 is equal to 10.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const value = { number: 10 };

    const multiply = (x = { ...value }) => {
      console.log((x.number *= 2));
    };

    multiply();
    multiply();
    multiply(value);
    multiply(value);
    `,
    answer: 'c',
    a: '20, 40, 80, 160',
    b: '20, 40, 20, 40',
    c: '20, 20, 20, 40',
    d: 'NaN, NaN, 20, 40',
    explanation: `
    In ES6, we can initialize parameters with a default value. The value of the parameter will be the default value, if no other value has been passed to the function, or if the value of the parameter is "undefined". In this case, we spread the properties of the value object into a new object, so x has the default value of { number: 10 }.
    
    The default argument is evaluated at call time! Every time we call the function, a new object is created. We invoke the multiply function the first two times without passing a value: x has the default value of { number: 10 }. We then log the multiplied value of that number, which is 20.

    The third time we invoke multiply, we do pass an argument: the object called value. The *= operator is actually shorthand for x.number = x.number * 2: we modify the value of x.number, and log the multiplied value 20.

    The fourth time, we pass the value object again. x.number was previously modified to 20, so x.number *= 2 logs 40.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    [1, 2, 3, 4].reduce((x, y) => console.log(x, y));
    `,
    answer: 'd',
    a: '1 2 and 3 3 and 6 4',
    b: '1 2 and 2 3 and 3 4',
    c: '1 undefined and 2 undefined and 3 undefined and 4 undefined',
    d: '1 2 and undefined 3 and undefined 4',
    explanation: `
    The first argument that the reduce method receives is the accumulator, x in this case. The second argument is the current value, y. With the reduce method, we execute a callback function on every element in the array, which could ultimately result in one single value.

    In this example, we are not returning any values, we are simply logging the values of the accumulator and the current value.

    The value of the accumulator is equal to the previously returned value of the callback function. If you don't pass the optional initialValue argument to the reduce method, the accumulator is equal to the first element on the first call.

    On the first call, the accumulator (x) is 1, and the current value (y) is 2. We don't return from the callback function, we log the accumulator and current value: 1 and 2 get logged.

    If you don't return a value from a function, it returns undefined. On the next call, the accumulator is undefined, and the current value is 3. undefined and 3 get logged.

    On the fourth call, we again don't return from the callback function. The accumulator is again undefined, and the current value is 4. undefined and 4 get logged.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'With which constructor can we successfully extend the Dog class?',
    questionText: `
    class Dog {
      constructor(name) {
        this.name = name;
      }
    };
    
    class Labrador extends Dog {
      // 1
      constructor(name, size) {
        this.size = size;
      }
      // 2
      constructor(name, size) {
        super(name);
        this.size = size;
      }
      // 3
      constructor(size) {
        super(name);
        this.size = size;
      }
      // 4
      constructor(name, size) {
        this.name = name;
        this.size = size;
      }
    
    };
    `,
    answer: 'b',
    a: '1',
    b: '2',
    c: '3',
    d: '4',
    explanation: `
    In a derived class, you cannot access the this keyword before calling super. If you try to do that, it will throw a ReferenceError: 1 and 4 would throw a reference error.

    With the super keyword, we call that parent class's constructor with the given arguments. The parent's constructor receives the name argument, so we need to pass name to super.

    The Labrador class receives two arguments, name since it extends Dog, and size as an extra property on the Labrador class. They both need to be passed to the constructor function on Labrador, which is done correctly using constructor 2.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    // index.js
    console.log('running index.js');
    import { sum } from './sum.js';
    console.log(sum(1, 2));

    // sum.js
    console.log('running sum.js');
    export const sum = (a, b) => a + b;
    `,
    answer: 'b',
    a: 'running index.js, running sum.js, 3',
    b: 'running sum.js, running index.js, 3',
    c: 'running sum.js, 3, running index.js',
    d: 'running index.js, undefined, running sum.js',
    explanation: `
    With the import keyword, all imported modules are pre-parsed. This means that the imported modules get run first, the code in the file which imports the module gets executed after.

    This is a difference between require() in CommonJS and import! With require(), you can load dependencies on demand while the code is being run. If we would have used require instead of import, running index.js, running sum.js, 3 would have been logged to the console.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    console.log(Number(2) === Number(2));
    console.log(Boolean(false) === Boolean(false));
    console.log(Symbol('foo') === Symbol('foo'));
    `,
    answer: 'a',
    a: 'true, true, true',
    b: 'false, true, false',
    c: 'true, false, true',
    d: 'true, true, true',
    explanation: `
    Every Symbol is entirely unique. The purpose of the argument passed to the Symbol is to give the Symbol a description. The value of the Symbol is not dependent on the passed argument. As we test equality, we are creating two entirely new symbols: the first Symbol('foo'), and the second Symbol('foo'). These two values are unique and not equal to each other, Symbol('foo') === Symbol('foo') returns false.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    const name = 'Lydia Hallie';
    console.log(name.padStart(13));
    console.log(name.padStart(2));
    `,
    answer: 'c',
    a: '"Lydia Hallie", "Lydia Hallie"',
    b: '" Lydia Hallie", " Lydia Hallie" ("[13x whitespace]Lydia Hallie", "[2x whitespace]Lydia Hallie")',
    c: '" Lydia Hallie", "Lydia Hallie" ("[1x whitespace]Lydia Hallie", "Lydia Hallie")',
    d: '"Lydia Hallie", "Lyd",',
    explanation: `
    With the padStart method, we can add padding to the beginning of a string. The value passed to this method is the total length of the string together with the padding. The string "Lydia Hallie" has a length of 12. name.padStart(13) inserts 1 space at the start of the string, because 12 + 1 is 13.

    If the argument passed to the padStart method is smaller than the length of the array, no padding will be added.
  `,
    language: 'JavaScript'
  },
  {
    level: 1,
    questionTitle: 'What\'s the output?',
    questionText: `
    console.log('🥑' + '💻');
    `,
    answer: 'a',
    a: '"🥑💻"',
    b: '257548',
    c: 'A string containing their code points',
    d: 'Error',
    explanation: `
    With the + operator, you can concatenate strings. In this case, we are concatenating the string "🥑" with the string "💻", resulting in "🥑💻".
  `,
    language: 'JavaScript'
  },
];

