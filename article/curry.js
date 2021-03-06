function sub_curry(fn) {
    var args = Array.prototype.slice.call(arguments, 1);
    return function () {
        return fn.call(this, ...args.concat(Array.prototype.slice.call(arguments)))
    }
}

// function test(a,b) {
//     return [a,b]
// }
// console.log(curry(test, 1)(3))
// console.log(curry(test, 1, 3)())
// console.log(curry(test)(1, 3))

// function curry(fn) {
//     var args = Array.prototype.slice.call(arguments, 1);
//     return function () {
//         return fn.call(this, ...args.concat(Array.prototype.slice.call(arguments)))
//     }
// }
function curry(fn, length) {
    length = length || fn.length;
    var slice = Array.prototype.slice;
    return function () {
        if (arguments.length < length)  {
            let combined = [fn].concat(slice.call(arguments))
            return curry(sub_curry.apply(this, combined), length - arguments.length)
        } else {
            return fn.call(this, ...arguments)
        }
    }
}
var fn = curry(function(a, b, c) {
    return [a, b, c];
});

console.log(fn("a", "b", "c")) // ["a", "b", "c"]
console.log(fn("a", "b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b")("c")) // ["a", "b", "c"]
console.log(fn("a")("b", "c")) // ["a", "b", "c"]
console.log(fn("a")("b", "c", 'd'))


var curry = fn =>
    judge = (...args) =>
        args.length === fn.length
            ? fn(...args)
            : (...arg) => judge(...args, ...arg)