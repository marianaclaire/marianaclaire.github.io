var isMobile = {
	ENG: "",
	FREN: "",
	ESP: ""
};
if( screen.width <= 480 ) {
    // assume it's mobile..
	var isMobile = {
		ENG: "Please click on the hand to proceed booking.<hr>",
		FREN: "Tappez sur la main pour continuer la reservation<hr>",
		ESP: ""
	};
}

// parse URL to get language
var validLangs = ["ENG", "FREN", "ESP"]
function parseURL(){
	var args = window.location.href.split('#');
	if (args.length > 1 && validLangs.indexOf(args[1]) > 0){
		return args[1];
	}
	return "ENG";
}
var currentLang = parseURL();

// angular
var app = angular.module('app', []);

angular.module('app')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

function viewCtrl($scope) {
	$scope.languageOpt = currentLang;
	$scope.services = services;
	$scope.drawings = drawingsDB;
	$scope.story = story;
	$scope.serviceText = serviceText;
	$scope.sampleDrawing = sampleDrawing;
	$scope.formValues = formValues;
	$scope.titles = titles;
	$scope.contact = contact;
	$scope.support = support;
	$scope.mobileTab = isMobile;

	$scope.refresh = function() {
		window.setTimeout(function(){
			initBacklight();
			initPortfolio();
			$('#side-menu').slideDown('slow');

			var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'widget.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}
		}, 500);
	};

	$scope.changeLang = function(lang){
		// window.location.href = "./#"+lang;
		window.open('./#'+lang, "_parent");
		window.location.reload();
	}
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
	console.log(cachePosition);
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
	console.log(data)
	$.ajax({
       type: "POST",
       url: "https://sheetsu.com/apis/0bfdda88",
       data: data })
    .done(function(res) {
    	console.log(res);
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
	//language
	$('.lang-'+currentLang).css({
		'display': 'inline-block'
	});

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

			if(!formShowing){
				formShowing = true;
				$("html, body").css({'overflow-y' : 'hidden'});
				$('#form-hide').fadeOut('fast', function(){
					$('#typeform-widget').fadeIn('fast');
				});
			}
		})
	});
	$('#cancel-book-btn').click(function(){
		if(formShowing){
			formShowing = false;
			$("html, body").css({'overflow-y' : 'scroll'});
			$('#typeform-widget').fadeOut('fast', function(){
				$('#form-hide').fadeIn('fast');
			});
		}
	});

	$('#bookingForm').submit(function(){
		$(this).attr('disabled','disabled');
		var data = $('#bookingForm').serialize() + '&created_at='+getCurrentDateTime();
		postBooking(data, function(){
			$('#typeform-widget').fadeOut('fast', function(){
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

	// toggle for more about me section
	$('.toggle-more-about-me').click(function(){
		$('#more-about-me').finish().slideDown('fast');
		$(this).finish().fadeOut('fast');
		window.setTimeout(function(){
			$('.splash-div').click(function(e){
				if( e.target != this )
       				return;
				$('.splash-div').off("click");
				$('#more-about-me').finish().slideUp('fast');
				$('.toggle-more-about-me').finish().fadeIn('fast');
			});
		}, 1000);
	});

	// toggle for subscription
	$('#subscribe-btn').click(function(){
		$('#mc_embed_signup.'+currentLang).slideDown();
		$(this).fadeOut('fast');
		$('.subscription.success-message').fadeOut('fast');
		$('.donation.success-message').fadeOut('fast');
	});
	$('.subscribe-btn-cancel').click(function(){
		$('#mc_embed_signup.'+currentLang).slideUp();
		$('#subscribe-btn').fadeIn('fast');
	});
	$('.subscribe-btn-submit').click(function(){
		$('#mc_embed_signup.'+currentLang).slideUp();
		$('#subscribe-btn').fadeIn('fast');
		$('.subscription.success-message').fadeIn('fast');
	})

	//donatin
	$('#donate-btn').click(function(){
		$('#paypal-donate-form').slideDown();
		$(this).fadeOut('fast');
		$('.subscription.success-message').fadeOut('fast');
		$('.donation.success-message').fadeOut('fast');
	});
	$('#donate-btn-cancel').click(function(){
		$('#paypal-donate-form').slideUp();
		$('#donate-btn').fadeIn('fast');
	});
	$('#donate-btn-submit').click(function(){
		$('#paypal-donate-form').slideUp();
		$('#donate-btn').fadeIn('fast');
		$('.donation.success-message').fadeIn('fast');
	})
}());
