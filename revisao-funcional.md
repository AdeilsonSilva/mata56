---
layout: lisp
title:  "Revisão de programação funcional"
date:   2016-04-20 16:40:00 -0300
categories: aula
---

<script type="text/javascript">
    window.apostila = "revisao-funcional";
</script>

# Revisão de programação funcional

## Orientação

Para cada questão, você deve escrever **no mínimo** dois casos de teste, que devem ser submetidos junto com a questão. Os casos de teste devem ser escritos na seguinte forma:

```javascript
// formato:
teste(resultadoEsperado, chamadaAFuncao);

// exemplo:
teste(120, fatorial(6));
```

Em Lisp a lógica é a mesma:

```lisp
(teste 120 (fatorial 6))
```

O resultado da execução dos testes aparece no console do navegador.

## Questão 1

Considere a seguinte estrutura de dados:

```
[
  {
    nome: "Fulano",
    turma: "01",
    nota: 8,
  },
  {
    nome: "Sicrano",
    turma: "02",
    nota: 5,
  },
  ...
]
```

Escreva uma função em JavaScript que recebe dados nessa estrutura e o número de uma turma e retorna a média das notas dos alunos que dessa turma. Não use estruturas de repetição (for, while, do) ou recursão. Use as funções alta ordem `R.map`, `R.filter` e `R.reduce`.

<div class="lesson">
<textarea class="code">
function calculaMediaTurma(dados, turma) {
  // --- aqui vem sua implementação
  seuCodigo;
  // ---
}
// testes
teste(8, calculaMediaTurma([{nome: "A", turma: "1", nota: 8}], "1"));
// --- acrescente aqui os seus testes
seuCodigo;
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Questão 2

Escreva uma função em JavaScript que recebe um predicado e uma lista, e retorna o número de elementos na lista que satisfazem ao predicado. Use recursão profunda.

Dicas:

- A expressão `x instanceof Array` retorna verdadeiro somente se `x` for um array.
- A expressão `lista.slice(1)` retorna uma cópia de `lista` sem o seu primeiro elemento.

<div class="lesson">
<textarea class="code lang-javascript">
function contaPred(pred, lista) {
  // --- aqui vem sua implementação
  seuCodigo;
  // ---
}
// testes
teste(3, contaPred(x => x % 2 == 1, [1, [6, 3, [5]]]));
// --- escreva pelo menos mais dois casos de teste
seuCodigo;
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Questão 3

Escreva uma função em Lisp para calcular a soma de todos os elementos de uma lista de números (não-profunda). Assuma que uma lista vazia tem soma zero. Use recursão de cauda.

<div class="lesson">
<textarea class="code lang-commonlisp">
; --- escreva abaixo a função
(seu-codigo)
; --- testes
(teste 6 (soma '(1 2 3)))
; --- escreva abaixo pelo menos 2 testes adicionais
(seu-codigo)
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEvalLisp(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Questão 4

Considere o código abaixo. Modifique a função `main` para que ela passe a considerar o nome passado como parâmetro, conforme exemplificado no teste.

<div class="lesson">
<textarea class="code lang-javascript">
function chamaEmpolgadamente(funcao) {
  return funcao() + "!!!";
}
function cumprimento(nome) {
  return "Alo, " + nome;
}
function main(nome) {
  return chamaEmpolgadamente(
  /* --- modifique esta função */
    cumprimento
  /* --- */
  );
}
// testes
teste("Alo, mundo!!!", main("mundo"));
// --- adicione pelo menos 2 testes
seuCodigo;
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Questão 5

Preencha os parâmetros de `R.pipe` no código-fonte abaixo para que a função `maximo` retorne o maior valor ímpar da lista. 

<div class="lesson">
<textarea class="code">
var maximo = R.pipe(
/* --- complete o codigo */

/* --- */
);
// testes
teste(3, maximo([1, 2, 3, 4]));
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>




