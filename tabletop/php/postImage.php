<?php
	include "query.php";
	if(isLogged()){
		if(isset($_FILES["file"]["type"]))
		{
			echo $_FILES["file"]["type"];
			$validextensions = array("jpeg", "jpg", "png");
			$temporary = explode(".", $_FILES["file"]["name"]);
			$file_extension = end($temporary);
			if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")
				) && ($_FILES["file"]["size"] < 500000)//Approx. 100kb files can be uploaded.
				&& in_array($file_extension, $validextensions)) {
					if ($_FILES["file"]["error"] > 0)
					{
						//echo "Return Code: " . $_FILES["file"]["error"] . "<br/><br/>";
						echo 503;
					}
					else
					{
						$saveFile=uniqid('image').".".$file_extension;
						
						if (file_exists("upload/" . $saveFile)) {
							//echo $_FILES["file"]["name"] . " <span id='invalid'><b>already exists.</b></span> ";
							echo 503;
						}
						else
						{
							$sourcePath = $_FILES['file']['tmp_name']; // Storing source path of the file in a variable
							$targetPath = "../upload/".$saveFile; // Target path where file is to be stored
							move_uploaded_file($sourcePath,$targetPath) ; // Moving Uploaded file
							
							$title=$_POST['title'];
							$kind=$_POST['kind'];
							$idUser=getId();
							$idGames=$_POST['idGames'];
							insertPicutre('upload/'.$saveFile,$title,$idUser,$idGames);
							
						}
					}
			}
			else
			{
				echo 503;
				//echo "<span id='invalid'>***Invalid file Size or Type***<span>";
			}
		}
	}else{
		echo 403;
	}
?>
