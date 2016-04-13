<?php
	// TODO: pegar IP e outras informações
	session_start();
	// header("access-control-allow-origin: *");

  	$answers = $_POST["answers"];
  	$nome = $_SESSION["nome"];
  	$matricula = $_SESSION["matricula"];

  	if ($nome == NULL || $matricula == NULL) {
  		die(json_encode(array(
  			'success' => false,
  			'msg' => 'Faça login primeiro!')));
  	}

	$conn = mysqli_connect("localhost", "root", "root", "mata56");

	if (!$conn) {
  		die(json_encode(array(
  				'success' => false,
  				'msg' => 'Erro de banco de dados: ' . mysqli_connect_error())));
	}
	mysqli_query($conn, "SET NAMES 'utf8'");

	mysqli_query($conn, "CREATE TABLE IF NOT EXISTS prova (
			timestamp DATETIME,
			nome VARCHAR(256),
			matricula VARCHAR(20),
			answers TEXT
		);");

    $sql = $conn->prepare("INSERT INTO prova (timestamp, nome, matricula, answers) VALUES (NOW(), ?, ?, ?);");
	$sql->bind_param("sss", $nome, $matricula, $answers);
	$result = $sql->execute();

	echo json_encode(array('success' => true, msg => 'Os dados foram salvos.'));
?>