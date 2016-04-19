// URL_PREFIX = '/mata56/2016/04/12/';
URL_PREFIX = '';

function processaRetorno(json, silent) {
    var data = JSON.parse(json);
    if (data.msg && data.msg.length > 0 && !silent) {
        alert(data.msg);
    }
}

function processaLogin(json, silent) {
    var data = JSON.parse(json),
        nome = '',
        matricula = '';

    if (data && data.userinfo && data.userinfo.nome) {
        nome = data.userinfo.nome;
    }
    if (data && data.userinfo && data.userinfo.matricula) {
        matricula = data.userinfo.matricula;
    }
    $("#loginbar-nome").text(nome);
    $("#loginbar-matricula").text(matricula);
    processaRetorno(json, silent);
}

/////////////////
// Respostas
/////////////////

function obtemRespostasJson() {
    var answers = codeMirrorEditors.map(ed => ed.getValue());
    json = JSON.stringify({answers : answers});
    return json;
}

function carregaRespostasJson(json) {
    var obj = JSON.parse(json),
        answers = obj.answers;

    codeMirrorEditors.forEach(function (ed, idx) {
        ed.setValue(answers[idx]);
    });
}

/////////////////
// Requests
/////////////////

function checaUsuario() {
    $.post(URL_PREFIX + "checkuser.php",
        {},
        processaLogin);
}

function enviaRespostas(opcoes, silent) {
    var data = {
            answers: obtemRespostasJson(),
            apostila: window.apostila
        };
    if (opcoes !== undefined) {
        data = $.extend(data, opcoes);
    }
    $.post(URL_PREFIX + "save.php",
        data,
        function () { processaLogin(silent); });
}

function login(data) {
    $.post(URL_PREFIX + "login.php",
        data,
        processaLogin);
}

function logout() {
    $.post(URL_PREFIX + "logout.php",
        {},
        processaLogin);
}

/////////////////
// Diálogo de login
/////////////////

function submitLoginDialog() {
    var valid = false,
        data = {};

    data.nome = $("#nome").val();
    data.matricula = $("#matricula").val();
    data.senha = $("#senha").val();

    login(data);

    $("#nome").val('');
    $("#matricula").val('');
    $("#senha").val('');

    loginDialog.dialog("close");
    
    return valid;
}

function showLogin() {
    loginDialog.dialog('open')
}

loginDialog = $("#dialog").dialog({
    autoOpen: false,
    modal: true,
    buttons: {
        "Enviar": submitLoginDialog,
        "Cancelar": function () { loginDialog.dialog("close"); }
    }
});
loginDialog.find("form").on("submit", function (evt) {
    evt.preventDefault();
    submitLoginDialog();
});

/////////////////
// Previne expiração da sessão

$(document).ready(function() {
    // faz uma requisição a cada 10 minutos
    setInterval(checaUsuario, 10 * 60 * 1000);

    // Submete formulario ao clicar em Rodar
    $('.go').each(function (idx, btn) {
        $(btn).on('click', function (buttonIndex) {
                return function () {
                    enviaRespostas({buttonIndex: buttonIndex}, true);
                }
            }(idx)) ;
    });
});