<?php
	include "query.php";
	$idGame=$_GET['idGame'];
	
	$datas=getPicture($idGame);
	echo json_encode($datas);
?>
