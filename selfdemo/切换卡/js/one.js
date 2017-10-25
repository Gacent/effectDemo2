$(function(){
	$('.tabs .header li').on('mouseover',function(){
		$(this).stop().addClass('active').siblings('li').removeClass('active');
		var i=$(this).index();
		$('.content li ul').eq(i).stop().fadeIn().parent().siblings('li').find('ul').stop().fadeOut();
	});
})