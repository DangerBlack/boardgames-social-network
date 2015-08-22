function init()
{
	
}

function loadUserSpace(){
	
	$.get("php/getUserInfo.php",function(data){
		if(data=="404"){
			$("#userSpace").html('<li><a href="login.html">Login</a></li>');
		}
		else{
			try{
				js=JSON.parse(data);
				var info=js[0];
				$("#userSpace").html('<li class="dropdown">'+//<img src="'+info.avatar+'" class="small-circle" />
											'<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">'+info.name+' <img src="'+info.avatar+'" class="small-circle" /> <span class="caret"></span></a>'+
											 '<ul class="dropdown-menu" role="menu">'+
												'<li><a href="profile.php">Profilo</a></li>'+
												'<li><a href="library.php">Libreria</a></li>'+
												'<li><a href="library.php?desire=True">Desideri</a></li>'+
												'<li class="divider"></li>'+
												'<li><a href="#">Logout</a></li>'+
											  '</ul>'+
									'</li>');//'<a href="profile.php">'+info.name+' <img src="'+info.avatar+'" class="small-circle" /></a>'
			}catch(e){
				$("#userSpace").html('<li><a href="login.html">Login</a></li>');
			}
		}
	});          
}
function injectRegister(){
	$("#submit").click(function(){
		$(".error-field").html("");
		var user=$("#InputName").val();
		var email=$("#InputEmailFirst").val();
		var email2=$("#InputEmailSecond").val();
		var pswd=$("#InputPswdFirst").val();
		var pswd2=$("#InputPswdSecond").val();
		var error=false;
		if(email!=email2){
			addErrorMessageRegister("Le due email non corrispondono!");
			error=true;
		}
		if(pswd!=pswd2){
			addErrorMessageRegister("Le due password non corrispondono!");
			error=true;
		}
		if(user.length==0){
			addErrorMessageRegister("Lo Username è un campo obbligatorio!");
			error=true;
		}
		if(email.length==0){
			addErrorMessageRegister("La Email è un campo obbligatorio!");
			error=true;
		}
		if(pswd.length==0){
			addErrorMessageRegister("La Password è un campo obbligatorio!");
			error=true;
		}
		if(!error)
		$.post("php/register.php",{"name":user,"email":email,"pswd":pswd},function(data){
			if(data==201){
				location.href="index.html";
			}else{				
				$(".error-field").append("<strong><span class=\"glyphicon glyphicon-remove\"></span> Nome utente o email già in uso!</strong>");
			}
		});
	});
}
function addErrorMessageRegister(message){
	$(".error-field").append("<div class=\"alert alert-danger\" role=\"alert\"><strong><span class=\"glyphicon glyphicon-remove\"></span> "+message+"</strong></div>");
	$(".error-message").show();
}
function injectLogin(){
	$("#login").click(function(){
		var user=$("#user").val();
		var pswd=$("#pswd").val();
		$.post("php/login.php",{"user":user,"pswd":pswd},function(data){
			if(data==200){
				location.href="index.html";
			}else{				
				$(".error-message").html("<strong><span class=\"glyphicon glyphicon-remove\"></span> Nome utente o password errati</strong>");
				$(".error-message").show();
			}
		});
	});
}
function loadGame(id,where,how){
	var where="#gameInfo";
	$.get("php/getGames.php?id="+id,function(data){
		try{
			var js=JSON.parse(data);
			var obj=js[0];
			$(where).append(how(obj));
			loadDinamicPicture("#dinamicPicture",id,createPreviewOfPicture);
			loadComments("#comments",id,createComment);
			aggiungiFunzioniDiAggiuntaLibreria(function(){});
			$(".edit-info").click(function(){
				$(where).html(createNewGameEditor());
				loadNextStep(0);
			});
		}catch(e){
		}
	});
}
function aggiungiFunzioniDiAggiuntaLibreria(callbackRemove){
	$(".libreria").click(function(){
		var isDesire=false;
		var idGame=$(this).attr("value");
		aggiungiGiocoA(idGame,isDesire);
	});
	$(".desideri").click(function(){
		var isDesire=true;
		var idGame=$(this).attr("value");
		aggiungiGiocoA(idGame,isDesire);
	});
	$(".libreria").hover(function(){
		var isDesire=false;
		var idGame=$(this).attr("value");
		controllaSeInLibreria(idGame,isDesire);
	});
	$(".desideri").hover(function(){
		var isDesire=true;
		var idGame=$(this).attr("value");
		controllaSeInLibreria(idGame,isDesire);
	});
	$(".recensione").click(function(){
		$("#recensione").load("archive/html/new_commento.html",function(){
			enableEventOnSubmit();
		});
	});
	$(".remLibreria").click(function(){
		var idGame=$(this).attr("value");
		removeFromLibrary(idGame,false,callbackRemove);
	});
	$(".remDesire").click(function(){
		var idGame=$(this).attr("value");
		removeFromLibrary(idGame,true,callbackRemove);
	});
}
function hideGame(idGames){
	$("#"+idGames).hide();
}
function removeFromLibrary(idGames,isDesire,callback){
	if(isDesire){
		isDesire=1;
	}else{
		isDesire=0;
	}
	$.get("php/deleteGFL.php?idGames="+idGames+"&isDesire="+isDesire,function(data){
		if(data==200){
			callback(idGames);
		}
	});
}
function loadGamesList(where,how){
	$.get("php/getGames.php",function(data){
		try{
			var js=JSON.parse(data);
			for(var i=0;i<js.length;i++){
				var obj=js[i];
				$(where).append(how(obj));
			}
			aggiungiFunzioniDiAggiuntaLibreria(null);
		}catch(e){
		}
	});
}
function loadLibrary(name,isDesire,where,how){
	var desire="";
	if(isDesire){
		desire="&desire=True";
	}
	$.get("php/getGames.php?username="+name+desire,function(data){
		try{
			$(where).html('');
			var js=JSON.parse(data);
			for(var i=0;i<js.length;i++){
				var obj=js[i];
				$(where).append(how(obj));
			}
			aggiungiFunzioniDiAggiuntaLibreria(hideGame);
		}catch(e){
		}
	});
}
function loadDinamicPicture(where,idGame,how){
	
	$.get("php/getPicture.php?idGame="+idGame,function(data){
		try{
			var js=JSON.parse(data);
			for(var i=0;i<js.length;i++){
				var obj=js[i];
				$(where).append(how(obj));
			}
		}catch(e){
		}
	});
}

function loadComments(where,idGame,how){
	
	$.get("php/getReview.php?idGame="+idGame,function(data){
		try{
			$(where).html("");
			var js=JSON.parse(data);
			for(var i=0;i<js.length;i++){
				var obj=js[i];
				$(where).append(how(obj));
			}
			$(".like").click(function(){
				var idRating=$(this).val();
				var q=this;
				$.post("php/addLike.php",{"idRating":idRating},function(data){
					if(200){
						$(q).children(".badge").html(parseInt($(q).children(".badge").html())+1);
						$(q).removeClass("btn-info");
						$(q).addClass("btn-success");
					}
				});
			});
		}catch(e){
		}
	});
}

function loadUserDetail(){
	$.get("php/getUserInfo.php",function(data){
		try{
			var js=JSON.parse(data)[0];
			$("#userAvatar").html('<img src="'+js.avatar+'" alt="'+js.name+'"/>');
			$("#username").html('<strong>'+js.name+'</strong>');
			$("#userDescription").html(js.description);
		}catch(e){
		}
	});
}
function aggiungiGiocoA(idGame,isDesire){
	$.post("php/insertInLibrary.php",{"idGame":idGame,"isDesire":boolToInt(isDesire)},function(data){
		if(data==201){
			if(!isDesire){
				$('.libreria[value='+idGame+']').html("Rimuovi dalla Libreria");
				$('.libreria[value='+idGame+']').attr("class","remLibreria btn btn-sm btn-warning");
			}else{
				$('.desideri[value='+idGame+']').html("Rimuovi da Desideri");
				$('.desideri[value='+idGame+']').attr("class","remLibreria btn btn-sm btn-warning");
			}
		}else{
		}
	});	
}
function boolToInt(bool){
	if(bool)
		return 1;
	else
		return 0;
}
function controllaSeInLibreria(idGame,isDesire){
	$.post("php/isInLibrary.php",{"idGame":idGame,"isDesire":boolToInt(isDesire)},function(data){
		if(data==200){
			if(!isDesire){
				$('.libreria[value='+idGame+']').html("Rimuovi dalla Libreria");
				$('.libreria[value='+idGame+']').attr("class","remLibreria btn btn-sm btn-warning");
				$(".remLibreria").click(function(){
					var idGame=$(this).attr("value");
					removeFromLibrary(idGame,false,function(){
						$('.remLibreria[value='+idGame+']').html("Metti in Libreria");
						$('.remLibreria[value='+idGame+']').attr("class","libreria btn btn-sm btn-success");
					});
				});
			}else{
				$('.desideri[value='+idGame+']').html("Rimuovi da Desideri");
				$('.desideri[value='+idGame+']').attr("class","remDesire btn btn-sm btn-warning");
				$(".remDesire").click(function(){
					var idGame=$(this).attr("value");
					removeFromLibrary(idGame,true,function(){
						$('.remDesire[value='+idGame+']').html("Metti in Libreria");
						$('.remDesire[value='+idGame+']').attr("class","desideri btn btn-sm btn-info");
					});
				});
			}
		}else{
		}
	});	
}

function createComment(obj){
	var q='<div id="'+obj.id+'" class="media">'+
				'<div class="media-left" >'+
					'<p><a href="library.php?username='+obj.name+'"><strong>'+obj.name+'</strong></a></p>'+
					'<div class="media-object" >'+
						'<a href="library.php?username='+obj.name+'"><img src="'+obj.avatar+'" class="avatar-comment" /></a>'+ 
					'</div>'+					
				'</div>'+
				'<div class="media-body" >'+
					'<article>'+
						'<p>'+createStar(obj.review)+'</p>'+
						'<p>Complessita: '+obj.complexity+'</p>'+
						'<p>'+obj.description+'</p>'+
						'<p class="small-data">'+obj.data+'</p>'+
					'</article>'+
				'</div>'+
				'<div class="media-right" >'+
					'<button class="btn btn-primary like" type="button" value="'+obj.id+'"><span class="badge">'+obj.likes+'</span> Like <img src="css/img/love.png" class="mini-img" /> </button>'+
				'</div>'+
		  '</div>';
	return q;
}
function createPreviewOfPicture(obj){
	var q='<div class="col-xs-6 col-md-3">'+
			'<a href="'+obj.picture+'" class="thumbnail">'+
				'<img src="'+obj.picture+'" alt="'+obj.title+'" title="'+obj.title+'">'+
			'</a>'+
		'</div>';
	return q;
}
function enableEventOnSubmit(){
	$("#submit").click(function(){
			alert("lol");
			var idGame=$(".full-game").attr("id");
			var review=$("#star").val();
			var complexity=$("#complexity").val();
			var description=$("#review").val();
			$.post("php/postReview.php",{"idGame":idGame,"review":review,"complexity":complexity,"description":description},function(data){
				if(data==200){
					loadComments("#comments",idGame,createComment);
				}else{
					if(data==500){
						addErrorMessageRegister("I Dati inseriti non sono corretti");
					}else{
						addErrorMessageRegister("Non è stato effettuato il Login");
					}
				}
			});
		});
}
function checkIfNull(x,code){
	if(x!=null){
		return code(x);
	}
	return '';
}
function createFullGameView(obj){
var q='<div id="'+obj.id+'" class="full-game" >'+
			'<div class="row">'+
				'<div class="col-md-3">'+
					'<div class="thumbnail">'+
						'<img src="'+obj.picture+'" alt="broccoli culo"/>'+
					'</div>'+
					'<div class="bottom">'+
						'<p><span>'+createStar(obj.avgReview)+'</span>   [<a href="game.php?id='+obj.id+'#comments">'+obj.countReview+'</a>]</p>'+
					'</div>'+
				'</div>'+
				'<div class="col-md-9 info" >'+
					'<a href="game.php?id='+obj.id+'"><h2 class="name">'+obj.name+'</h2></a>'+
					'<p class="manufacturer">Di <a href="manufacturer.php?id='+obj.idManufacturer+'">'+obj.manufacturer+'</a> nel '+obj.releaseDate+'</p>'+
					checkIfNull(obj.author,function(x){ return '<p class="manufacturer">'+x+'</p>'; })+
					checkIfNull(obj.website,function(x){ return '<p class="manufacturer">Visualizza il sito ufficiale: <a href="'+x+'">Sito ufficiale</a></p>'; })+
					checkIfNull(obj.ruleURL,function(x){ return '<p class="manufacturer">Visualizza il regolamento: <a href="'+x+'">Regolamento</a></p>'; })+
					'<article>'+
					'<h4>Descrizione:</h4>'+
					'<p>'+
						obj.description+
					'</p>'+
					'<h4>Contenuto della confezione:</h4>'+
					'<p>'+
						obj.contents+
					'</p>'+
					'</article>'+
					'<div class="row">'+
						'<div class="col-md-4">Num. Giocatori: '+obj.nMinPlayer+'-'+obj.nMaxPlayer+' <img src="css/img/players.png" class="mini-img" /></div>'+
						'<div class="col-md-4">Età: '+obj.minAge+'-'+obj.maxAge+' <img src="css/img/age.png" class="mini-img" /></div>'+
						'<div class="col-md-4">Durata: '+obj.duration+' <img src="css/img/clock.png" class="mini-img" /></div>'+	
					'</div>'+
					'<div class="row">'+
						'<div class="col-md-4">Complessità: '+obj.complexity+' <img src="css/img/complexity.png" class="mini-img" /></div>'+
						'<div class="col-md-4">Valutazione Media: '+obj.avgReview+' <img src="css/img/love.png" class="mini-img" /></div>'+
						'<div class="col-md-4">Recensioni: '+obj.countReview+' <img src="css/img/comment.png" class="mini-img" /></div>'+	
					'</div>'+				
				'</div>'+
			'</div>'+
			'<div id="dinamicPicture" class="row">'+
			'</div>'+
			'<div class="row gestione">'+
				'<button class="recensione btn btn-sm btn-success" type="button">Recensione</button>'+
				'<button class="libreria btn btn-sm btn-primary" type="button" value="'+obj.id+'">Metti in Libreria</button>'+
				'<button class="desideri btn btn-sm btn-info" type="button" value="'+obj.id+'">Lista Desideri</button>'+
				'<button class="edit-info btn btn-sm btn-warning" type="button">Modifica Info</button>'+
			'</div>'+
			'<hr/>'+
			'<div id="recensione" />'+
			'<a name="comments"></a>'+
			'<div id="comments" class="row">'+
			'</div>'+
		  '</div>';
	return q;
}
function createGameViewLi(obj){
	var q='<div id="'+obj.id+'" class="row">'+
				'<div class="col-md-3">'+
					'<div class="thumbnail">'+
						'<img src="'+obj.picture+'" alt="broccoli culo"/>'+
					'</div>'+
					'<div class="bottom">'+
						'<p><span>'+createStar(obj.avgReview)+'</span>   [<a href="game.php?id='+obj.id+'#comments">'+obj.countReview+'</a>]</p>'+
					'</div>'+
				'</div>'+
				'<div class="col-md-6 info" >'+
					'<a href="game.php?id='+obj.id+'"><h2 class="name">'+obj.name+'</h2></a>'+
					'<p class="manufacturer">Di <a href="manufacturer.php?id='+obj.idManufacturer+'">'+obj.manufacturer+'</a></p>'+
					'<p>'+obj.description.substr(0,180)+'</p>'+
					'<div class="row">'+
					'<div class="col-md-4">Num. Giocatori: '+obj.nMinPlayer+'-'+obj.nMaxPlayer+' <img src="css/img/players.png" class="mini-img" /></div>'+
					'<div class="col-md-4">Età: '+obj.minAge+'-'+obj.maxAge+' <img src="css/img/age.png" class="mini-img" /></div>'+
					'<div class="col-md-4">Durata: '+obj.duration+' <img src="css/img/clock.png" class="mini-img" /></div>'+	
					'</div>'+				
				'</div>'+
				'<div class="col-md-3 manage">'+
					'<button class="libreria btn btn-sm btn-success" value="'+obj.id+'">Metti in Libreria</button><br />'+
					'<button class="desideri btn btn-sm btn-primary" value="'+obj.id+'">Lista desideri</button><br />'+
				'</div>'+
		  '</div>';
	return q;
}

function createStar(avgReview){
	var q="";
	for(var i=0;i<(avgReview/2);i++){
		q+='<img src="css/img/star.png" alt="*" title="'+(avgReview/2)+'" />';
	}
	return q;
}
