---
layout: lisp
title:  "Closures"
date:   2016-03-09 16:40:00 -0300
categories: aula
---

# Programação funcional

## Closures

(Baseado em https://developer.mozilla.org/en/docs/Web/JavaScript/Closures)

Closures (do inglês, fechamento) são funções que referenciam variáveis independentes (livres). Em outras palavras, a função definida na closure lembra-se do ambiente no qual ele foi criado.

Vamos começar com um exemplo simples, sem closure:

```javascript
function alo() {
    var nome = "Turing";

    function mostraNome() {
        alert("Alo, " + nome);
    }
    mostraNome();
}
alo();
```

Agora um exemplo mais complexo, com closure:

```javascript
function criaFuncaoAlo() {
    var nome = "Turing";

    function mostraNome() {
        alert("Alo, " + nome);
    }
    return mostraNome;
}
var alo = criaFuncaoAlo();
alo();
```

O resultado é o mesmo, mas a função `criaFuncaoAlo` desta vez retorna a função interna `mostraNome`, sem executá-la. Em vez disso, a função só executada na última linha de código.

O código não é muito intuitivo. Normalmente, uma variável local definida em uma função só existe enquanto a função é executada; quando a execução termina, a variável deveria ser destruída e deixar de ser acessível. No exemplo, no entanto, a variável `nome` ainda está acessível depois que a função `criaFuncaoAlo` terminou de executar.

A solução desse mistério é que `mostraNome` tornou-se uma closure, que é um objeto especial que combina duas coisas: uma função e o ambiente na qual a função foi criada. O ambiente consiste de todas as variáveis locais disponíveis no momento em que a função foi criada. Dizemos que a função `mostraNome` **captura** a variável nome.

```
closure mostraNome =
  função mostraNome +
  variável nome
```

Mais um exemplo:

```javascript
function criaAlertRandom() {
    var x = Math.random();
    return function() {
        alert("Número sorteado: " + x);
    }
}
var funcAlert1 = criaAlertRandom();
var funcAlert2 = criaAlertRandom();
funcAlert1();
funcAlert2();
funcAlert1();
```

Qual o resultado? Três números iguais? Três números diferentes? O primeiro número será igual ao terceiro? Faça suas apostas, execute e revise seu conhecimento sobre closures.

Agora um exemplo mais útil, mostrando que parâmetros também são capturados por uma closure:

```javascript
function multiplicador(fator1) {
    return function(fator2) {
        return fator1 * fator2;
    }
}
var dobro = multiplicador(2);
var triplo = multiplicador(3);
alert(dobro(4));
alert(triplo(4));
```

A closure também pode alterar as variáveis capturadas:

```javascript
function criaContador() {
    var x = 0;
    return function() {
        x = x + 1;
        console.log(x);
    }
}
var contadorA = criaContador();
var contadorB = criaContador();
contadorA();
contadorA();
contadorA();
contadorB();
contadorB();
```

## Closures e programação orientada a objetos

Uma closure permite associar alguns dados (o ambiente) com a função que opera sobre os dados. Isso soa como programação orientada a objetos, na qual objetos permitem associar alguns dados (as propriedades do objeto) a um ou mais métodos.

Exemplo:

```javascript
function criaObjetoContador(nome) {
    var c = 0;

    function incrementa() {
        c = c + 1;
    }
    function mostra() {
        alert(nome + ": " + c);
    }

    return {"incrementa": incrementa,
        "mostra": mostra};
}
var contadorA = criaObjetoContador("A");
var contadorB = criaObjetoContador("B");
contadorA.incrementa();
contadorB.incrementa();
contadorA.incrementa();
contadorB.incrementa();
contadorA.incrementa();
contadorA.mostra();
contadorB.mostra();
```

Obviamente, esse esquema é limitado, pois não há herança e polimorfismo. Veremos como fazer programação orientada a objetos em Javascript do jeito certo em outro momento.

## Closures na prática

É importante entender closures para programar Javascript para web? **Muito**! Grande parte do código que escrevemos em Javascript para web é baseado em eventos: definimos um comportamento, então anexamos o comportamento a um evento que é disparado pelo usuário (por exemplo, um clique). O código é geralmente escrito em um callback: uma função que é executada em resposta a um evento.

Exemplo:

<div><script async src="//jsfiddle.net/hr17fgj4/embed/"></script>
<p><a href="https://jsfiddle.net/hr17fgj4/">https://jsfiddle.net/hr17fgj4/</a></p>
</div>

Agora vamos para um exemplo mais complexo:

<div><script async src="//jsfiddle.net/sftqbfj7/embed/"></script>
<p><a href="https://jsfiddle.net/sftqbfj7/">https://jsfiddle.net/sftqbfj7/</a></p>
</div>

Não funcionou como você gostaria? Por quê?

Que tal agora?

<div><script async src="//jsfiddle.net/e1srfbbv/embed/"></script>
<p><a href="https://jsfiddle.net/e1srfbbv/">https://jsfiddle.net/e1srfbbv/</a></p>
</div>

Uma versão um pouco mais compacta (e obscura, mas ainda assim muito utilizada):

<div><script async src="//jsfiddle.net/65j26erk/embed/"></script>
<p><a href="https://jsfiddle.net/65j26erk/">https://jsfiddle.net/65j26erk/</a></p>
</div>

A última solução usa uma IIFE (immediately-invoked function expression, ou expressão de função invocada imediatamente).
