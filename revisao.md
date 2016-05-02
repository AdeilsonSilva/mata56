---
layout: page
title:  "Revisão de recursão"
date:   2016-04-18 18:30:00 -0300
categories: aula
---

```
function somaLista(lista) {
	int soma = 0;
	while (!lista.empty()) {
        int primeiro = lista.car();
		soma = soma + primeiro;
		lista = lista.cdr();
	}
	return soma;
}

// com recursao de cauda
function somaListaAux(lista, soma) {
	if (lista.empty()) {
		return soma;
	} else {
		return somaListaAux(lista.cdr(), soma + lista.car());
	}
}
function somaLista(lista) {
	return somaListaAux(lista, 0);
}

(defun soma-lista-aux (lista soma)
    (cond
        ((null lista) soma)
        (t (soma-lista aux (cdr lista) (+ soma (car lista))))))
(defun soma-lista (lista) 
    (soma-lista-aux lista 0))

(teste 6 (soma-lista '(1 2 3)))
(teste 5 (soma-lista '(5)))

function fib(n) {
    int a = 0, b = 1;

    int i = n;
    while (n >= 2) {
        n, a, b = n - 1, b, a + b;
    }

    return b;
}

function fibAux(n, a, b) {
    if (i <= 1) {
        return b;
    } else {
        return fibAux(n - 1, b, a + b)
    }
}
function fib(n) {
    return fixAux(n, 0, 1)
}

--------------------------

function membroRec(elem, lista) {
    if (lista.length === 0) {
        return false;
    } else {
        var primeiro = lista[0];
        var estaNoPrim, estaNoResto;
        if (primeiro instanceof Array) {
            estaNoPrim = membroRec(elem, primeiro);
        } else {
            estaNoPrim = elem === primeiro;
        }
        estaNoResto = membroRec(elem, lista.slice(1));
        return estaNoPrim || estaNoResto;
	}
}

membroRec(3, [1, [2, 4 3], 5]);

```






















