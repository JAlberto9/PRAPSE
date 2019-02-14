$(function(){
    window.setTimeout(function(){
        var help = new EnjoyHint({
            onEnd: function(){ 
                window.setTimeout(function(){
                    $("body").css('overflow', 'hidden');
                }, 500);
            },
            onSkip: function(){
                window.setTimeout(function(){
                    $("body").css('overflow', 'hidden');
                }, 500);
            }
        });

        var help_steps = [
            // {
            //     'next .searchExpandContainer': 'Utiliza esta barra para ubicar algún lugar en el mapa',
            //     "nextButton" : {className: "myNext", text: "Siguiente"},
            //     "skipButton" : {className: "mySkip", text: "Salir"}
            // },
            {
                'click #ui-settings-button': 'Conoce el <span style="color:orange;">Atlas Nacional de riesgos</span> con este <span style="color:orange">tutorial</span>.<br/>Da <span style="color:orange">click</span> en el botón para mostrar el menú lateral.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                onBeforeStart: function(){
                    $("#ui-settings-panel h1").each(function(i, el){
                        if(!$(el).hasClass("ui-collapsible-heading-collapsed")){
                            console.log("abierto" + el)
                            $(el).click()
                        }
                    })
                }
                
            },
            // {
            //     'next .home': 'El botón de Home funciona para regresar al zoom original del mapa',
            //     "nextButton" : {className: "myNext", text: "Siguiente"},
            //     "skipButton" : {className: "mySkip", text: "Salir"}
            // },
            // {
            //     'next #basemap': 'Cambia el mapa base para tener una visión diferente del mapa',
            //     "nextButton" : {className: "myNext", text: "Siguiente"},
            //     "skipButton" : {className: "mySkip", text: "Salir"},
            //"margin": 1,
            //     "shape": "circle"
            // },
            // {
            //     'click #ui-settings-button': 'Da <span style="color:orange">click</span> en el botón para mostrar el menú lateral.',
            //     "nextButton" : {className: "myNext", text: "Siguiente"},
            //     "skipButton" : {className: "mySkip", text: "Salir"},
            //     "margin": 1,
            //     "showSkip": false
            // },
            {
                'next #nacionalBtn': 'La pestaña de <span style="color: orange">Capas</span> contiene información a <span style="color:orange;">nivel Nacional</span>.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            {
                'next #estatalBtn': 'La pestaña de <span style="color: orange">Estados</span> contiene información a <span style="color:orange;">nivel Estatal</span>.<br/>Utiliza el buscador dentro de ésta pestaña para encontrar el estado de tu interés.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            {
                'next #municipalBtn': 'La pestaña de <span style="color: orange">Municipios</span> contiene información a <span style="color:orange;">nivel municipal   </span> organizada por <span style="color:orange;">regiones</span>.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            {
                'click #nacionalBtn': 'Da <span style="color:orange">click</span> sobre la pestaña',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false,
                onBeforeStart:function(){
                    $("h4").each(function(idx, el){
                        if(!$(el).hasClass("ui-collapsible-heading-collapsed")){
                            $(el).click()
                        }
                    })
                }
            },
            {
                'click #geologicos': 'Selecciona el fenómeno con el que deseas trabajar',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            {
                'next #geologicos': 'Dependiendo de la cantidad de información de la capa puede tardar más tiempo en cargar los datos',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            {
                'next #geologicos_title': 'Cada fenómeno que agregues se cargará en la <span style="color:orange;">parte inferior del panel</span>',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false,
                onBeforeStart:function(){
                    $("h4").each(function(idx, el){
                        if(!$(el).hasClass("ui-collapsible-heading-collapsed")){
                            $(el).click()
                        }
                    })
                    document.getElementsByClassName("agsjsTOCRootLayer")[0].scrollIntoView(true)
                }
            },
            {
                'click #TOCNode_geologicos_371 .agsjsTOCGroupLayer span': 'La información se encuentra organizada por niveles.<br/>Da <span style="color:orange">click</span> en el símbolo de <span style="color:orange;">+</span>.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false,
                onBeforeStart:function(){
                    document.getElementById("TOCNode_geologicos_371").scrollIntoView(true)
                }
            },
            {
                'click #TOCNode_geologicos_430 .agsjsTOCGroupLayer span': 'Da <span style="color:orange">click</span> en el símbolo de <span style="color:orange;">+</span>.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false,
                onBeforeStart:function(){
                    document.getElementById("TOCNode_geologicos_430").scrollIntoView(true)
                }
            },
            {
                'click #TOCNode_geologicos_446': 'Activa/Desactiva la capa dando click en el <span style="color:orange;">recuadro que esta a la izquierda</span> del nombre de la capa.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false,
                onBeforeStart:function(){
                    document.getElementById("TOCNode_geologicos_446").scrollIntoView(true)
                }
            },
            {
                'next #TOCNode_geologicos_446': 'Al terminar de cargar la información la capa será visible en el mapa',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false,
                onBeforeStart:function(){
                    document.getElementById("TOCNode_geologicos_446").scrollIntoView(true)
                }
            },
            {
                'next #geologicos_layer446_range': 'Modifica la <span style="color:orange">transparencia</span> de las capas del fenómeno deslizando el cursor de la barra.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false,
                onBeforeStart:function(){
                    document.getElementsByClassName("agsjsTOCSlider")[0].scrollIntoView(true)
                }
            },
            {
                'click img#geologicos': 'Da <span style="color:orange">click</span> sobre la imagen para eliminar el fenómeno de tu área de trabajo',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false,
                onBeforeStart:function(){
                    document.getElementById("tocDiv").scrollIntoView(true)
                }
            },
            {
                'next #shapes': 'Utiliza los botones de dibujo para realizar un análisis sobre el mapa de sistemas expuestos.<br/>Cada ícono corresponde a un tipo de trazo diferente, puedes elegir entre: <span style="color:orange;">círculo, dibujo a mano alzada o polígono.</span>',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            {
                'next #BtnLimpiar': 'Para <span style="color:orange;">borrar</span> las geometrías que dibujes utiliza éste botón.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            {
                'next #identifyLayers': 'Una vez <span style="color:orange;">encendida alguna capa</span> utiliza este botón para <span style="color:orange;">conocer los atributos</span> de los elementos en la capa.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            {
                'next #analisisBtn': 'Al dar click en la pestaña de análisis podrás mostrar/ocultar los resultados tras realizar un análisis.<br/>Dentro de los resultados tendrás la opción de descargar la información.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false,
                onBeforeStart:function(){
                    document.getElementById("analisisBtn").scrollIntoView(true)
                }
            },
            // {
            //     'next .zoomLocateButton': 'Éste botón te permitirá <span style="color:orange;">mostrar tu ubicación</span> en el mapa.',
            //     "nextButton" : {className: "myNext", text: "Siguiente"},
            //     "skipButton" : {className: "mySkip", text: "Salir"},
            //     "margin": 1,
            //     "showSkip": false
            // },
            {
                'next .home': 'Regresa al <span style="color:orange;">zoom original</span> al dar click en éste botón.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            {
                'next .ui-btn.ui-corner-all.ui-shadow.ui-btn-inline': 'Elige entre los diferentes <span style="color:orange">mapa base</span> al pulsar éste botón.',
                "nextButton" : {className: "myNext", text: "Siguiente"},
                "skipButton" : {className: "mySkip", text: "Salir"},
                "margin": 1,
                "showSkip": false
            },
            // {
            //     'click .showTable': 'Obtén información detallada de población por estado al hacer click en este botón'
            // },
            // {
            //     'next #csvPob': 'Descarga los resultados en formato csv'
            // },
            // {
            //     'click #table a': 'Cierra la tabla de resultados'
            // },
            {
                'click #nacionalBtn': 'Comienza a utilizar el <span style="color:orange;">Atlas Nacional de Riesgos</span>',
                "showNext": false,
                "skipButton" : {className: "mySkip", text: "Listo"}
            }
            
        ];

        help.set(help_steps);
        help.run();
    }, 2000)
})