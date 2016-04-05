---
layout: lisp
---

# Programação funcional em Lisp

Considere o seguinte exemplo:

```lisp
(defun fib (n)
  (cond
    ((<= n 1) 1)
    (t (+ (fib (- n 1) (- n 2))))))
```

Escreva o código:

<div class="lesson">
<textarea class="code">
(defun fib (n)
  (cond
    ((<= n 1) 1)
    (t (+ (fib (- n 1) (- n 2))))))
(print (fib 5))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

Exemplo em Javascript:

```javascript
function alo() {
  console.log("alo");
}
```

