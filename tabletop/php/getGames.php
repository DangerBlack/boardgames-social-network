<?php
	include "query.php";
	
	@$id = $_GET['id'];
	@$username = $_GET['username'];
	@$desire =$_GET['desire'];
	if(isset($id)){
			$datas = getGames([
				"games.id[=]"=>$id,
				"GROUP"=>"games.id"
			]);
	}else{
		if(isset($username)){
			$id=getIdFromUser($username)[0]['id'];
			if(isset($desire)){
				$datas = getMyGames([
					"AND"=>[
						"library.idUser"=>$id,
						"library.isDesire"=>1
					],
					"GROUP"=>"games.id"
				]);
			}else{			
				$datas = getMyGames([
					"AND"=>[
						"library.idUser"=>$id,
						"library.isDesire"=>0
					],
					"GROUP"=>"games.id"
				]);
			}
		}else{
			$datas = getGames([
				"GROUP"=>"games.id"
			]);
		}
	}
	
	/*foreach($datas as $data)
	{
		echo "name:" . $data["name"] . " - id:" . $data["id"] . "<br/>";
	}*/
	echo json_encode($datas);
?>
