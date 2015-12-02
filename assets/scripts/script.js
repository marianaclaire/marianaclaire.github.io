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
	// $scope.certificate = certificate;

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

function checkIsMobile(){
	return $(window).width() <= 720;
}
var menuDown = false;
var menuToggle = false;
var isMobile = checkIsMobile();

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
				$('.menu-slide-btn#'+i).removeClass('active');
			}
			$('#'+i).addClass('active');
			if($('#bg-'+i).attr('id') != currentSplash){
				currentSplash = $('#bg-'+i).attr('id');
				$('#bg-'+i).fadeIn('slow');
				$('.menu-slide-btn#'+i).addClass('active');
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
	$('#story-next').click(function(){
		var i = parseInt($(this).data('index'));
		var oldBlock = $('#story-'+(i-1));
		var block = $('#story-'+i);
		if (block.length == 0){
			i = 0;
			$(this).data('index', i);
			$('#story-next strong').html(story.next[currentLang]);
		}else{
			var nextBlock = $('#story-'+(i+1));
			if (nextBlock.length == 0)
				$('#story-next strong').html(formValues.back[currentLang]);
		}
		$(oldBlock).fadeOut('fast', function(){
			var i = parseInt($('#story-next').data('index'));
		console.log(i+1);
			$('#story-'+i).fadeIn();
			$('#story-next').data('index', i+1);
		});

	});
	$('.mobile-menu-btn').click(function(){
		if (!menuToggle){
			menuToggle = true;
			$('.menu-slide-btn').css('display', 'block');
			$('.menu-slide-btn').finish().animate({
				'opacity':'1'
			}, 200);
		}else{
			menuToggle = false;
			$('.menu-slide-btn').finish().animate({
				'opacity':'0'
			}, 200, function(){
				$('.menu-slide-btn').css('display', 'none');
			});
		}
	});
	$( window ).resize(function() {
		var temp = checkIsMobile();
		console.log(temp);
		if (isMobile != temp){
			isMobile = temp
			if (isMobile){
				$('.menu-slide-btn').css('display', 'none');
				$('.menu-slide-btn').finish().animate({
					'opacity':'0'
				}, 200);
			}else{
				menuToggle = false;
				$('.menu-slide-btn').css('display', 'inline-block');
				$('.menu-slide-btn').finish().animate({
					'opacity':'1'
				}, 200);
			}
		}
	});
}());

// GA

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-69806378-1', 'auto');
ga('send', 'pageview');
