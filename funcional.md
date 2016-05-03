---
layout: lisp
title:  "Funções de alta ordem (exercícios)"
date:   2016-03-04 16:40:00 -0300
categories: aula
---

# Funções de alta ordem (exercícios)

Primeiramente, crie um arquivo chamado `index.html` com o seguinte conteúdo:

```html
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
<body>
    <script type="text/javascript">
        function ufbassert(esperado, obtido) {
            var r;
            var s1 = JSON.stringify(esperado);
            var s2 = JSON.stringify(obtido);
            if (s1 === s2) {
                r = Math.random();
                if (r < 0.33) {
                    console.log("Certa resposta!");
                } else if (r < 0.66) {
                    console.log("E a resposta está eeeeeeeee....xata!");
                } else {
                    console.log("Mandou bem!");
                }
            } else {
                throw "Resultado obtido !== esperado\nEsperado: " + s1
                        + "\nObtido: " + s2 + "\n";
            }
        }
    </script>
    Pagina em branco.
</body>
</html>
```

Esse arquivo carrega a biblioteca underscore.js e define algumas funções que serão usadas nos exercícios.
Abra-a no seu navegador e então abra o console Javascript do seu navegador.

## Iterando sobre um vetor (array)

Exercício: escreva todos os nomes em uma array. Pode ser feito usando o `for`. Cole o código abaixo no console Javascript de seu navegador para vê-lo funcionando:

```javascript
function escreveNomes1() {
    var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"],
        counter;

    for(counter = 0; counter < names.length; counter++) {
        console.log(names[counter]);
    }
}
escreveNomes1();
```

O exercício pode ser feito usando o `forEach`:

```javascript
function escreveNomes2() {
    var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"],
        counter;

    names.forEach(function(name) {
        console.log(name);
    });
}
escreveNomes2();
```

Note que foi criada uma função **anônima** (sem nome) que é passada como parâmetro para a função `forEach`. Qualquer função que retorna ou recebe como parâmetro uma outra função é chamada de **função de alta ordem**. É o caso da função `forEach` (tecnicamente, `forEach` é um método, mas essa distinção não é importante por enquanto).

Em versões mais novas do Javascript, é possível definir funções anônimas de maneira mais compacta usando o operador seta (arrow operator, `=>`). O código fica assim:

```javascript
function escreveNomes3() {
    var names = ["Ben", "Jafar", "Matt", "Priya", "Brian"],
        counter;

    names.forEach(name => console.log(name));
}
escreveNomes3();
```

Se sua funcão anônima tiver mais de um parâmetro, é necessário usar parênteses nos argumentos:

```javascript
var soma = (x, y) => x + y;
// equivalente a:
// var soma = function(x, y) { return x + y; };
console.log(soma(2, 2));
```

Se a sua funcão retorna um objeto (`{...}`), é preciso colocar o retorno entre parênteses (caso contrário o interpretador Javascript acha que você está iniciando um bloco de código):

```javascript
var newPessoa = (nome, idade) => ({"nome": nome, "idade": idade});
console.log(newPessoa("Fulano", 18));
```

## Projetando arrays

Aplicar uma função de um valor para criar um novo valor é chamado um **projeção**. Para projetar um array para outro, aplicamos um função de projeção em cada item no array e coletamos os resultados em uma nova array.

Um array em Javascript é um objeto **mutável**, isto é, ele pode ser modificado. As funções que modificam o array são chamadas de funções **destrutivas**. As funções não-destrutivas são aquelas que não modificam o array; em vez disso, elas retornam um novo array que é construído a partir do array passado como parâmetro.

Do ponto de vista das linguagens funcionais, uma função deve apenas receber valores como parâmetro e retornar um valor. Se a função modifica algum parâmetro, altera variáveis globais, ou acessa entrada/saída (ex.: modifica um arquivo), esses comportamentos são considerados **efeitos colaterais** de se chamar a função, e a função é dita **não-pura**.

Uma função pura, sem efeitos colaterais, vai sempre retornar o mesmo resultado para uma determinada entrada, não importa quantas vezes a função seja chamada.

O método `arr.push(elem)` é um método *destrutivo*, que possui o *efeito colateral* de adicionar o elemento `elem` ao final do array `arr`.

Exercício: para cada video, projetar `{id, title}` ao array `videoAndTitlePairs`.

```javascript
function projetarForEach() {
    var newReleases = [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
                "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": [4.0],
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
                "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": [5.0],
                "bookmark": [{ id:432534, time:65876586 }]
            },
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
                "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": [4.0],
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
                "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": [5.0],
                "bookmark": [{ id:432534, time:65876586 }]
            }
        ],
        videoAndTitlePairs = [];

    // projeção
    newReleases.forEach(function(video) {
        videoAndTitlePairs.push({id: video.id, title: video.title});
    });
    // -------

    return videoAndTitlePairs;
}
projetarForEach();
```

Javascript já possui uma função, `arr.map(f)`, que realiza projeções, construindo um array a partir da aplicação da função `f` ao array `arr`. Exemplo:

```javascript
var numeros = [1, 2, 3, 4, 5];
var dobro = numeros.map(num => num * 2);
var quadrado = numeros.map(num => num * num);
```

Questão 20. Vamos repetir o exercício de coletar os pares `{id, title}` de cada vídeo no array `newReleases`, mas desta vez *vamos usar a função `map`*.

```javascript
function mapIdTitle() {
    var newReleases = [
        {
            "id": 70111470,
            "title": "Die Hard",
            "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [4.0],
            "bookmark": []
        },
        {
            "id": 654356453,
            "title": "Bad Boys",
            "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [5.0],
            "bookmark": [{ id:432534, time:65876586 }]
        },
        {
            "id": 65432445,
            "title": "The Chamber",
            "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [4.0],
            "bookmark": []
        },
        {
            "id": 675465,
            "title": "Fracture",
            "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [5.0],
            "bookmark": [{ id:432534, time:65876586 }]
        }
    ];

    // ------------ INSERT CODE HERE! -----------------------------------
    // Use a função map para acumular {id, title} para cada video
    return newReleases.map(video => ({id: video.id, title: video.title})); // finalize esta expressão
    // ------------ INSERT CODE HERE! -----------------------------------
}
// Este código verifica se sua resposta está correta.
// Se não estiver, aparece um erro no console.
var result = _.sortBy(mapIdTitle(), v => v.id);
var expected = [{"id":675465,"title":"Fracture"},{"id":65432445,"title":"The Chamber"},{"id":70111470,"title":"Die Hard"},{"id":654356453,"title":"Bad Boys"}];
ufbassert(expected, result);
```

Lembre-se de submeter a sua resposta para o formulário de respostas (veja o site da disciplina).

Questão 21. Implemente a sua própria versão de `map` iterando sobre uma array e usando o `push` para construir o array que será retornado. Use o modelo abaixo.

```javascript
function meuMap(array, f) {
    var resultado = [];
    // INSERT CODE HERE
    array.forEach(item => resultado.push(f(item)));
    return resultado;
}
// Código de checagem
ufbassert([], meuMap([], elem => elem * 2));
ufbassert([1,2,3], meuMap([[1], [1, 2], [3, 2, 1]], elem => elem.length));
```

A função `filter` recebe um array e um **predicado** (função que retorna `true` ou `false`), e retorna uma novo array apenas com os elementos que satisfazem o predicado (i.e., para os quais o predicado é verdadeiro, `true`).

Questão 22. Implemente a função `meuFilter`

Questão 23. Use a função `meuFilter` para retornar apenas os filmes cujo `id` seja um número par.

```javascript
function meuFilter(array, p) {
    var ans = [];
    array.forEach(function(item){
        if(p(item))
          ans.push(item);
    });
    return ans;
}
console.log(meuFilter(newReleases, item => item.id % 2 == 0));
```

Questão 24. Usando `filter` e `map`, retorne uma lista dos ids dos filmes com nota (rating) 5.0. Use o código abaixo:

```
function rating5() {
    var newReleases = [
            {
                "id": 70111470,
                "title": "Die Hard",
                "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
                "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 654356453,
                "title": "Bad Boys",
                "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
                "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id:432534, time:65876586 }]
            },
            {
                "id": 65432445,
                "title": "The Chamber",
                "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
                "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 4.0,
                "bookmark": []
            },
            {
                "id": 675465,
                "title": "Fracture",
                "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
                "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
                "rating": 5.0,
                "bookmark": [{ id:432534, time:65876586 }]
            }
        ],
        videos = [];

    newReleases.forEach(function(video) {
        if (video.rating === 5.0) {
            videos.push(video);
        }
    });

    return videos;
}
rating5();

// MY ANSWER
console.log(newReleases.filter(film => film.rating == 5).map(film => film.id));
```



Questão 25. Use `forEach` para retornar o "boxart" de maior área (width = comprimento, height = altura). Se baseie no código abaixo:

```javascript
function maiorBoxArtForEach() {
    var boxarts = [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
            { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
            { width: 425, height:150, url:"http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
        ],
        largestBoxart = 0;

    boxarts.forEach(function(boxart) {
        // TODO: insira código aqui
        if(boxart.width * boxart.height > largestBoxart) {
            largestBoxart = boxart.width * boxart.height;
        }
    });

    return largestBoxart;
}
ufbassert(63750, maiorBoxArtForEach());
```

Questão 26. Igual à questão 25, mas usando reduce.

```javascript
function area(box) {
    return box.width * box.height;
}

function maiorBoxArtForEach() {
    var boxarts = [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
            { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
            { width: 425, height:150, url:"http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
        ];
        largestBoxart;

    largestBoxart = boxarts.reduce((largest, box) => area(box) > area(largest) ? box : largest);
    return area(largestBoxart);
}
ufbassert(63750, maiorBoxArtForEach());
```

Questão 27. Retorne a URL da "boxart" de maior área. Use o código abaixo:

```javascript
function area(box) {
    return box.width * box.height;
}

function urlDaMaiorBoxart() {
    var boxarts = [
            { width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
            { width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
            { width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
            { width: 425, height:150, url:"http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
        ];

    // Voce deve retornar um array contendo apenas a URL da maior boxart.
    // TODO: complete o código abaixo.
    return [boxarts.reduce((largest, box) => area(box) > area(largest) ? box : largest).url];
}
ufbassert(["http://cdn-0.nflximg.com/images/2891/Fracture425.jpg"], urlDaMaiorBoxart());
```




---------

Material baseado em http://reactivex.io/learnrx/

Outras referências:

- https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions

