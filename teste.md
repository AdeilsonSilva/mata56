---
layout: lisp
title:  "Teste"
date:   2016-04-04 16:40:00 -0300
---

<script type="text/javascript">
    window.apostila = "teste";
</script>
<script src="assets/javathcript/assert.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/ramda/0.19.1/ramda.min.js"></script>

## Javascript

<div class="lesson">
<textarea class="code lang-javascript">

</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Lisp

<div class="lesson">
<textarea class="code lang-commonlisp">
(defun identity (x) x)
(teste '(1 2 3) (identity '(1 2 3)))
(teste '(3 3 3) (identity '(1 2 3)))
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return multiEvalLisp(str, info); }</pre>
<button class="go">Rodar</button>
</div>


--------------

<button onclick="$('#json').val(obtemRespostasJson());">Exportar JSON</button>

<button onclick="carregaRespostasJson($('#json').val());">Importar JSON</button>

Coloque o json aqui:

<textarea id="json" rows="6" cols="80">
    {"answers": [""]}
</textarea>

