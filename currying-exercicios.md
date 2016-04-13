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

// Exercício 1a
//==============
// Use map para criar uma nova função que funciona com um array de strings

var sentences = undefined;


// Exercício 2
//==============
// Refatore para remover todos os argumentos através da aplicação parcial das funções

var filterQs = function(xs) {
  return R.filter(function(x) {
    return R.match(/q/i, x).length > 0;
  }, xs);
};


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


// baseado em https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch4.html
```
