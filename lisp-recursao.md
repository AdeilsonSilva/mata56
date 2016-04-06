---
layout: lisp
title:  "Lisp: recursão de cauda"
date:   2016-04-04 16:40:00 -0300
categories: aula
---

<script type="text/javascript">
    simplesEval = simplesEvalLisp;
    multiEval = multiEvalLisp;
    window.codeMirrorLanguage = "commonlisp";
</script>

# Programação funcional

## Acumuladores e recursão de cauda

Dizemos que uma função usa recursão de cauda quando as chamadas recursivas que ela executa são a última instrução executada antes de retornar. Quando uma função recursiva usa recursão de cauda, alguns compiladores e interpretadores são capazes de otimizar a função, transformando-a em uma função iterativa. Desta forma, as chamadas recursivas não ocupam espaço na pilha de chamadas.

Para transformar uma função recursiva em uma função com recursão de cauda, frequentemente é necessário adicionar um parâmetro à função, que funciona como acumulador. A cada chamada recursiva, o acumulador é atualizado com o resultado parcial da função e, no final, a função retorna o valor do acumulador.

Por exemplo, considere a função `length`, implementada com recursão tradicional:

```lisp
(defun length (lista)
  (cond
    ((null lista) 0)
    (t (+ 1 (length (cdr lista))))))
```

A mesma função pode ser implementada usando recursão de cauda, com a ajuda de uma função auxiliar `length-acum`:

```lisp
(defun length-acum (lista acum)
  (cond
    ((null lista) acum)
    (t (length-acum (cdr lista) (+ 1 acum)))))

(defun length (lista)
  (length-acum lista 0))
```

Outros exemplos de funções em LISP, com e sem recursão de cauda, estão nas [anotações da aula anterior](lisp-respostas).

## Exercícios

Para cada um dos exercícios a seguir, implemente uma função usando recursão de cauda. Implemente funções auxiliares quando necessário. Adicione testes no final para verificar se a sua implementação está correta.

### soma-lista

Implemente a função `(soma-lista lista)`, que retorna a soma dos elementos da lista.

<div class="lesson">
<textarea class="code">
(defun soma-lista-acum (lista acum)
  (cond
    ((null lista) acum)
    (t (soma-lista-acum (cdr lista) (+ acum (car lista))))))

(defun soma-lista (lista)
  (soma-lista-acum lista 0))

(print (soma-lista '(1 8 5)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### fatorial

Implemente a função `(fatorial n)`, que retorna o valor de n! (n fatorial).

<div class="lesson">
<textarea class="code">
(defun fatorial-acum (n acum)
  (cond
    ((= n 1) acum)
    (t (fatorial-acum (- n 1) (* acum n)))))

(defun fatorial (n)
  (fatorial-acum n 1))

(print (fatorial 3))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### fibonacci

Implemente a função `(fibonacci n)`, que retorna o n-ésimo número da sequência de Fibonacci.

<div class="lesson">
<textarea class="code">
(defun fib-acum (n a1 a2)
  (cond
    ((<= n 2) a1)
    (t (fib-acum (- n 1) (+ a1 a2) a1))))

(defun fib (n)
  (fib-acum n 1 1))

(print (fib 0))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### inverte

Implemente a função `(inverte lista)`, que retorna uma lista com os mesmos elementos do argumento, porém em ordem inversa. Exemplo: `(inverte '(q w e)) ==> '(e w q)`

<div class="lesson">
<textarea class="code">
(defun inverte-acum (l il)
  (cond
    ((null l) il)
    (t (inverte-acum (cdr l) (cons (car l) il)))))

(defun inverte (l)
  (inverte-acum l '()))

(print (inverte '(5 2 1)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

### concatena

Implemente a função `(concatena l1 l2)`, que recebe duas listas, l1 e l2, e retorna uma lista com os elementos de l1 na sequência, seguidos dos elementos de l2 na sequência. Exemplo: `(concatena '(m u n) '(d o)) ==> '(m u n d o)`

<div class="lesson">
<textarea class="code">
(defun inverte-acum (l il)
  (cond
    ((null l) il)
    (t (inverte-acum (cdr l) (cons (car l) il)))))

(defun inverte (l)
  (inverte-acum l '()))

(defun concatena-acum (l1 l2)
  (cond
    ((null l1) l2)
    (t (concatena-acum (cdr l1) (cons (car l1) l2)))))

(defun concatena (l1 l2)
  (concatena-acum (inverte l1) l2))

(print (concatena '(1 2 3) '(4 5 6)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>