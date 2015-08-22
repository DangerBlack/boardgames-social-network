<?php
	include "query.php";
	$idGame=$_POST['idGame'];
	$isDesire=$_POST['isDesire'];
	if(isLogged()){
		$id=getId();
		if(!isInLibrary($idGame,$id,$isDesire)){
			$ret=insertInLibrary($idGame,$id,$isDesire);
			if($ret){
				echo 201;//inserito
			}else{
				echo 500;//errore interno
			}
		}else{
			return 200;//gia nella libreria
		}
	}else{
		echo 403;//manca il login
	}
?>
