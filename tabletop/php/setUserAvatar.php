<?php
	include "query.php";
	if(isLogged()){
		$id=getId();
		$avatar=$_POST['avatar'];
		setUserInfo($id,[
			"avatar" => $avatar
		]);
		echo 201;
	}else{
		echo 404;
	}

?>
