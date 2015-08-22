function initProfile(){
	loadUserSpace();
	loadUserDetail();
	$(".description-send").hide();
	$(".avatar-send").hide();
	//loadGamesList("#gamesList",createGameViewLi);
	$(".description-edit").click(function(){
		var desc=$("#userDescription").text();
		$("#userDescription").html('<textarea id="desc-area">'+desc+'</textarea>');
		$(".description-edit").hide();
		$(".description-send").show();
		$(".description-send").click(function(){
			var description=$("#desc-area").val();
			$.post("php/setUserDescription.php",{"description":description},function(data){
				$("#userDescription").text(description);
				$(".description-edit").hide();
				$(".description-send").show();
			});
		});
	});
	$(".avatar-edit").click(function(){
		var avatar=$("#userAvatar img").attr("src");
		$("#userAvatar").html('<label>URL: </label><input id="desc-area" type="text" value="'+avatar+'" />');
		$(".avatar-edit").hide();
		$(".avatar-send").show();
		$(".avatar-send").click(function(){
			var avatar=$("#desc-area").val();
			$.post("php/setUserAvatar.php",{"avatar":avatar},function(data){
				$("#userAvatar").html('<img src="'+avatar+'" />');
				$(".avatar-edit").hide();
				$(".avatar-send").show();
			});
		});
	});
}
