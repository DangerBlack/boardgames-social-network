<?php
	include "query.php";
	$idRating=$_POST['idRating'];
	if(isLogged()){
		$idUser=getId();
		if(insertLike($idUser,$idRating)){
			echo 201;
		}else{
			echo 500;
		}
	}else{
		echo 403;//manca il login
	}
?>
