---
layout: lisp
title:  "Currying"
date:   2016-03-14 16:40:00 -0300
categories: aula
---

# Programação funcional

## Currying

**Currying** é o processo de transformar uma função que espera vários argumentos em uma que, quando chamada com menos argumentos, retorna uma nova função que recebe os argumentos restantes. Nesse contexto, **aplicação parcial** de uma função que sofreu currying é o ato de chamar a função passando menos argumentos, obtendo como resultado uma outra função.

Por exemplo, considere a função `produto`:

```javascript
function produto(a, b) {
    return a * b;
}
```

Do jeito que a função está definida, não faz sentido realizar uma aplicação parcial:

<div class="lesson">
<textarea class="code">
function produto(a, b) {
    return a * b;
}
var dobro = produto(2);
alert(dobro);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

A chamada `produto(2)` equivale à chamada `produto(2, undefined)`, resultado na multiplicação `2 * undefined`, cujo resultado é `NaN` (not a number).

Uma versão **curried** da função (i.e., função resultante do currying) pode ser escrita usando-se *closures*:

<div class="lesson">
<textarea class="code">
function produto(a) {
    return function(b) {
        return a * b;
    };
}
var dobro = produto(2);
alert(dobro(8));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Vamos praticar? Considere a seguinte função de 3 argumentos, que calcula o valor de uma função de primeiro grau em determinado ponto:

<div class="lesson">
<textarea class="code">
function primeiroGrau(a, b, x) {
    return a * x + b;
}
// calcula f(42) para f(x) = 3*x + 2
alert(primeiroGrau(3, 2, 42));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Vamos escrever uma versão *curried* dessa função? Essa versão deve receber `a` e retornar uma função que recebe `b`, que retorna uma função que recebe `x` e retorna a resposta.

<div class="lesson">
<textarea class="code">
function primeiroGrauCurried(a) {
    return function(b) {
        // --- Escreva aqui seu código
        return ...;
        // ---
    };
}
var resultado = primeiroGrauCurried(3)(2)(42);
alert(resultado);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Dá pra ver que, na versao curried, a maneira de chamar a função fica diferente: usamos `(3)(2)(42)` em vez de `(3, 2, 42)`. Isso porque cada chamada exceto a última retorna uma função, e por precisamos fazer 3 chamadas em vez de uma.

A vantagem de escrever uma função *curried* é que fica mais fácil construir funções com base nas funções curried fixando alguns argumentos. Por exemplo, a função `celsiusParaFahrenheit` pode ser escrita assim:

<div class="lesson">
<textarea class="code">
var celsiusParaFahrenheit = primeiroGrauCurried(1.8)(32);
alert(celsiusParaFahrenheit(25));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { 
  function primeiroGrauCurried(a) {
    return function(b) {
      return function(x) {
        return a*x + b;
      };
    };
  };
  eval(str);
  return "OK";
}</pre>
<button class="go">Rodar</button>
</div>

Até agora nós realizamos o currying the funções de forma manual, reescrevendo o código das funções. Em algumas linguagens, como Haskell, todas as funções são curried (e, portanto, admitem aplicação parcial). Isso não acontece com Javascript, mas há bibliotecas capazes de realizar o currying de qualquer função.



A biblioteca [Ramda](http://ramdajs.com/) possui uma função, `curry`, que recebe uma função e retorna uma versão curried dessa função. Como um bônus, é possível passar mais de um argumento em cada chamada

<div class="lesson">
<textarea class="code">
function primeiroGrau(a, b, x) {
  return a * x + b;
}
var primeiroGrauCurried = R.curry(primeiroGrau);
var celsiusToFahrenreit = primeiroGrauCurried(1.8)(32);
// forma equivalente:
var celsiusToFahrenreit2 = primeiroGrauCurried(1.8, 32);
// chamada:
alert(celsiusToFahrenreit2(25));
// outro exemplo
alert(primeiroGrauCurried(1.8, 32)(25));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Currying é útil em conjunção de funções de alta ordem. Considere a função `arr.map(f)`, que retorna um array resultante da aplicação da função `f` a cada elemento de `arr`. A função `map` chama `f` passando um único argumento; como podemos então usar nossa função `primeiroGrau` para mapear elementos de um array? Usando currying:

<div class="lesson">
<textarea class="code">
function primeiroGrau(a, b, x) {
  return a * x + b;
}
var primeiroGrauCurried = R.curry(primeiroGrau);
var celsius = [10, 15, 20, 25, 30, 35];
var fahrenreit = celsius.map(primeiroGrauCurried(1.8, 32));
alert(fahrenreit);

// outra opção é usar a função `partial`, que faz aplicação
// parcial em qualquer função (mesmo que não tenha sido curried)
fahrenreit = celsius.map(R.partial(primeiroGrau, [1.8, 32]));
alert(fahrenreit);

</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Se você quer criar funções que podem ser curried, vale a pena pensar na ordem dos seus argumentos. O ideal é deixar concentrar os argumentos que tendem a ser fixados no início, e deixar os argumentos que variam mais no final da lista de argumentos. Note o exemplo da função `primeiroGrau(a, b, x)`: normalmente, quando chamamos a função várias, fixamos `a` e `b` e variamos `x`; por isso `x` foi colocado como último argumento.

## Composição de funções

(Baseado em https://medium.com/@collardeau/intro-to-functional-programming-concepts-in-javascript-b0650773139c e https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html)

<div class="lesson">
<textarea class="code">
function getPrimeiroNome(nomeCompleto) { return nomeCompleto.split(" ")[1]; }
function getPrimeiraLetra(string) { return string[0]; }
function getPrimeiraInicial(nome) { return getPrimeiraLetra(getPrimeiroNome(nome)); }
alert(getPrimeiraInicial("Sir Arthur Conan Doyle"));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Uma forma mais legível de escrever `getPrimeiraInicial` é usando a função de alta ordem `pipe` (da biblioteca Ramda), que realiza a composição de funções.

<div class="lesson">
<textarea class="code">
function getPrimeiroNome(nomeCompleto) { return nomeCompleto.split(" ")[1]; }
function getPrimeiraLetra(string) { return string[0]; }

var getPrimeiraInicial = R.pipe(getPrimeiroNome, getPrimeiraLetra);
alert(getPrimeiraInicial("Sir Arthur Conan Doyle"));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Esse estilo de programar é chamado de pointfree, pois a função `getPrimeiraInicial` é definida sem declarar quais são os seus parâmetros.

Agora é com você. Crie uma função para retornar a quantidade de elementos de um array cujo quadrado é ímpar. 

<div class="lesson">
<textarea class="code">
function comprimento(array) {
  return R.length(array);
}
function filtraImpar(array) {
  return R.filter(x => x % 2 == 1, array);
}
function quadrado(array) {
  return R.map(x => x * x, array);
}
// --- complete o código:
var qtdQuadradosImpares = R.pipe(...);
// ---
alert(qtdQuadradosImpares([2, 3, 5, 8, 13, 21]));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Note que as funções passadas para `pipe`, com exceção da primeira, devem receber apenas um argumento; por isso que, no exemplo anterior, foi necessário criar funções auxiliares. Em vez de criar essas funções explicitamente, no entanto, poderíamos usar currying para obter funções de um argumento. Escreva uma nova versão do código abaixo, considerando que as funções `R.filter` e `R.map` já são curried (todas as funções da biblioteca Ramda são curried):

<div class="lesson">
<textarea class="code">
// --- complete o código:
var qtdQuadradosImpares = R.pipe(...);
// ---
alert(qtdQuadradosImpares([2, 3, 5, 8, 13, 21]));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

A biblioteca Ramda também possui a função `compose`, que faz a mesma coisa que a função `pipe`, porém recebendo os argumentos na ordem inversa.

Exercícios: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch5.html
