var isMobile = {
	ENG: "",
	FREN: "",
	ESP: ""
};
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) var isMobile = {
	ENG: "Please click on the hand to proceed booking.<hr>",
	FREN: "Tappez sur la main pour continuer la reservation<hr>",
	ESP: ""
};

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
