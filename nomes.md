---
layout: lisp
title:  "Nomes, vinculação e escopo"
date:   2016-03-07 16:40:00 -0300
categories: aula
---

# Programação funcional

## Nomes, vinculação e escopo

Em programas de computador, **nomes** representam coisas, como valores, comportamentos etc. Os nomes são **vinculados** às coisas que representam em diversos momentos. Por exemplo:

* O nome `if` é vinculado ao comportamento de estrutura de seleção em **tempo de projeto de linguagem**
* Em C, quando você escreve `#define PI 3.14159`, o nome `PI` é vinculado ao valor `3.14159` em **tempo de compilação**
* Em geral, variáveis são vinculadas aos seus valores em **tempo de execução**

Em linguagens de programação, vinculação (ou amarração, ou ligação, ou binding) se refere à vinculação de um nome a um valor ou comportamento.

**Escopo** de uma vinculação é o conjunto de trechos de um programa que consegue usar a vinculação. Exemplo:

```javascript
var glob = 123;     // 1
console.log(glob);  // 2
function teste() {  // 3
    var x = 2;      // 4
    console.log(x); // 5
}                   // 6
glob = 456;         // 7
```

O escopo da variável `glob` corresponde às linhas 2, 4, 5 e 7 do programa. O escopo da variável `x` corresponde à linha 5.

A variável `glob` tem um escopo **global**, pois é acessível em todo o programa (essa é uma definição simplificada). A variável `x` tem um escopo **local**, pois só é acessível dentro da função no qual ela é definida. A variável `teste` também possui escopo global (lembre-se de que em Javascript funções também são valores!).

A maioria das linguagens de programação adota regras de **escopo léxico** (ou estático). Isso significa que é possível determinar o escopo de uma variável somente lendo o código-fonte do programa. Algumas linguagens de programação usam o **escopo dinâmico**; uma situação comum nesse caso é uma função ter acesso a variáveis definidas na função que a chamou. Pode-se argumentar que uma linguagem de programação que adota o escopo dinâmico tende a resultar em programas mais difíceis de entender.

O **contexto** ou **ambiente de referenciamento** de uma região de um programa corresponde ao conjunto de vinculações que pode-se acessar naquela região. Vejamos o exemplo anterior:

```javascript
var glob = 123;     // 1
console.log(glob);  // 2
function teste() {  // 3
    var x = 2;      // 4
    console.log(x); // 5
}                   // 6
glob = 456;         // 7
```

O ambiente de referenciamento da linha 7 corresponde às variáveis `glob` e `teste` (e, naturalmente, outras variáveis definidas globalmente pelo browser, a exemplo de `window` e `console`). O ambiente de referenciamento da linha 5 contém todas essas variáveis e mais a variável `x`.

## Regras de escopo de Javascript

Considere agora o seguinte exemplo:

```javascript
/* 1  */ var glob = 1;
/* 2  */ 
/* 3  */ function externa() {
/* 4  */     var xext = 2;
/* 5  */ 
/* 6  */     function interna() {
/* 7  */         var xint = 3;
/* 8  */         console.log(xext);
/* 9  */     }
/* 10 */     interna();
/* 11 */ }
/* 12 */ externa();
```

O que acontecerá quando a linha 8 for executada? Vai dar erro? Para responder a essa pergunta, devemos descobrir se a variável `xext` faz ou não faz parte do ambiente de referenciamento da linha 8 (e da função `interna`, em geral).

Faça suas apostas e execute o código no console do seu navegador.

Para buscar da variável `xint`, o interpretador Javascript primeiro procura nas variáveis definidas dentro da função `interna`. Não encontrando, ele vai procurar variáveis definidas no contexto da função `externa`. Se ainda não encontrar, procura nas variáveis globais. Ou seja, o ambiente de referenciamento inclui o escopo atual e mais todos os escopos externos.

Então o que vai acontecer no seguinte código?

```javascript
/* 1  */ var x = 1;
/* 2  */ 
/* 3  */ function externa() {
/* 4  */     var x = 2;
/* 5  */ 
/* 6  */     function interna() {
/* 7  */         var x = 3;
/* 8  */         console.log(x);
/* 9  */     }
/* 10 */     interna();
/* 11 */ }
/* 12 */ externa();
```

Existem três vinculações diferentes do nome `x`, com diferentes escopos. Surge a dúvida: se o `x` da linha 1 tem escopo global, isso significa que esse escopo se estende à linha 8?

Não. A declaração de `x` na linha 4 **mascara** a variável `x` da linha 1 (esse fenômeno é também conhecido como **sombreamento**. O resultado disso é que, dentro da função `externa`, vale a variável `x` da linha `4`... exceto na linha 8, pois nesse caso a variável que vale é a variável `x` definida na linha 7. 

No final das contas, o escopo de `x` da linha 1 é a linha 12; o escopo de `x` da linha 4 é a linha 10; e o escopo de `x` da linha 7 é a linha 8.
