<?php
	include "query.php";
	if(isLogged()){
		$id=getId();
		$description=$_POST['description'];
		setUserInfo($id,[
			"description" => $description
		]);
		echo 201;
	}else{
		echo 404;
	}

?>
