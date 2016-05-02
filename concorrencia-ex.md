---
layout: lisp
title:  "Programação concorrente: exercícios"
date:   2016-04-27 16:40:00 -0300
categories: aula
---

<script type="text/javascript">
  window.apostila = 'concorrencia-ex';
</script>

# Programação concorrente

Nesta aula vamos usar o site [JSONPlaceholder](http://jsonplaceholder.typicode.com/) para dar suporte a nossos exemplos práticos.

Para simplificar o código, definimos a variável global ROOT como sendo a URL do JSONPlaceholder.

<script type="text/javascript">
    ROOT = 'http://jsonplaceholder.typicode.com';
</script>

As funções `$.get(url, f)` e `$.post(url, f)` realizam uma requisição AJAX à `url` e, quando a resposta chega, chama a função `f` passando o objeto associado à resposta.

Para ver o que a chamada `$.get(ROOT + '/users', ...)` retorna, basta acessar <http://jsonplaceholder.typicode.com/users> no seu navegador.

## Exemplo simples

Antes de executar o código a seguir, tente prever a ordem de execução das instruções `console.log`.

<div class="lesson">
<textarea class="code">
console.log(1);
console.log('ROOT = ', ROOT);
$.get(ROOT + '/users', function (data) {
  console.log(data.map(u => u.name));
});
console.log(2);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

## Algo mais elaborado

O exemplo a seguir deveria buscar o id do usuário com username `Delphine` e então mostrar o título dos álbuns desse usuário:

<div class="lesson">
<textarea class="code">
var id, albums;
$.get(ROOT + '/users?username=Delphine', function (data) {
  id = data[0].id;
});
$.get(ROOT + '/albums?userId=' + id, function (data) {
  albums = data.map(a => a.title);
});
console.log(albums);
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>

No entanto, o programador não percebeu que as chamadas de função que realizou são assíncronas, e por isso o programa não funciona como deveria. Conserte o programa.

## Gate

Agora você quer pegar o e-mail de todos os usuários pagantes e então exibir os dois e-mails separados por vírgulas (não importa a ordem). (Suponha que a url `/users`, que retorna todos os dados de todos os usuários, não existe). Corrija o código abaixo:

<div class="lesson">
<textarea class="code">
var pagantes = [1, 2, 5, 8];
var emails = [];
function recebeResultado(user) {
  emails.push(user.email);
}
function imprimeResultado() {
  console.log('Emails: ' + emails.join(',') + '.');
}
pagantes.forEach(function (idx, userId) {
  $.get(ROOT + '/users/' + userId, recebeResultado);
});
imprimeResultado();
</textarea>
<div class="output"></div>
<div class="output"></div>
<pre class="verifier">function(str, info) { return simplesEval(str, info); }</pre>
<button class="go">Rodar</button>
</div>









