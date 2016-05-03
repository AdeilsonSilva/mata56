---
layout: lisp
title:  "Currying: exercícios"
date:   2016-03-16 16:40:00 -0300
categories: aula
---

```javascript
// Crie um arquivo HTML que importa a biblioteca Ramda
// <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/ramda/0.19.1/ramda.min.js"></script>

// Exercício 1
//==============
// Refatore o código para remover todos os argumentos através da aplicação parcial da função

var words = function(str) {
  return R.split(' ', str);
};

//Ex 1 Answer
words = R.split(' ');
console.log(words("oi oi mae ioio"));

// Exercício 1a
//==============
// Use map para criar uma nova função que funciona com um array de strings

wordsInArray = R.map(R.split(' '));
console.log(wordsInArray(["oi oi mae ioio", "Should Hane Known Better"]));


// Exercício 2
//==============
// Refatore para remover todos os argumentos através da aplicação parcial das funções

var filterQs = function(xs) {
  return R.filter(function(x) {
    return R.match(/q/i, x).length > 0;
  }, xs);
};

//Ex 2 Answer
var matchQs = R.match(/q/i);
var filterQs = R.filter(x => matchQs(x).length > 0);

// Exercício 3
//==============
// Use a função auxiliar _mantemMaior para refatorar max para não referenciar nenhum argumento

// deixe como está:
var _mantemMaior = function(x, y) {
  return x >= y ? x : y;
};

// refatore este:
var max = function(xs) {
  return R.reduce(function(acc, x) {
    return _mantemMaior(acc, x);
  }, -Infinity, xs);
};

// Ex 3 Answer
var max = R.reduce(_mantemMaior, -Infinity);


// baseado em https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch4.html
```
