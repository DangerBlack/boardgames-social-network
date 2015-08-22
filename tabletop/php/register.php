<?php
	include "query.php";
	$name=$_POST['name'];
	$email=$_POST['email'];
	$pswd=$_POST['pswd'];
	$res=insertUser($name,$email,$pswd);
	if($res){
		echo 201;
	}else{
		echo 403;
	}
?>
