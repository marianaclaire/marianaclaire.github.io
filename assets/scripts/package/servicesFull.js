var services = {
	readings: {
		name: "Readings",
		description: "Readings are done using my channeling abilities via video call, so I would ask your higher self, guides or the archangels for information about you to answer to your questions. I can also go into your Akashic records if you would like to know about your past lives and I also like to pick up tarot and oracle cards sometimes. ",
		faIcon: "fa-eye",
		faIconBase: "fa-sun-o",
		color: "#FF6666",
		slug: "readings",
		image:"r.jpg"
	},
	drawings: {
		name: "Soul Drawings",
		description: "Soul drawings contain messages from your higher self or guides. It holds information of a past life and of this life. I will use colors, symbols or phrases that would be beneficial to you to know at that moment. I will also include a detailed report with the drawing so you would know how to use it to meditate and heal yourself and about how to interpret them. Its presence is healing to you because of its high frequency and colors.",
		faIcon: "fa-pencil",
		faIconBase: "fa-user",
		color: "#FF9933",
		slug: "drawings",
		image:"y.jpg"
	},
	paintings: {
		name: "Soul Paintings",
		description: "Soul paintings differ from soul drawings because I will use Photoshop to paint them. On average a soul painting will take around 6 hours to complete and will be very detailed. It will contain messages from your higher self or guides. It holds information of a past life and of this life. I will use colors, symbols or phrases that would be beneficial to you to know at that moment. I will also include a detailed report with the drawing so you would know how to use it to meditate and heal yourself and about how to interpret them. Its presence is healing to you because of its high frequency and colors.",
		faIcon: "fa-paint-brush ",
		faIconBase: "fa-user",
		color: "#33CC33",//"#CCCC00",
		slug: "paintings",
		image:"g.jpg"
	},
	alchemy: {
		name: "Aura Alchemy Process",
		description: "I am a facilitator of Pamela Aaralyn's Aura Alchemy process. This is a process of integration and shadow work that transmutes the negative imprints of a person into the feelings that her inner child would like to feel instead. To learn more about this process please read <a href='http://www.aurareader.com/1/post/2015/03/walking-in-the-light-of-the-shadow-body-aura-alchemy-process.html' target='_blank'>Pamela's blog</a>.",
		faIcon: "fa-diamond",
		faIconBase: "fa-sun-o",
		color: "#33CCCC",
		slug: "alchemy",
		image:"i.jpg"
	},
	healing: {
		name: "Sound Healing",
		description: "I will sing and use chants during this session and I will combine this with color alchemy. \"Sound healing is the therapeutic application of sound frequencies to the body/mind of a person with the intention of bringing them into a state of harmony and health.\"",
		faIcon: "fa-music",
		faIconBase: "fa-heartbeat",
		color: "#3366FF",
		slug: "healing",
		image:"b.jpg"
	},
	reiki: {
		name: "Reiki",
		description: "I am currently a second degree Reiki practitioner. I offer traditional Usui Reiki sessions. I can do Reiki sessions in person if you live in Calgary or by distance using skype. My lineage is passed from Madame Hawayo Takata.<br>Reiki: \"healing technique based on the principle that the therapist can channel energy into the patient by means of touch, to activate the natural healing processes of the patient's body and restore physical and emotional well-being.\"",
		faIcon: "fa-hand-paper-o",
		faIconBase: "fa-sun-o",
		color: "#9966FF",
		slug: "reiki",
		image:"p.jpg"
	}
};

function parseService(){
	var url = window.location.href;
	var args = url.split('#');
	if (args.length > 1 && services[args[1]]){
		return args[1];
	}
	// redirect
	window.location.href = "../index.html#services";
}

var service = parseService();

// angular
var app = angular.module('app', []);

angular.module('app')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

function viewCtrl($scope) {
	$scope.service = services[service];
	$scope.services = services;

	$scope.changeService = function(slug) {
		$('.splash-bg').hide();
		window.location.href = "index.html#"+slug;
		window.location.reload();
	}

	$scope.refresh = function() {
		window.setTimeout(function(){
			initBacklight({
				type: 'text'
			});
		}, 500);
	};
}

function setBg(){
	$div = $('.splash-bg');
	$div.hide();
	$div.css('background-image','url("../assets/images/services/'+services[service].image+'")');
	$div.fadeIn('fast');
}

(function(){
	setBg();
}());