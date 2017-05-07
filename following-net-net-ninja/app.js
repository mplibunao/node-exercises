var stuff = require('./stuff');
var events = require('events');
var util = require('util');

//console.log(stuff.counter(['My name is', 'Mark', 'Paolo']));
//console.log(stuff.adder(5,3));
//console.log(stuff.adder(stuff.pi, 3));

/*
var myEmitter = new events.EventEmitter();
myEmitter.on("someEvent", function(msg){
  console.log(msg);
});

myEmitter.emit('someEvent', 'The event has been emitted');
*/

var Person = function(name){
    this.name = name;
}

/* Same things as var myEmitter = new events.EventEmitter() except this is dynamic
and uses inheritance. Ew at the classical OOP style though
*/
util.inherits(Person, events.EventEmitter);

var james = new Person('james');
var mary = new Person('mary');
var ryu = new Person('ryu');
var people = [james, mary, ryu];

// Attaches event "Event listener" or event emitter
people.map(function(person){
  person.on("speak", function(msg){
      console.log(`${person.name} said: ${msg}`);
  });
});

// Emits the event
james.emit('speak', "Sup niggah");
