<?php
	ini_set('display_errors',1);
	ini_set('display_startup_errors',1);
	error_reporting(-1);
	require  'medoo.min.php';
	function connect(){
		$database = new medoo([
				// required
				'database_type' => 'mysql',
				'database_name' => 'bit_tabletop',
				'server' => 'localhost',
				'username' => 'bit_tabletop',
				'password' => 'bit_tabletop',
				 
				// optional
				'port' => 3306,
				'charset' => 'utf8',
				// driver_option for connection, read more from http://www.php.net/manual/en/pdo.setattribute.php
				'option' => [
				PDO::ATTR_CASE => PDO::CASE_NATURAL
			]
		]);
		return $database;
	}
	
	function getId(){
		$name=$_COOKIE["name"];
		return getIdFromUser($name)[0]['id'];
	}
	function getIdFromUser($name){
		$database=connect();
		$datas=$database->select("user",[
			"id"
		],[
			"name[=]"=>$name
		]);
		return $datas;
	}
	function getMyGames($filter){
		$join=[
			"[>]picture"=>["id"=>"idGames"],
			"[>]manufacturer"=>["idManufacturer"=>"id"],
			"[<]library"=>["id"=>"idGames"]
		];
		return getGamesPrivate($join,$filter);
	}
	function getGames($filter){
		$join=[
			"[>]picture"=>["id"=>"idGames"],
			"[>]manufacturer"=>["idManufacturer"=>"id"]
		];
		return getGamesPrivate($join,$filter);
	}
	function getGamesPrivate($join,$filter){
		$database=connect();
		$datas=$database->select("games", 
		$join,
		[
			"games.id",
			"games.name",
			"picture.picture",
			"games.nMinPlayer",
			"games.nMaxPlayer",
			"games.duration",
			"games.releaseDate",
			"games.description",
			"games.contents",
			"games.minAge",
			"games.maxAge",
			"games.ean",
			"games.idExpansion",
			"games.author",
			"games.ruleURL",
			"games.website",
			"manufacturer.name(manufacturer)",
			"manufacturer.id(idManufacturer)"
		]
		,$filter);
		if($datas!=false){
			foreach($datas as &$data)
			{
				$data["avgReview"]=$database->avg("rating","review"
				,[
					"[=]idGames"=>$data["id"]
				]);
				$data["countReview"]=$database->count("rating","review"
				,[
					"[=]idGames"=>$data["id"]
				]);
				$data["complexity"]=$database->avg("rating","complexity"
				,[
					"[=]idGames"=>$data["id"]
				]);
				$data["typology"]=$database->select("typology",
					[
						"[>]gamesTypo"=>["id"=>"idTypology"]
					],
					["typology.typology"
					],
					[
						"[=]gamesTypo.idGames"=>$data["id"]
					]);
			}
			return $datas;
		}else{
			return 404;
		}
	}
	function getPicture($idGame){
		$database=connect();
		$datas=$database->select("picture",
			[
				"picture",
				"title",
				"idGames"
			],
			[
				"idGames[=]"=>$idGame
			]);
		return $datas;
	}
	function insertPicutre($picture,$title,$idUser,$idGames){
		$database=connect();
		$datas=$database->insert("picture",
			[
				"picture"=>$picture,
				"title"=>$title,
				"idUser"=>$idUser,
				"idGames"=>$idGames
			]);
		return $datas;
	}
	function insertUser($name,$email,$pswd){
		$database=connect();
		$res=$database->insert("user",[
			"name"=>$name,
			"email"=>$email,
			"pswd"=>$pswd
		]);
		return $res;
	}
	function getUser($id){
		$database=connect();
		$res=$database->select("user",[
			"name",
			"avatar",
			"description"
		],[
			"id[=]"=>$id
		]);
		return $res;
	}
	function login($name,$pswd){
		$database=connect();
		$result=$database->has("user",[
			"AND" => [
				"name" => $name,
				"pswd" => $pswd
			]
		]);
		return $result;
	}
	function isLogged(){		
		@$name=$_COOKIE["name"];
		@$pswd=$_COOKIE["pswd"];
		if(login($name,$pswd)){
			return true;
		}else{
			return false;
		}		
	}
	function insertInLibrary($idGame,$idUser,$isDesire){
		$database=connect();
		$ret=$database->insert("library",[
			"idUser"=>$idUser,
			"idGames"=>$idGame,
			"isDesire"=>$isDesire
		]);
		return $ret;
	}
	function insertLike($idUser,$idRating){
		$database=connect();
		$ret=$database->has("likes",[
			"AND" => [
				"idUser" => $idUser,
				"idRating" => $idRating
			]			
		]);
		if(!$ret)
			$ret=$database->insert("likes",[
				"idUser"=>$idUser,
				"idRating"=>$idRating
			]);
		return $ret;
	}
	function isInLibrary($idGame,$idUser,$isDesire){
		$database=connect();
		$ret=$database->has("library",[
			"AND" => [
				"idUser" => $idUser,
				"idGames" => $idGame,
				"isDesire" => $isDesire
			]			
		]);
		return $ret;
	}
	
	function getRating($idGame){
		$database=connect();
		$datas=$database->select("rating", 
			[
				"[>]user"=>["idUser"=>"id"]
			],
			[
				"rating.id",
				"rating.idUser",
				"user.avatar",
				"user.name",
				"rating.complexity",
				"rating.review",
				"rating.data",
				"rating.description"
			],
			[
				"rating.idGames[=]"=>$idGame
			]);
		foreach($datas as &$data)
		{
			$data["likes"]=$database->count("likes","id"
			,[
				"[=]idRating"=>$data["id"]
			]);
		}				
		return $datas;
	}
	
	function insertReview($idUser,$idGame,$review,$complexity,$description){
		$description=htmlspecialchars($description);
		$description=nl2br($description);
		$pattern = '/(http:\/\/[a-z0-9\.\/]+)/i';
		$replacement = '<a href="$1" target="_blank">$1</a>';
		$description = preg_replace($pattern, $replacement, $description); 
		
		
		$database=connect();
		$res=$database->insert("rating",[
			"idGames"=>$idGame,
			"idUser"=>$idUser,
			"complexity"=>$complexity,
			"review"=>$review,
			"description"=>$description
		]);
		return $res;
	}
	function deleteGamesFromLibrary($idUser,$idGame,$isDesire){
		$database=connect();
		$res=$database->delete("library",[
			"AND" => [
				"idUser"=>$idUser,
				"idGames"=>$idGame,
				"isDesire"=>$isDesire
			]
		]);
	}
	function setUserInfo($id,$data){
		$database=connect();
		$res=$database->update("user",$data,[
				"id[=]"=>$id
		]);
	}
	
	/*@$name=$_POST['name'];
	*/
	function insertGame($name,$ean,$author,$nMinPlayer,$nMaxPlayer,$duration,$releaseDate,$minAge,$maxAge,$description,$contents,$website,$ruleURL){
		$name=htmlspecialchars($name);
		$ean=htmlspecialchars($ean);
		$author=htmlspecialchars($author);
		
		$description=htmlspecialchars($description);
		$description=nl2br($description);
		$contents=htmlspecialchars($contents);
		$contents=nl2br($contents);
		$website=htmlspecialchars($website);
		$ruleURL=htmlspecialchars($ruleURL);
		
		$database=connect();
		$res=$database->insert("games",[
			"name"=>$name,
			"ean"=>$ean,
			"author"=>$author,
			"nMinPlayer"=>$nMinPlayer,
			"nMaxPlayer"=>$nMaxPlayer,
			"duration"=>$duration,
			"releaseDate"=>$releaseDate,
			"minAge"=>$minAge,
			"maxAge"=>$maxAge,
			"description"=>$description,
			"contents"=>$contents,
			"website"=>$website,
			"ruleURL"=>$ruleURL
		]);
	}
?>
