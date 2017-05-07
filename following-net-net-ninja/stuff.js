module.exports.counter = function(arr){
  return "There are " + arr.length + " elements in this array";
};

var adder = function(a,b){
  return `The sum of two numbers is ${a+b}`;
};

var pi = 3.142;

// needs to be after the actual values you want to export
module.exports.adder = adder;
module.exports.pi = pi;

/* You can also use an Object literal notation which the same as above

  module.export = {
    counter: counter,
    adder: adder,
    pi: pi
}
*/
