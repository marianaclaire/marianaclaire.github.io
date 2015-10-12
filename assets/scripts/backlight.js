

function initBacklight(){
	$('.backlight').each(function(){
		var color = $(this).data('color');
		var rgbaCol = 'rgba(' + parseInt(color.slice(-6,-4),16)
		    + ',' + parseInt(color.slice(-4,-2),16)
		    + ',' + parseInt(color.slice(-2),16)
		    +',1)';
		$(this).hover(function(){
			$(this).css({
				'background': '-moz-linear-gradient(top, '+rgbaCol+' 0%, rgba(0,0,0,0) 100%)',
				'background': '-webkit-gradient(linear, left top, left bottom, color-stop(0%, '+rgbaCol+'), color-stop(100%, rgba(0,0,0,0)))',
				'background': '-webkit-linear-gradient(top,  '+rgbaCol+' 0%,rgba(0,0,0,0) 100%)',
				'background': '-o-linear-gradient(top,  '+rgbaCol+' 0%,rgba(0,0,0,0) 100%)',
				'background': '-ms-linear-gradient(top,  '+rgbaCol+' 0%,rgba(0,0,0,0) 100%)',
				'background': 'linear-gradient(to bottom,  '+rgbaCol+' 0%,rgba(0,0,0,0) 100%)',
				'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr="'+color+'", endColorstr="#000",GradientType=0 )'
			});
		}, function(){
			$(this).css({
				'background': 'transparent',
				'filter': 'none'
			});
		});
	});
}