function createNewGameEditor(){
	return createGameEditor();
}
//name,author,nMinPlayer,nMaxPlayer,duration,releaseDate,minAge,maxAge,description,contents,website,ruleURL,ean
function createGameEditor(){
	var q='<div class="game-editor">'+
			'<div class="stepper">'+
				'<div class="alert alert-success">'+
					'<p>Step <span id="step"></span> di 4</p>'+
				'</div>'+
			'</div>'+
			'<div id="section">'+
			'</div>'+
			'<div class="row gestione">'+
					'<div class="col-md-3">'+
					'</div>'+
					'<div class="col-md-6">'+
						'<button class="send btn btn-sm btn-primary" type="button" value="0">Invia</button>'+
					'</div>'+
					'<div class="col-md-3">'+
						'<div id="debug"/>'+
					'</div>'+					
			  '</div>'+
		  '</div>';
	return q;
}
function addEventAndChecker(){	
	$('.datepicker').datepicker()
	$("#nMinPlayer").on("focusout",function(){
		removeErrorMessage("#nMinPlayerTrouble");
		checkNPlayer();
	});
	$("#nMaxPlayer").on("focusout",function(){
		removeErrorMessage("#nMaxPlayerTrouble");
		checkNPlayer();
	});
	$("#duration").on("focusout",function(){
		removeErrorMessage("#durationTrouble");
		checkDuration();
	});
	$("#minAge").on("focusout",function(){
		removeErrorMessage("#minAgeTrouble");
		checkAge();
	});
	$("#maxAge").on("focusout",function(){
		removeErrorMessage("#maxAgeTrouble");
		checkAge();
	});
	$("#section").load("archive/html/edit-game-image-uploader.html",function(){
		$(".send").val(5);
		$(".stepper").html('<div class="alert alert-success">'+
												'<p>Caricare una immagine per il gioco!</p>'+
											'</div>');
		var data=3;
		$("#idGame").attr("value",data);
	});
	$(".send").click(function(){
		var step=$(this).val();
		if(step<4){
			$(this).val(parseInt(step)+1);
			saveInLocalStorage();
			loadNextStep(parseInt(step)+1);
		}else{
			if(step==4){
				$(this).val(parseInt(step)+1);
				$.post("php/postGame.php",getGameFromLocalStorage(),function(data,text,xhr){
					alert(data);
					if(xhr.status==200){
						//$("#section").html("SUCCESSO!!!! "+data);
						$("#section").load("archive/html/edit-game-image-uploader.html",function(){
							$(".stepper").html('<div class="alert alert-success">'+
													'<p>Caricare una immagine per il gioco!</p>'+
												'</div>');
							$("#idGame").attr("value",data);
						});
					}
				});
			}else{
				//var data=$('#imageFile').attr('file');
				var data = new FormData();
				jQuery.each(jQuery('#imageFile')[0].files, function(i, file) {
					data.append('file', file);
				});
				data.append('title',$("#title").val());
				data.append('kind',$("#kind .selected").val());
				data.append('idGames',$("#idGame").attr("value"));
				$.ajax({
					url:"php/postImage.php",
					data:data,
					cache:false,
					contentType:false,
					processData:false,
					type:'POST',
					success:function(data){
						alert(data);
					}
				});
				
				/*$.post("php/postImage.php",data,function(data){
					alert(data);
				});*/
			}
		}
	});
}
function loadNextStep(step){
	$("#section").load("archive/html/edit-game-part"+step+".html",function(){
			$("#step").html(step);
			if(step==0){
				localStorage.setItem("gioco", "");
				addEventAndChecker();				
			}
	});
}

function pushInGame(gioco,x,val){
	if((val!=null)){
		gioco[x]=val;
		//eval("gioco."+x+"=\""+val+"\"");
	}
	return gioco;
}
function getGameFromLocalStorage(){
	var gioco=localStorage.getItem("gioco");	
	try{
		if((gioco!="")&&(gioco!=null)){
			gioco=JSON.parse(gioco);
		}else{
			gioco={};
		}
	}catch(e){
		gioco={};
	}
	return gioco;
}
function saveInLocalStorage(){
	var gioco=localStorage.getItem("gioco");
	
	try{
		if((gioco!="")&&(gioco!=null)){
			gioco=JSON.parse(gioco);
		}else{
			gioco={};
		}
	}catch(e){
		gioco={};
	}
	var name=$("#name").val();
	var ean=$("#ean").val();
	var author=$("#author").val();
	var nMinPlayer=$("#nMinPlayer").val();
	var nMaxPlayer=$("#nMaxPlayer").val();
	var duration=$("#duration").val();
	var releaseDate=$("#releaseDate").val();
	var minAge=$("#minAge").val();
	var maxAge=$("#maxAge").val();
	var description=$("#description").val();
	var contents=$("#contents").val();
	var website=$("#website").val();
	var ruleURL=$("#ruleURL").val();
	gioco=pushInGame(gioco,'name',name);
	gioco=pushInGame(gioco,'ean',ean);
	gioco=pushInGame(gioco,'author',author);
	gioco=pushInGame(gioco,'nMinPlayer',nMinPlayer);
	gioco=pushInGame(gioco,"nMaxPlayer",nMaxPlayer);
	gioco=pushInGame(gioco,"duration",duration);
	gioco=pushInGame(gioco,"releaseDate",releaseDate);
	gioco=pushInGame(gioco,"minAge",minAge);
	gioco=pushInGame(gioco,"maxAge",maxAge);
	gioco=pushInGame(gioco,"description",description);
	gioco=pushInGame(gioco,"contents",contents);
	gioco=pushInGame(gioco,"website",website);
	gioco=pushInGame(gioco,"ruleURL",ruleURL);
	$("#debug").html(JSON.stringify(gioco));
	localStorage.setItem("gioco", JSON.stringify(gioco));
}
function removeErrorMessage(where){
	$(where).html('');
}
function addErrorMessage(where,message){
	$(where).html('<div class="alert alert-danger small-error" role="alert"><strong><span class="glyphicon glyphicon-remove"></span> '+message+'</strong></div>');
}
function checkNPlayer(){
	var ok=true;
	var nMinPlayer=$("#nMinPlayer").val();
	var nMaxPlayer=$("#nMaxPlayer").val();
	if(nMinPlayer<0){
		addErrorMessage("#nMinPlayerTrouble","Numero Negativo!");
		ok=false;
	}
	if(nMaxPlayer<0){
		addErrorMessage("#nMaxPlayerTrouble","Numero Negativo!");
		ok=false;
	}
	if(parseInt(nMinPlayer)>parseInt(nMaxPlayer)){
		addErrorMessage("#nMinPlayerTrouble","Numero maggiore di nMaxPlayer");
		ok=false;
	}
	return ok;
}
function checkDuration(){
	var ok=true;
	var duration=$("#duration").val();
	if(duration<0){
		addErrorMessage("#durationTrouble","La durata non può essere negativa!");
		ok=false;
	}
	return ok;
}
function checkAge(){
	var ok=true;
	var minAge=$("#minAge").val();
	var maxAge=$("#maxAge").val();
	if(minAge<0){
		addErrorMessage("#minAgeTrouble","Numero Negativo!");
		ok=false;
	}
	if(maxAge<0){
		addErrorMessage("#maxAgeTrouble","Numero Negativo!");
		ok=false;
	}
	if(parseInt(minAge)>parseInt(maxAge)){
		addErrorMessage("#minAgeTrouble","Numero maggiore di nMaxPlayer");
		ok=false;
	}
	return ok;
}
