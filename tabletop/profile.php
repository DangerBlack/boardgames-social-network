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
<script type="text/javascript"  src="js/profile-user.js"></script>

 
 <script type="text/javascript" > 
 $(document).ready(function(){
				initProfile();
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
            <li><a href="library.php">Miei Giochi</a></li>
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

      <div  class="starter-template">
		  <div id="userDetails" class="row">
			  <div class="col-md-4">
				 <div id="username"></div> 
				 <div class="thumbnail" id="userAvatar">
				 </div>
				 <button class="avatar-edit btn btn-xs btn-info" type="button">Modifica</button>
				 <button class="avatar-send btn btn-xs btn-info" type="button">Invia</button>
			  </div>
			  <div class="col-md-4">
				  <h2>Descrizione</h2>
				  <article id="userDescription">
				  </article>
				  <div>
					<button class="description-edit btn btn-xs btn-info" type="button">Modifica</button>
					<button class="description-send btn btn-xs btn-info" type="button">Invia</button>
				  </div>
			  </div>
			  <div class="col-md-4">
				  <h2>Amici</h2>
			  </div>
		  </div>
      </div>

    </div><!-- /.container -->

</body>

</html>
