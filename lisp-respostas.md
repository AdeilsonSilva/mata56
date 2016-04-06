---
layout: lisp
title:  "Lisp: respostas"
date:   2016-03-30 16:40:00 -0300
categories: aula
---

# Respostas da aula anterior

```lisp
;;;;;;;;;;;;;;;;;;;;
;; length
;;;;;;;;;;;;;;;;;;;;
(defun length (lista)
  (cond
    ((null lista) 0)
    (t (+ 1 (length (cdr lista))))))
; testes
(print (length '()))
(print (length '(1)))
(print (length '(1 2 3)))

;;;;;;;;;;;;;;;;;;;;
;; filter
;;;;;;;;;;;;;;;;;;;;
(defun filter (f l)
  (cond
    ((null l) '())
    ((f (car l)) (cons (car l) (filter f (cdr l))))
    (t (filter f (cdr l)))))
; testes
(print
   (filter
      (lambda (x) (< x 10))
      '(3 12 6 15 9)))

;;;;;;;;;;;;;;;;
;; all
;;;;;;;;;;;;;;;;
(defun all (f lista)
  (cond
    ((null lista) t)
    (t
      (and
        (f (car lista))
        (all f (cdr lista))))))
; testes
(defun par (x) (= (% x 2) 0))
(print (all par '()))
(print (all par '(2 4 6)))
(print (all par '(1 2 4 6)))


;;;;;;;;;;;;;;;;;;;;;;;
;; atom-list
;;;;;;;;;;;;;;;;;;;;;;;

; (if condicao valorV valorF)
; ==
; (cond (condicao valorV) (t valorF))
; ==
; condicao ? valorV : valorF (em C)

(defun atom-list (lista)
  (cond 
    ((null lista) t)
    (t (and
      (atom (car lista))
      (atom-list (cdr lista))))))
; testes
(print (atom-list '(a 2 c)))  ; t
(print (atom-list '()))   ; t
(print (atom-list '(a b (c d)))) ; f
(print (atom-list '((a b))  )) ; f

; OBS.: no Common Lisp, (atom 2) retorna verdadeiro;
;       no Javathcript, retorna falso.

;;;;;;;;;;;;;;;;;;;;;
;; member
;;;;;;;;;;;;;;;;;;;;;

(defun member (x l)
  (cond
    ((null l) Nil)
    ((equal x (car l)) t)
    (t (member x (cdr l)))))
; testes
(print (member 1 '()))  ; f
(print (member 1 '(1)))  ; t
(print (member 1 '(2 3)))  ; f
(print (member 1 '(2 3 1)))  ; t
(print (member 1 '(1 1 1)))  ; t
(print (member 1 '(2 3 (1))))  ; f

; OBS.: no Common Lisp, (equal 1 '(1)) retorna falso;
;       no Javathcript, retorna verdadeiro.


;;;;;;;;;;;;;;
; Defina a função (lista_par l) que retorna verdadeiro se e somente se a lista l contém um número par de elementos. Não use a função length.
;;;;;;;;;;;;;;

(define else t)
(defun lista_par (l)
  (cond
    ((null l) t)   ; lista vazia
    ((not (null (cdr l)))  ; lista com pelo menos 2 elementos
      (lista_par (cdr (cdr l))))
    (else Nil)))  ; lista com um elemento

(defun lista_par (l)
  (cond
    ((null l) t)   ; lista vazia
    ((null (cdr l)) Nil)  ; lista com um elemento
    (else  ; lista com pelo menos 2 elementos
      (lista_par (cddr l)))))

(defun lista_par (l)
  (cond
    ((null l) t)
    (t (not (lista_par (cdr l))))))
; testes
(print (lista_par '()))      ; t
(print (lista_par '(1)))     ; f
(print (lista_par '(1 2)))   ; t
(print (lista_par '(1 2 3))) ; f
(print (lista_par '((2 3)))) ; f


;;;;;;;;;;;;;;;;;;;;;;;
;; ACUMULADORES
;;;;;;;;;;;;;;;;;;;;;;;

(defun length (lista)
  (cond
    ((null lista) 0)
    (t (+ 1 (length (cdr lista))))))


(defun length-acum (lista acum)
  (cond
    ((null lista) acum)
    (t (length-acum (cdr lista) (+ 1 acum)))))
(defun length (lista)
  (length-acum lista 0))

; testes
(print (length '()))  ; 0
(print (length '(a)))  ; 1
(print (length '(a b)))  ; 2
(print (length '(a b c)))  ; 3
(print (length '(a (b c))))  ; 2


;;;;;;;;;;;;;;;
;; fatorial
;;;;;;;;;;;;;;;

(defun fatorial (n)
  (cond
    ((<= n 1) 1)
    (t (* n (fatorial (- n 1))))))

(defun fatorial-acum (n acum)
  (cond
    ((<= n 1) acum)
    (t (fatorial-acum (- n 1) (* n acum)))))
(defun fatorial (n)
  (fatorial-acum n 1))

; testes
(print (fatorial 0)) ; 1
(print (fatorial 1)) ; 1
(print (fatorial 2)) ; 2
(print (fatorial 3)) ; 6
(print (fatorial 4)) ; 24
(print (fatorial 5)) ; 120
(print (fatorial 1500))
```