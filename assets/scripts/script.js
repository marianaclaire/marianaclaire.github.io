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

	$scope.refresh = function() {
		window.setTimeout(function(){
			initBacklight();
			initPortfolio();
			$(".lazy").lazyload({
				effect : "fadeIn"
			});

			$('.init').fadeOut('fast', function(){
				$('.init').remove();
				$('#side-menu').fadeIn('fast');
				$('#splash-content-container').fadeIn('slow',function(){
					populateBG();
					populateCache();
					window.setTimeout(function(){
						$('#side-menu').slideDown('slow');
					}, 200);
				});
			});

		}, 500);
	};

	$scope.changeLang = function(lang){
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

$(function(){
	$('#side-menu').hide();
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
			window.location.assign("./booking?lang="+currentLang);
		})
	});

	// toggle for more about me section
	// $('.toggle-more-about-me').click(function(){
	// 	$('#more-about-me').finish().slideDown('fast');
	// 	$(this).finish().fadeOut('fast');
	// 	window.setTimeout(function(){
	// 		$('.splash-div').click(function(e){
	// 			if( e.target != this )
 //       				return;
	// 			$('.splash-div').off("click");
	// 			$('#more-about-me').finish().slideUp('fast');
	// 			$('.toggle-more-about-me').finish().fadeIn('fast');
	// 		});
	// 	}, 1000);
	// });

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

	//donation
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
