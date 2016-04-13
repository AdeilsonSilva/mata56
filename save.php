<?php
	// TODO: pegar IP e outras informações
	session_start();
	// header("access-control-allow-origin: *");

  	$answers = $_POST["answers"];
  	$apostila = $_POST["apostila"];
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

	mysqli_query($conn, "CREATE TABLE IF NOT EXISTS resposta (
			timestamp DATETIME,
			apostila VARCHAR(20),
			nome VARCHAR(256),
			matricula VARCHAR(20),
			answers TEXT
		);");

    $sql = $conn->prepare("INSERT INTO resposta (timestamp, apostila, nome, matricula, answers) VALUES (NOW(), ?, ?, ?, ?);");
	$sql->bind_param("ssss", $apostila, $nome, $matricula, $answers);
	$result = $sql->execute();

	echo json_encode(array('success' => true, msg => 'Os dados foram salvos.'));
?>