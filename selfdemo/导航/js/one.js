$(function(){
	$('.nav_li').hover(function(){
		$(this).find('h4').css({
			'background':'#ccc',
			'color':'#e7393c'
		});	
		var i=$(this).index();
		$(this).find('dl').stop().fadeIn();
	},function(){
		$(this).find('h4').css({
			'background':'#e7393c',
			'color':'black'
		});
		var i=$(this).index();
		$(this).find('dl').stop().fadeOut();
	})
})