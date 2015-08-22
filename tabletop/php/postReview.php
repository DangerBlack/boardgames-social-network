<?php
	include "query.php";
	$idGame=$_POST['idGame'];
	$review=$_POST['review'];
	$complexity=$_POST['complexity'];
	$description=$_POST['description'];
	if(isLogged()){
		$idUser=getId();
		if(($complexity>=0)&&($complexity<=10)&&($review>=0)&&($review<=10)){
			insertReview($idUser,$idGame,$review,$complexity,$description);
			echo 200;
		}else{
			echo 500;
		}
	}else{
		echo 403;
	}
?>
