var data = {
    title:{
        ENG:"Book a Session<h3>with Mariana Claire</h3>",
        FREN:"Réservez une session<h3>avec Mariana Claire</h3>",
        ESP:"Reserve una sesión<h3>con Mariana Claire</h3>"
    },
    subtitles:{
        dateTime:{
            ENG:"Date and Time Available",
            FREN:"Date et Temps disponible",
            ESP:"Fecha y Tiempo disponible"
        },
        workingTime:{
            ENG:"Working hours",
            FREN:"Temps disponible",
            ESP:"Horas disponibles"
        },
        payment:{
            ENG:"Payment",
            FREN:"Paiement",
            ESP:"Pago",
        },
        reservationForm:{
            ENG:"Reservation Form",
            FREN:"Formulaire de réservation",
            ESP:"Formulario para reservar",
        },
        selectDefault:{
            ENG:"please choose a service",
            FREN:"S.V.P. choisissez un service",
            ESP:"porfavor escoja un servicio",
        },
        paypalGo:{
            ENG:"Procces with Paypal",
            FREN:"Payer par Paypal",
            ESP:"Page con Paypal",
        },
        backHome:{
            ENG:"Back to Homepage",
            FREN:"Retourner à la page principale",
            ESP:"Regresar al menu principal",
        },
        begin:{
            ENG:"Begin",
            FREN:"Commencer",
            ESP:"Empezar",
        }
    },
    workingTime:[
        {
            day:{
                ENG:"Mon & Fri",
                FREN:"Lundi & Vendredi",
                ESP:"Lunes & Viernes"
            },
            time:"10AM - 2PM & 7PM - 9PM",
        },{
            day:{
                ENG:"Tue - Thur",
                FREN:"Mardi- Jeudi",
                ESP:"Martes-Jueves"
            },
            time:"7PM - 9PM"
        },{
            day:{
                ENG:"Sat",
                FREN:"Samedi",
                ESP:"Sabado"
            },
            time:"10AM - 6PM"
        },{
            day:{
                ENG:"Sun",
                FREN:"Dimanche",
                ESP:"Domingo"
            },
            time:"2PM to 9PM"
        }
    ],
    availability:{
        ENG:"My availability is displayed as <strong>empty white slots</strong> in the following calendar in <strong>Mountain time zone</strong>. Please choose a date and time that suit you the best and confirm your choice in the <a class='inline-menu-btn' role='button' data-id='reservation'>reservation form</a> on the next section.",
        FREN:"Mes disponibilités sont sur les <strong>caisses blanches</strong> sur ce calendrier qui est avec le <strong>fuseau horaire Mountain</strong>. Pour réserver une session juste choisissez l'heure et la date qui est mieux pour vous et confirmer votre choix dans la section du <a class='inline-menu-btn' role='button' data-id='reservation'>formulaire de réservation</a>.",
        ESP:"Mi disponibilidad esta en las <strong>casillas blancas</strong> en este calendario que esta en la <strong>zona de tiempo Mountain</strong>. Porfavor escoja la hora y el día que mas le convenga y porfavor confirmelo en el <a class='inline-menu-btn' role='button' data-id='reservation'>formulario de reservación</a>."
    },
    cad:{
        ENG:"<strong>*Note</strong> that if you are from canada please email me before making a payment.",
        FREN:"<strong>*Note:</strong> si vous habitez à Canada S.V.P. m'envoyer un message avant de faire le paiement.",
        ESP:"<strong>*Nota:</strong> si vives en Canada porfavor enviame un mensaje antes de hacer el pago."
    },
    bookingNotes:{
        ENG:"Click on <storng>BEGIN</strong> to open the booking form. Make sure you have a <strong>date</strong> and <strong>time</strong> in mind for your session. Note that if you are on a mobile device, we will redirect you to another page. Once your are done, please proceed to <a class='inline-menu-btn' role='button' data-id='payment'>payment</a> in the next section.",
        FREN:"S.V.P. faire click sur <strong>COMMENCER</strong> pour soumettre votre information de contact. Prenez note que si vous visitez le siteweb sur un cellulaire, cela va vous amener sur une autre page. Après avoir fini avec le formulaire, s.v.p. procéder au <a class='inline-menu-btn' role='button' data-id='payment'>paiement</a> dans la section suivante.",
        ESP:"Llenar su información de contacto para reservar: Haga click en <strong>Empezar</strong> para llenar su información de contacto. Note que si esta utilizando el sitioweb desde un telefono lo llebara a otra pagina. Una vez que termine con el formulario porfavor continuar con el <a class='inline-menu-btn' role='button' data-id='payment'>pago</a> en la siguiente sección."
    },
    progress:{
        ENG:'STEP 1: Time & Date > STEP 2: Fill Form > STEP 3: Checkout',
        FREN:'',
        ESP:''
    }

};

var formValues = {
    form:{
        ENG:"MuuMII",
        FREN:"asvkeD",
        ESP:"DWzIS6"
    },
    back:{
        ENG:"BACK",
        FREN:"RETOURNER",
        ESP:"ATRÁS"
    },
    next:{
        ENG:"NEXT",
        FREN:"SUIVANT",
        ESP:"CONTINUAR"
    },
    cancel:{
        ENG:"CANCEL",
        FREN:"ANNULER",
        ESP:"CANCELAR"
    },
    language:{
        ENG:"English",
        FREN:"Français",
        ESP:"Spanish"
    }
}

var validLangs = ["ENG", "FREN", "ESP"]

var isMobile = {
    ENG: "",
    FREN: "",
    ESP: ""
};
if( screen.width <= 480 ) {
    // assume it's mobile..
    var isMobile = {
        ENG: "Please click on the hand to proceed booking.<hr>",
        FREN: "Tappez sur la main pour continuer la reservation.<hr>",
        ESP: "Porfavor haga click en la mano para continuar con la reservacion.<hr>"
    };
}

var currentLang = purl(window.location.href).param('lang');
if (!currentLang || validLangs.indexOf(currentLang) < 0){
    currentLang = 'ENG';
}

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
    $scope.data = data;
    $scope.formValues = formValues;
    $scope.mobileTab = isMobile;

    $scope.refresh = function() {
        window.setTimeout(function(){
            var qs,js,q,s,d=document,gi=d.getElementById,ce=d.createElement,gt=d.getElementsByTagName,id='typef_orm',b='https://s3-eu-west-1.amazonaws.com/share.typeform.com/';if(!gi.call(d,id)){js=ce.call(d,'script');js.id=id;js.src=b+'widget.js';q=gt.call(d,'script')[0];q.parentNode.insertBefore(js,q)}

            initAnchors();
            // computeAnchorPos();
        }, 500);
    };
}

var formShowing = false;

function initAnchors(){
    $('.inline-menu-btn').each(function(){
        $(this).click(function(){
            var top = $('a[name="'+$(this).data('id')+'"]').position().top - 100;
            $("html, body").animate({ scrollTop: top+"px" }, 300);
        });
    });

    window.progessBarRatio = 100/($(document).height()-$(window).height());

    $(window).scroll(function(){
        $('#progress-bar .bar').stop();
        var width = window.pageYOffset*progessBarRatio;
        $('#progress-bar .bar').animate({
            'width' : width + '%'
        }, 200);

        // var temp = cachePos.map(function(e){
        //     console.log(window.pageYOffset);
        //     console.log(e);
        //     console.log(Math.abs(window.pageYOffset - e));
        //     return Math.abs(window.pageYOffset - e);
        // });
        // var index = temp.indexOf(Math.min.apply(Math, temp));
        // if(currentAnchor != index){
        //     $('#progress-bar .title').html(data.progress[index][currentLang]);
        //     currentAnchor = index;
        // }
    });
}

var anchors = ['calendar', 'reservation', 'payment'];
// var cachePos = [];
var currentAnchor = 0;

// function computeAnchorPos(){
//     var temp = anchors.map(function(id){
//         return $('a[name="'+id+'"]').position().top;
//     });
//     for(var i = 0; i<temp.length-1; i++){
//         cachePos[i] = (temp[i]+temp[i+1])/2;
//     }
//     cachePos.push((temp[i]+$(document).height())/2);
// }

(function(){
    $div = $('.splash-bg');
    $div.hide();
    $div.css('background-image','url("../assets/images/1.jpg")');
    $div.fadeIn('fast');

    var currency = purl(window.location.href).param('currency');
    if (!currency){
        currency = "USD";
    }
    if (currency == 'USD'){
        $('.currency-'+currency+'.lang-'+currentLang).css({
            'display':'block'
        });
    }else{
        $('.currency-'+currency).css({
            'display':'block'
        });
    }
    $('#splash-content-container').fadeIn('slow');

    // form
    $('.book-toggle-btn').each(function(){
        $(this).click(function(){

            if(!formShowing){
                formShowing = true;
                $("html, body").css({'overflow-y' : 'hidden'});
                $('#progress-bar').fadeOut('fast');
                $('#typeform-widget').fadeIn('fast');
            }
        })
    });
    $('#cancel-book-btn').click(function(){
        if(formShowing){
            formShowing = false;
            $("html, body").css({'overflow-y' : 'scroll'});
            $('#progress-bar').fadeIn('fast');
            $('#typeform-widget').fadeOut('fast');
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
}());

// GA

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-69806378-1', 'auto');
ga('send', 'pageview');
