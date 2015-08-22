<?php
	include "query.php";
	if(isLogged()){
		$id=getId();
		echo json_encode(getUser($id));
	}else{
		echo 404;
	}

?>
