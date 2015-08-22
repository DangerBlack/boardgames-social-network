<?php
	include "query.php";
	$name=$_POST['user'];
	$pswd=$_POST['pswd'];
	if(login($name,$pswd)){
		setcookie("name", $name, time() + (86400 * 30 * 30), "/");
		setcookie("pswd", $pswd, time() + (86400 * 30 * 30), "/");
		echo 200;
	}else{
		echo 403;
	}

?>
