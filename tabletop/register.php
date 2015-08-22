<?php
	include('query.php');
	$mail=$_POST['mail'];
	$pswd=$_POST['pswd'];
	$out=insertUser($mail,$pswd);
	if($out!=false){
		$expire=time()+60*60*24*30;
		setcookie("mail", $mail, $expire);
		setcookie("pswd", $pswd, $expire);
		echo 200;
		return "200";
	}else{
		return "500";
	}
?>
