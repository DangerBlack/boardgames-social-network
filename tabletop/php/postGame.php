<?php
	include "query.php";
	
	@$name=$_POST['name'];
	@$ean=$_POST['ean'];
	@$author=$_POST['author'];
	@$nMinPlayer=$_POST['nMinPlayer'];
	@$nMaxPlayer=$_POST['nMaxPlayer'];
	@$duration=$_POST['duration'];
	@$releaseDate=$_POST['releaseDate'];
	@$minAge=$_POST['minAge'];
	@$maxAge=$_POST['maxAge'];
	@$description=$_POST['description'];
	@$contents=$_POST['contents'];
	@$website=$_POST['website'];
	@$ruleURL=$_POST['ruleURL'];
	
	if(($name==null)&&($name=="")){
		http_response_code(500);
		//echo 500;
		die;
	}
	$id=insertGame($name,$ean,$author,$nMinPlayer,$nMaxPlayer,$duration,$releaseDate,$minAge,$maxAge,$description,$contents,$website,$ruleURL);
	http_response_code(200);
	echo $id;
?>
