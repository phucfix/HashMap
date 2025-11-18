import HashMap from "./hashmap.js";

const test = new HashMap();
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

// Test
//console.log(test.get(''));
//console.log(test.get('frog'));
//console.log(test.has('frog'));
//console.log(test.remove('frog'));
//console.log(test.length());
//console.log(test.keys());
//console.log(test.values());
test.clear();
console.log(test.entries());

