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
