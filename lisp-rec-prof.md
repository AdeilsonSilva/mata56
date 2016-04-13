---
layout: lisp
title:  "Lisp: recursão profunda"
date:   2016-04-11 16:40:00 -0300
categories: aula
---

<script type="text/javascript">
    simplesEval = simplesEvalLisp;
    multiEval = multiEvalLisp;
    window.codeMirrorLanguage = "commonlisp";
</script>

# Programação funcional

## Recursão profunda

Até agora temos trabalhado com listas de átomos, usando recursão para processar seu conteúdo. Definimos como **lista profunda** uma lista que contém outras listas. Listas profundas podem ser pensadas como árvores. Exemplo:

<!-- https://www.cs.bham.ac.uk/research/projects/poplog/paradigms_lectures/lecture9.html -->

```
(a ((b c)) (d (e (f))) g)
```

```
       (a ((b c)) (d (e (f))) g)
                 |
----------------------------------------
|         |              |             |
a      ((b c))      (d (e (f)))        g
          |              |
          |          ----------
          |          |        |
        (b c)        d     (e (f))
          |                   |
       ------             --------
       |    |             |      |
       b    c             e     (f)
                                 |
                                 f
```

Para explorar a árvore completamente, é preciso usar **recursão profunda**. O função usa recursão profunda quando chama a si própria recursivamente no *car* e no *cdr* da lista.

## Exemplo: membro-prof

Implemente a função `(membro-prof x expr)`, que indica se `x` aparece na expressão `expr`, que pode ser um átomo ou uma lista (possivelmente profunda).

<div class="lesson">
<textarea class="code">
(defun membro-prof (x lista)
  (cond
    ; nenhum átomo é membro da lista vazia
    ((null lista) Nil)
    ; 1o elemento é uma lista não-vazia
    ((consp (car lista))
      (or (membro-prof x (car lista))
          (membro-prof x (cdr lista))))
    ; 1o elemento é um átomo
    (t
      (or (equal (car lista) x)
          (membro-prof x (cdr lista))))))

(print (membro-prof 5 '(1 2 3)))
(print (membro-prof 5 '(1 2 3 (4 5))))
(print (membro-prof 5 '(1 2 (3 (5 4)))))
(print (membro-prof '() '(1 2 3)))
(print (membro-prof '() '(1 () 2 3)))
(print (membro-prof '() '(())))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

<!--
<div class="lesson">
<textarea class="code">
(defun membro-prof (x expr)
  (cond
    ((not (consp expr)) (equal x expr))
    (t (or
      (membro-prof x (car expr))
      (membro-prof x (cdr expr))))))

(print (membro-prof 5 '(1 2 3)))
(print (membro-prof 5 '(1 2 3 (4 5))))
(print (membro-prof 5 '(1 2 (3 (5 4)))))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>
-->

OBS.: `(consp x)` indica se x é uma lista com pelo menos um elemento

## Exemplo: conta-ocorrencias-prof

Modifique a função anterior para contar o número de ocorrências de `x` na expressão `expr`, usando recursão profunda

<div class="lesson">
<textarea class="code">
(defun conta-prof (x lista)
  (cond
    ((null lista) 0)
    ; 1o elem é uma lista não-vazia
    ((consp (car lista))
      (+ (conta-prof x (car lista))
         (conta-prof x (cdr lista))))
    ; 1o elemento é um átomo
    ((equal x (car lista)) 
      (+ 1 (conta-prof x (cdr lista)))) 
    (t (conta-prof x (cdr lista)))))

; testes
(print (conta-prof j '(c ((b a)) (d (e (c))) g)))
(print (conta-prof c '(c ((b a)) (d (e (c))) g)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Exemplo: subst

Crie uma função, `(subst x y expr)`, que substitua as oorrências de `x` por `y` na expressão `expr`, usando recursão profunda.

<div class="lesson">
<textarea class="code">

</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Exemplo: flatten

Crie uma função, `(flatten lista)`, que "achata" a lista, isto é, retorna uma lista de átomos com a mesma sequência de átomos da lista profunda `lista`. 


<div class="lesson">
<textarea class="code">
(defun flatten (lista)
  ...)

(print (flatten '(1 ((2 3) (4 (5)) 6) 7)))
; deve retornar '(1 2 3 4 5 6 7)'
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Exemplo: flatten com recursão de cauda

Reimplemente a função anterior usando recursão de cauda.

<div class="lesson">
<textarea class="code">
(defun flatten (lista)
  ...)

(print (flatten '(1 ((2 3) (4 (5)) 6) 7)))
; deve retornar '(1 2 3 4 5 6 7)'
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>


<!--
Escreva uma função que remove apenas a primeira ocorrência do átomo em uma estrutura de lista profunda.

Escreva uma função que substitui todas as ocorrências do átomo old por um átomo new em uma estrutura de lista profunda.

Escreva uma função que inverte todos os elementos de uma lista genérica (versão genérica de inverte / reverse) 
-->
