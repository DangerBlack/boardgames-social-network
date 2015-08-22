<?php
	include "query.php";
	$idGame=$_POST['idGame'];
	$isDesire=$_POST['isDesire'];
	if(isLogged()){
		$id=getId();
		if(isInLibrary($idGame,$id,$isDesire)){
			echo 200;
		}else{
			echo 500;
		}
	}else{
		echo 403;//manca il login
	}
?>
