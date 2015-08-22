<?php
	include "query.php";
	$idGames=$_GET['idGames'];
	$idDesire=$_GET['isDesire'];
	if(isLogged()){
			$idUser=getId();
			deleteGamesFromLibrary($idUser,$idGames,$idDesire);
			echo 200; 
	}else{
		echo 403;
	}

?>
