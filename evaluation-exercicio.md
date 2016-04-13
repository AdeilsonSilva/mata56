---
layout: lisp
title:  "Estratégias de avaliação: exercícios"
date:   2016-03-23 16:40:00 -0300
categories: aula
---

<script type="text/javascript">
    window.apostila = "evaluation-exercicio";
</script>

# Programação funcional

## Exercícios

Considere a seguinte função, que imprime os primeiros `n` números primos:

<div class="lesson">
<textarea class="code">
function imprimePrimeirosPrimos(n) {
    var i, num = 0, ehprimo, qtdprimos = 0;
    while (qtdprimos < n) {
        if (num >= 2) {
            ehprimo = true;
            for (i = 2; i < num; i++) {
                if (num % i === 0) {
                    ehprimo = false;
                    break;
                }
            }
            if (ehprimo) {
                qtdprimos++;
                console.log(num);
            }
        }
        num++;
    }
}
imprimePrimeirosPrimos(10);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Essa função tem várias responsabilidades:

- determinar se um número é primo
- controlar a quantidade de números retornados
- imprimir números

Do jeito que está, a função não é muito extensível. E se quiséssemos retornar os números primos em vez de imprimi-los? E se quiséssemos obter os números primos menores que 100? Qualquer dessas mudanças exigiria a implementação de uma nova função.

Ainda bem que Javascript é uma linguagem funcional! Vamos aproveitar os recursos da linguagem para decompor essa função em funções menores, cada uma com uma única responsabilidade, para facilitar o reuso das funções?

## Isolando a checagem de números primos

Vamos decompor a função original em duas partes: a função `ehPrimo(numero)` determina se um número é primo ou não, e `imprimePrimeiros(n, pred)` imprime os primeiros `n` números naturais que satisfazem à função `pred`. Com isso, podemos reescrever `imprimePrimeirosPrimos(n)` combinando as duas funções.

<div class="lesson">
<textarea class="code">
// --- modifique imprimePrimeiros para receber
//     uma função.
function imprimePrimeiros(n, pred) {
    var i, num = 0, ehprimo, qtdprimos = 0;
    while (qtdprimos < n) {
        if (num >= 2) {
            ehprimo = true;
            for (i = 2; i < num; i++) {
                if (num % i === 0) {
                    ehprimo = false;
                    break;
                }
            }
            if (ehprimo) {
                qtdprimos++;
                console.log(num);
            }
        }
        num++;
    }
}
function ehPrimo(numero) {
    
}
// ---
function imprimePrimeirosPrimos(n) {
    imprimePrimeiros(n, ehPrimo);
}
imprimePrimeirosPrimos(10);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

<!-- 
function imprimePrimeiros(n, pred) {
    var i, num = 0, ehprimo, qtd = 0;
    while (qtd < n) {
        if (pred(num)) {
            qtd++;
            console.log(num)
        }
        num++;
    }
}
function ehPrimo(num) {
    ehprimo = false;
    if (num >= 2) {
        ehprimo = true;
        for (i = 2; i < num; i++) {
            if (num % i === 0) {
                ehprimo = false;
                break;
            }
        }
    }
    return ehprimo;
}
function imprimePrimeirosPrimos(n) {
    imprimePrimeiros(n, ehPrimo);
}
imprimePrimeirosPrimos(10);
 -->

## Isolando a forma de retorno

A função atual imprime o resultado no console. E se quiséssemos mostrar em caixas de alerta? E se quiséssemos retornar um array? Vamos reescrever a função para dar essa possibilidade.

<div class="lesson">
<textarea class="code">
function primeirosPred(n, pred, func) {
// --- chame a função func para cada número primo
    var i, num = 0, ehprimo, qtd = 0;
    while (qtd < n) {
        if (pred(num)) {
            qtd++;
            console.log(num);
        }
        num++;
    }
// ---
}
function ehPrimo(num) {
    if (num <= 2) return false;
    for (i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}
function imprimePrimeirosPrimos(n) {
    primeirosPred(n, ehPrimo, (x) => console.log(x));
}
function retornaPrimeirosPrimos(n) {
    array = [];
    primeirosPred(n, ehPrimo, (x) => array.push(x));
    return array;
}
imprimePrimeirosPrimos(10);
console.log(retornaPrimeirosPrimos(10));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

<!-- 

function primeirosPred(n, pred, func) {
    var i, num = 0, ehprimo, qtd = 0;
    while (qtd < n) {
        if (pred(num)) {
            qtd++;
            func(num);
        }
        num++;
    }
}
function ehPrimo(num) {
    ehprimo = false;
    if (num >= 2) {
        ehprimo = true;
        for (i = 2; i < num; i++) {
            if (num % i === 0) {
                ehprimo = false;
                break;
            }
        }
    }
    return ehprimo;
}
function imprimePrimeirosPrimos(n) {
    primeirosPred(n, ehPrimo, (x) => console.log(x));
}
function retornaPrimeirosPrimos(n) {
    array = []
    primeirosPred(n, ehPrimo, (x) => array.push(x));
    return array;
}
imprimePrimeirosPrimos(10);
console.log(retornaPrimeirosPrimos(10));
 -->

## Transforme a função primeirosPred em um generator.

Nesse caso, você não precisará mais passar a função `func`, uma vez que `primeirosPred` retornará diretamente o valor através da instrução `yield`.

<div class="lesson">
<textarea class="code">
function primeirosPred(n, pred, func) {
    var i, num = 0, ehprimo, qtd = 0;
    while (qtd < n) {
        if (pred(num)) {
            qtd++;
            func(num);
        }
        num++;
    }
}
function ehPrimo(num) {
    ehprimo = false;
    if (num >= 2) {
        ehprimo = true;
        for (i = 2; i < num; i++) {
            if (num % i === 0) {
                ehprimo = false;
                break;
            }
        }
    }
    return ehprimo;
}
function imprimePrimeirosPrimos(n) {
    primeirosPred(n, ehPrimo, (x) => console.log(x));
}
function retornaPrimeirosPrimos(n) {
    array = []
    primeirosPred(n, ehPrimo, (x) => array.push(x));
    return array;
}
imprimePrimeirosPrimos(10);
console.log(retornaPrimeirosPrimos(10));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

<!-- ## Isolando o conjunto de números

E se não quisermos encontrar os primeiros `n` números, e sim os números de uma sequência que são primos? Considere o seguinte generator:

```javascript
function* geraFib() {
    var a = 1, b = 1, prox;

    while (true) {
        prox = a + b;
        a = b;
        b = prox;
        yield prox;
    }
}
```

Escreva o restante do código no exemplo abaixo para imprimir no console todos os números da sequência de Fibonacci que são primos.

<div class="lesson">
<textarea class="code">
function* geraFib() {
    var a = 1, b = 1, prox;

    while (true) {
        prox = a + b;
        a = b;
        b = prox;
        yield prox;
    }
}
// --- seu código aqui
// ...
// ---
todosPred(geraFib, ehPrimo, (x) => console.log(x));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div> -->

<!--
function* geraFib() {
    var a = 1, b = 1, prox;

    while (true) {
        prox = a + b;
        a = b;
        b = prox;
        yield prox;
    }
}
function todosPred(gen, pred, func) {
    var i, num = 0, ehprimo, qtd = 0;
    for (num of gen()) {
        if (pred(num)) {
            qtd++;
            func(num);
        }
        num++;
    }
}
function ehPrimo(num) {
    ehprimo = false;
    if (num >= 2) {
        ehprimo = true;
        for (i = 2; i < num; i++) {
            if (num % i === 0) {
                ehprimo = false;
                break;
            }
        }
    }
    return ehprimo;
}
todosPred(geraFib, ehPrimo, (x) => console.log(x));
-->
