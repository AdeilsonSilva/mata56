---
layout: lisp
title:  "Teste"
date:   2016-04-04 16:40:00 -0300
---

<script type="text/javascript">
    window.apostila = "teste";
</script>

Questão em Javascript:

<div class="lesson">
<textarea class="code lang-javascript">
function alo() {
    console.log("Alô mundo");
}
alo();
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>


<div class="lesson">
<textarea class="code lang-commonlisp">
(defun alo () (print "alo"))
(alo)
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

