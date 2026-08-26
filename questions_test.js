/* JS interview questions */

// const arr = [1,2,3,4]
// const result = arr.map(e => {
//     return e>2
// })
// const fResult = arr.filter(e => {
//     return e>2
// })
// console.log(result)
// console.log(fResult)


/*  Function Currying */
// function sum(a) {
//     return function (b) {
//         return function (c) {
//             // if (b === undefined) return a
//             return a+b+c
//         }
//     }
// }

// const r = sum(1)(2)(3)
// console.log(r)


/*  Function infinite Currying */
// function sum(a) {
//     return function (b) {
//         if (b === undefined) return a
//         return sum(a+b)
//     }
// }
// const r = sum(1)(2)(3)(4)
// console.log(r)


/* Function infinite Currying */
// function sum(a) {
//     const fn = (b) => sum(a+b)
//     fn.valueOf = () => a
//     fn.toString = () => a
//     return fn
// }

// const r = sum(1)(2)(3)
// console.log(String(r))
// console.log(r)
// console.log(`${r}`)
// console.log(r+0)

// // Se llama cuando se ejecuta el algoritmo de conversión a primitivo, y valueOf se llama cuando es un número el "hint" como en r+0:
// // Algoritmo de conversión a primitivo (ToPrimitive) según el "hint":
// //  Hint: "number", Orden de intento: valueOf() > si falla, toString()
// //  Hint: "string", Orden de intento: toString() > si falla, valueOf()
// //  Hint: "default", Orden de intento: valueOf() > si falla, toString()


/* Array destructuring with valueOf coercion OR infinite currying with implicit coercion*/
// const arr = [1,2,3,4]
// // const [a,b] = arr
// // console.log(a,b)
// // const [a,,c] = arr
// // console.log(a,b)
// const [a, ...rest] = arr
// console.log(a,rest)


/* Object Destructuring */
// const obj = { nombre: 'Antoni', edad: '30', ciudad: 'Barcelona'}
// // const { nombre, edad } = obj
// // console.log(nombre, edad)
// const { nombre: name } = obj
// console.log(name)
// console.log(obj) // No hay mutación de key


/* What is PollyFill */
/* What is temoral dead zone */
/* What is weak map and weak set */

/* How to merge 2 objects */
// const obj1 = { name: 'Antoni', b: 2 };
// const obj2 = { name: 3, b: 4 };

// const merged = { ...obj1, ...obj2 };
// console.log(merged); // { name: 3, b: 4 } (un objeto no puede tenre 2 keys iguales, deben de ser únicas y siempre se mantiene la última key igual encontrada y las demás se eliminan)

/* Can you tell me a bout the rest parameters? */
/* An exercise for knowing the difference between var, let y const in scope and memory heap (it stores reference or it's a value in the stack directly?) */

/* Agrupación de objetos dado un array */
// const people = [
//     { name: 'Antoni', age: 28},
//     { name: 'asd', age: 28},
//     { name: 'd', age: 28}
// ]
// const g = Object.groupBy(people, person => person.name)
// console.log(g)





/* HTML interview questions */

//  Can you tell me about HTML layout structure
// Difference between figure tag and image tag
// What is image map in HTML
// Difference between link tag and anchor tag
// Differences between in line level element and in block level element (position in css)
// what are the void elements in HTML
// Difference between em tag and i tag
// Difference betwwen bold tagn and strong tag


/*  CSS interview questions */

// What Universal tag does (asterisk tag) (it applies to every element of teh html)
// What are the types of selector available in CSS
// And what are the priorities
// Does universal selector have more priority than class selector? (class selector overrates universal selector)
// Tell me the various positioning properties
// What are CSS counters
// How can we hide the elements in css?
// han can we vertically centere a text in css?