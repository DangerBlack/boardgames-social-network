<?php
	include "query.php";
	$idGame=$_GET['idGame'];
	echo json_encode(getRating($idGame));

?>
