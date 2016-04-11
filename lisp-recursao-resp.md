---
layout: lisp
title:  "Lisp: recursão de cauda (respostas)"
date:   2016-04-04 18:30:00 -0300
categories: aula
---

<script type="text/javascript">
    simplesEval = simplesEvalLisp;
    multiEval = multiEvalLisp;
    window.codeMirrorLanguage = "commonlisp";
</script>

## soma-lista

<div class="lesson">
<textarea class="code">
(defun soma-lista-ac (lista acum)
  (cond
    ((null lista) acum)
    (t (soma-lista-ac (cdr lista) (+ acum (car lista))))))
(defun soma-lista (lista)
  (soma-lista-ac lista 0))
;
(print (soma-lista '()))
(print (soma-lista '(5)))
(print (soma-lista '(1 2 3)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## fatorial

<div class="lesson">
<textarea class="code">
(defun fatorial-ac (n acum)
  (cond
    ((<= n 1) acum)
    (t (fatorial-ac (- n 1) (* n acum)))))
(defun fatorial (n)
  (fatorial-ac n 1))
;
(print (fatorial 0))
(print (fatorial 1))
(print (fatorial 2))
(print (fatorial 3))
(print (fatorial 4))
(print (fatorial 5))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## fibonacci

<div class="lesson">
<textarea class="code">
(defun fibonacci-ac (n ultimo penultimo)
  (cond
    ((<= n 1) ultimo)
    (t (fibonacci-ac (- n 1) (+ penultimo ultimo) ultimo))))
(defun fibonacci (n)
  (fibonacci-ac n 1 0))
;
(print (fibonacci 1))
(print (fibonacci 2))
(print (fibonacci 3))
(print (fibonacci 4))
(print (fibonacci 5))
(print (fibonacci 6))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## inverte

<div class="lesson">
<textarea class="code">
(defun inverte-ac (lista acum)
  (cond
    ((null lista) acum)
    (t (inverte-ac (cdr lista) (cons (car lista) acum)))))
(defun inverte (lista)
  (inverte-ac lista '()))
;
(print (inverte '()))
(print (inverte '(1)))
(print (inverte '(1 2)))
(print (inverte '(1 2 3)))
(print (inverte '(1 2 3 4)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## concatena

<div class="lesson">
<textarea class="code">
(defun concatena-ac (l1-invertida l2)
  (cond
    ((null l1-invertida) l2)
    (t (concatena-ac (cdr l1-invertida) (cons (car l1-invertida) l2)))))
(defun concatena (l1 l2)
  (concatena-ac (inverte l1) l2))
;
(print (concatena '() '()))
(print (concatena '() '(1)))
(print (concatena '(1) '()))
(print (concatena '(1 2 3) '()))
(print (concatena '() '(1 2 3)))
(print (concatena '(1 2 3) '(4 5 6)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>
