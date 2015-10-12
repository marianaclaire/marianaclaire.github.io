// angular
var app = angular.module('app', []);

angular.module('app')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

function viewCtrl($scope) {
	$scope.services = services;
	$scope.drawings = drawingsDB.drawings;

	$scope.refresh = function() {
		window.setTimeout(function(){
			initBacklight();
			initPortfolio();
			$('#side-menu').slideDown('slow');
		}, 500);
	};
}


// menu highligher
var cachePosition = {};
var currentSplash = ''

function populateBG(){
	$('.splash-div').each(function(i, e){
		var div = document.createElement('div');
		$(div).addClass('splash-bg');
		$(div).attr('id','bg-'+$(e).data('id'));
		$(div).css({
			'background-image':'url("'+$(e).data('image')+'")'
		});
		$(div).hide();
		$('#splash-bg-container').append(div);
		if (i == 0){
			currentSplash = $(div).attr('id');
			$(div).fadeIn('slow');
		}
	});
}

function populateCache(){
	var splashCount = $('.splash-div').length;
	$('.splash-div').each(function(i, e){
		var top = $(e).position().top-$(window).height()*0.312;
		cachePosition[$(e).data('id')] =
		{
			top:top,
			buttom: splashCount == i+1 ? $(document).height() + 1000 :
							$(e).height() + top,
		}

	});
}

var menuDown = false;

function showMenuColor(top){
	var thr = $(window).height()*0.618;
	if(top > thr && !menuDown){
		menuDown = true;
		// $('#side-menu').slideDown('slow');
		 $('#side-menu').addClass('active');
	}else if(top < thr && menuDown){
		menuDown = false;
		// $('#side-menu').slideUp('slow');
		$('#side-menu').removeClass('active');
	}
}

function refreashMenuHighlight(){
	for(var i in cachePosition){
		var top = $('#side-menu').offset().top;
		showMenuColor(top);
		if (top > cachePosition[i].top &&
			top < cachePosition[i].buttom){

			for(var j in cachePosition){
				if (j==i) continue;
				$('#'+j).removeClass('active');
				$('#bg-'+j).fadeOut('slow');
			}
			$('#'+i).addClass('active');
			if($('#bg-'+i).attr('id') != currentSplash){
				currentSplash = $('#bg-'+i).attr('id');
				$('#bg-'+i).fadeIn('slow');
			}
		}
	}
}

window.onscroll = function(){
	refreashMenuHighlight();
}

window.onresize = function(){
	populateCache();
	refreashMenuHighlight();
}

var formShowing = false;

function postBooking(data, callback){
	$.ajax({
       type: "POST",
       url: "https://sheetsu.com/apis/97c61c43",
       data: data })
    .done(function(res) {
		callback();
	})
	.fail(function(res) {
		alert("Service Error. Please contact me by email or Skype for your booking.");
	});
}

function getCurrentDateTime(){
	var currentdate = new Date();
	return  currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/"
            + currentdate.getFullYear() + " "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
}

$(function(){
	$('#side-menu').hide();
	populateBG();
	populateCache();

	//slide btn
	$('.menu-slide-btn').each(function(){
		$(this).click(function(){
			var top = $('a[name="'+$(this).data('id')+'"]').position().top - $('#side-menu').height();
			$("html, body").animate({ scrollTop: top+"px" }, 300);
		});
	});

	// form
	$('.book-toggle-btn').each(function(){
		$(this).click(function(){
			$("html, body").animate({ scrollTop: "0px" }, 300, function(){
				if(!formShowing){
					formShowing = true;
					$('#form-hide').fadeOut('fast', function(){
						$('#bookingForm-display').fadeIn('fast');
					});
				}
			});
		})
	});
	$('#cancel-book-btn').click(function(){
		if(formShowing){
			formShowing = false;
			$('#bookingForm-display').fadeOut('fast', function(){
				$('#form-hide').fadeIn('fast');
			});
		}
	});

	$('#bookingForm').submit(function(){
		$(this).attr('disabled','disabled');
		var data = $('#bookingForm').serialize() + '&created_at='+getCurrentDateTime();
		postBooking(data, function(){
			$('#bookingForm-display').fadeOut('fast', function(){
				$("#success-message").fadeIn('fast');
				$('#send-book-btn').removeAttr('disabled');
				window.setTimeout(function(){
					$("#success-message").fadeOut('fast', function(){
						$('#form-hide').fadeIn('fast');
						formShowing = false;
					});
				}, 1500);
			});
		});
	});
}());
