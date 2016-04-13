// URL_PREFIX = '/mata56/2016/04/12/';
URL_PREFIX = '';

function processaRetorno(json) {
    console.log(data);
    var data = JSON.parse(json);
    if (data.msg && data.msg.length > 0) {
        alert(data.msg);
    }
}

function processaLogin(json) {
    console.log(data);
    var data = JSON.parse(json);
    $("#loginbar-nome").text(data.userinfo.nome);
    $("#loginbar-matricula").text(data.userinfo.matricula);
    processaRetorno(json);
}

/////////////////
// Requests
/////////////////

function checaUsuario() {
    $.post(URL_PREFIX + "checkuser.php",
        {},
        processaLogin);
}

function enviaRespostas() {
    $.post(URL_PREFIX + "save.php",
        {answers: obtemRespostasJson()},
        processaRetorno);
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

