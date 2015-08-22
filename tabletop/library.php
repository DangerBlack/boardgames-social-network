<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
<meta name="author" content="Daniele Baschieri" />
<meta name="description" content="" />
<meta name ="copyright" content="" />
<meta name="keywords" content="" />
<link rel="icon" href="css/favicon.ico" type="image/x-icon"/>
<link rel="shortcut icon" href="css/favicon.ico" type="image/x-icon"/>

<title>Ludonger</title>
<link rel="stylesheet" type="text/css" href="css/default.css" />
<link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/smoothness/jquery-ui.css" />


 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>

<script type="text/javascript" src="js/bootstrap.min.js"></script>

<script type="text/javascript"  src="js/default.js"></script>


 
 <script type="text/javascript" > 
 $(document).ready(function(){
				<?php
					@$username=$_GET['username'];
					@$desire=$_GET['desire'];
					if(isset($username)){						
						echo "var name=\"".$username."\";";
					}else{
						$name=$_COOKIE["name"];
						if(isset($desire))
							header('Location: library.php?username='.$name."&desire=".$desire);
						else
							header('Location: library.php?username='.$name);
						
						exit;
					}
					if(isset($desire)){						
						echo "var desire=\"".$desire."\";";
					}else{
						echo "var desire=false;";
					}
				?>
				if(!desire){
					$("h1").html('La libreria di '+name);
					$(".library").addClass("active");
				}else{
					$("h1").html('La lista dei desideri di '+name);
					$(".desire").addClass("active");
				}
				$(".library").click(function(){
					loadLibrary(name,false,"#gamesList",createGameViewLi);
					$("h1").html('La libreria di '+name);
					$("#option button").removeClass("active");
					$(".library").addClass("active");
				});
				$(".desire").click(function(){
					loadLibrary(name,true,"#gamesList",createGameViewLi);
					$("h1").html('La lista dei desideri di '+name);
					$("#option button").removeClass("active");
					$(".desire").addClass("active");
				});
				loadUserSpace();
				loadLibrary(name,desire,"#gamesList",createGameViewLi);
			});
</script>

</head>

<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Ludonger</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li><a href="index.html">Home</a></li>
            <li class="active"><a href="#">Miei Giochi</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right" id="userSpace">
			  <li><a href="login.html">Login</a></li>			
          </ul>
          <form class="navbar-form navbar-center">
            <input type="text" class="form-control" placeholder="Search...">
          </form>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

    <div class="container">
	  <h1 class="libreria">La libreria</h1>
	  <div class="libreria">
		  <div id="option" class="row">		
				<button class="stats btn btn-sm btn-default" type="button">Statistiche</button>
				<button class="desire btn btn-sm btn-default" type="button">Desideri</button>
				<button class="library btn btn-sm btn-default" type="button">Libreria</button>			
		  </div>
		  <div class="row">
			  <div class="btn-group btn-group-xs" role="group" aria-label="...">
				  <button type="button" class="btn btn-xs btn-default active"><span class="glyphicon glyphicon glyphicon-th-list" aria-hidden="true"></span></button>
				  <button type="button" class="btn btn-xs btn-default"><span class="glyphicon glyphicon glyphicon-th" aria-hidden="true"></span></button>
				  <button type="button" class="btn btn-xs btn-default"><span class="glyphicon glyphicon glyphicon-list-alt" aria-hidden="true"></span></button>
			  </div>
		  </div>
	  </div>
      <div  class="starter-template">
		  <div id="gamesList">
		  </div>
      </div>

    </div><!-- /.container -->

</body>

</html>
