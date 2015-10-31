function popupPortfolio(i){
	$clicked = $('#portImage-'+i);
	$('#popupPortfolio img').attr("src", $clicked.data('image'));
	$('#popupPortfolio h1').html($('#portImage-'+i+' .portfolio-image-title').html());
	$('#popupPortfolio p').html($('#portImage-'+i+' .portfolio-image-description').html());
	$('#popupPortfolio').fadeIn('fast');
}

function initPortfolio(){
	$('body').append('<div id="popupPortfolio"><img><h1></h1><p></p></div>');
	$('.portfolio-image').each(function(i){
		var image = $(this).data('image');
		console.log(image);
		$(this).css({'background-image': 'url('+image+')'});
		$(this).data('index', i);
		$(this).attr('id','portImage-'+i);
		$(this).click(function(){
			popupPortfolio($(this).data('index'));
		});
	});
	$('#popupPortfolio').click(function(e){
		if( e.target != this )
       		return;
		$(this).fadeOut('fast');
	});
}