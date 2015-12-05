var scrollerVisible = false;

$(function(){
	$('.up-scroller').click(function(){
		$("html, body").animate({ scrollTop: "0px" }, 300);
	});
	$( window ).scroll(function() {
		if(!scrollerVisible && $( window ).scrollTop() > 100){
			scrollerVisible = true;
			$('.up-scroller').fadeIn();
		}else if (scrollerVisible && $( window ).scrollTop() < 100){
			scrollerVisible = false;
			$('.up-scroller').fadeOut();
		}
	});
});