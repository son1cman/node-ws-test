var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var xD = 1;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/favicon.ico', function (req, res) {
    
    
});

app.get('/', function (req, res) {
    res.send('<html>' + '<body>' 
      + '<h2>Spectacular Mountain</h2>' +
       '<img src="http://i.imgur.com/DosQktr.jpg" alt="Mountain View" style="width:304px;height:228px;">'+
       '</body>' + '</html>');
    
});
app.get('/AAA01', function (req, res) {
     res.send('<html>' + '<body>' 
      + '<h2>Spectacular Mountain</h2>' +
       '<img src="http://i.giphy.com/l2Sq5pd3utN3LgPqo.gif" alt="Mountain View" style="width:304px;height:228px;">'+
       '</body>' + '</html>');
        
    
    
});
app.get('/AAA0B', function (req, res) {
/*    res.send('<html>' + '<body>' 
      + '<h2>Spectacular Mountain</h2>' +
       '<img src="http://i.giphy.com/l2Sq5pd3utN3LgPqo.gif" alt="Mountain View" style="width:304px;height:228px;">'+
       '</body>' + '</html>');*/
           res.send('<html>' + '<body>' 
       +
       '<img src="http://i.imgur.com/7DBh3pu.jpg" alt="Mountain View" style="width:304px;height:228px;">'+
       + '<p>Random meme 01 and insurance meme policy</p>'+
       + '<p>Random meme 02 and insurance meme policy</p>'+
       + '<p>Random insurance 03</p>'+
       '</body>' + '</html>');
    xD++;
    console.log('Visitor number:' + xD + " at ip: " + req.headers['x-forwarded-for']);
    
});

// Facebook Webhook
app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === 'testbot_verify_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

// handler receiving messages
app.post('/webhook', function (req, res) {
    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
            if(!EcomMessage(event.sender.id, event.message.text)) {
            if (!kittenMessage(event.sender.id, event.message.text)) {
                
                if(event.message.text === 'hola' || event.message.text === 'Hola'){
                    //sendMessage(event.sender.id, {text: "Hola bienvenido a Pollo campestre, que promocion deseas para el dia de hoy?"});
                    sendQuickR(event.sender.id);
      
                }
                if(event.message.text === 'bla'){
                  
                  sendQuickR(event.sender.id);
                }
                if(event.message.text === 'ble'){
                  sendQuickV(event.sender.id);
                  //sendMessage(event.sender.id, {message:{attachment:{type:"video",payload:{url:"https://www.youtube.com/watch?v=k6Wa_XzDqfs"}}} });
                  
                }
                if(event.message.text === 'Mesero!!'){
                  sendMessage(event.sender.id, {text: "En breve seras atendido por un mesero!!"});
                  
                }
                if(event.message.text === 'Sugerencias'){
                 //sendMessage(event.sender.id, {text: "Tus comentarios son de gran interes para nosotros!!! gracias por mejorar nuestro servicio, deja tu sugerencia en la parte de abajo"}); 
                 sendQuickS(event.sender.id);
                }
                if(event.message.text === 'Atencion al cliente'){
                 sendMessage(event.sender.id, {text: "Puede llamarnos al 2623-5000"});  
                 

                }
                if(event.message.text === 'Restaurantes'){
                 sendMessage(event.sender.id, {text: "Activa tu GPS para poder mostrarte el pollo campestre mas cercano"});  
                 

                }

                /*else{
                  sendMessage(event.sender.id, {text: "PolloCampestre: " + event.message.text});
                }*/
                    
                    //sendGenericMessage(event.sender.id);
                
            }
            
        } else if (event.postback) {
            console.log("Postback received: " + JSON.stringify(event.postback));
        }
            
        }else if (event.postback) {
            console.log("Postback received: " + JSON.stringify(event.postback));
        }
    }
    res.sendStatus(200);
});

// generic function sending messages
function sendMessage(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};
function sendQuickS(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      

        text:"Tus comentarios son de gran interes para nosotros!!! gracias por mejorar nuestro servicio, deja tu sugerencia en la parte de abajo Encuesta ejemplo de pregunta:",
        quick_replies:[
        {
          content_type:"text",
          title:":)",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
        },
        {
          content_type:"text",
          title:"Normal",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        },
        {
          content_type:"text",
          title:":(",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        }

        ]

        
      
    }
  };  
    sendMessageG(recipientId, messageData);
  //callSendAPI(messageData);
}
function sendQuickSug(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text:"",
        quick_replies:[
        {
          content_type:"text",
          title:"Mesero!!",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
        },
        {
          content_type:"text",
          title:"Promociones",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        },
        {
          content_type:"text",
          title:"Sugerencias",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        },
        {
          content_type:"text",
          title:"Atencion al cliente",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        },
        {
          content_type:"text",
          title:"Restaurantes",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        }

        ]

        
      
    }
  };  
    sendMessageG(recipientId, messageData);
  //callSendAPI(messageData);
}
function sendQuickR(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      

        text:"Hola bienvenido a Pollo campestre(2121-2828), que promocion deseas para el dia de hoy?",
        quick_replies:[
        {
          content_type:"text",
          title:"Mesero!!",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_RED"
        },
        {
          content_type:"text",
          title:"Promociones",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        },
        {
          content_type:"text",
          title:"Sugerencias",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        },
        {
          content_type:"text",
          title:"Atencion al cliente",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        },
        {
          content_type:"text",
          title:"Restaurantes",
          payload:"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_GREEN"
        }

        ]

        
      
    }
  };  
    sendMessageG(recipientId, messageData);
  //callSendAPI(messageData);
}

function sendQuickV(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      
        attachment:{
          type:"video",
        payload:{
          url:"https://www.facebook.com/PolloCampestreSV/videos/10153863299918499/"
        }
      }

        
      
    }
  };  
    sendMessageG(recipientId, messageData);
  //callSendAPI(messageData);
}

function sendMessageG(recipientId, message) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: message
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Siguiente generacion RV",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Abrir URL"
            }, {
              type: "postback",
              title: "Call Postback(Dev)",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "Control Inalambrico",
            subtitle: "Tus manos dentro del VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Abrir URL"
            }, {
              type: "postback",
              title: "Call Postback(Dev)",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  
    sendMessageG(recipientId, messageData);
  //callSendAPI(messageData);
}
function sendGenericcMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "Camisa lacoste",
            subtitle: "Aquí, el cuello rompe las normas, abotonándose en la espalda. Y el cuello ya no es de un solo tono: decorado con rayas, combina cuatro colores para obtener un resultado moderno y femenino a la vez",
            item_url: "http://global.lacoste.com/es/lacoste/mujer/ropa/polos/women%27s-slim-fit-stretch-pique-polo-with-stripe-accents/PF8866-00.html",               
            image_url: "http://image1.lacoste.com/sits_pod14/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-INT-Site/Sites-master/es/dw55e8b0d7/PF8866_4GX_20.jpg",
            buttons: [{
              type: "web_url",
              url: "http://global.lacoste.com/es/lacoste/mujer/ropa/polos/women%27s-slim-fit-stretch-pique-polo-with-stripe-accents/PF8866-00.html",
              title: "Comprar Camisa"
            }, {
              type: "postback",
              title: "Call Postback(Dev)",
              payload: "Payload for first bubble",
            }],
          }, 
                     {
            title: "Camisa lacoste 2 ",
            subtitle: "Aquí, el cuello rompe las normas, abotonándose en la espalda. Y el cuello ya no es de un solo tono: decorado con rayas, combina cuatro colores para obtener un resultado moderno y femenino a la vez",
            item_url: "http://global.lacoste.com/es/lacoste/mujer/ropa/polos/women%27s-slim-fit-stretch-pique-polo-with-stripe-accents/PF8866-00.html",               
            image_url: "http://image1.lacoste.com/sits_pod14/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-INT-Site/Sites-master/es/dw88fd73d7/PF8866_4GX_24.jpg",
            buttons: [{
              type: "web_url",
              url: "http://global.lacoste.com/es/lacoste/mujer/ropa/polos/women%27s-slim-fit-stretch-pique-polo-with-stripe-accents/PF8866-00.html",
              title: "Comprar Camisa"
            }, {
              type: "postback",
              title: "Call Postback(Dev)",
              payload: "Payload for first bubble",
            }],
          },
                     {
            title: "Camisa lacoste ",
            subtitle: "Aquí, el cuello rompe las normas, abotonándose en la espalda. Y el cuello ya no es de un solo tono: decorado con rayas, combina cuatro colores para obtener un resultado moderno y femenino a la vez",
            item_url: "http://global.lacoste.com/es/lacoste/mujer/ropa/polos/women%27s-slim-fit-stretch-pique-polo-with-stripe-accents/PF8866-00.html",               
            image_url: "http://image1.lacoste.com/sits_pod14/dw/image/v2/AAQM_PRD/on/demandware.static/Sites-INT-Site/Sites-master/es/dw3862b27c/AF4511_4A8_20.jpg",
            buttons: [{
              type: "web_url",
              url: "http://global.lacoste.com/es/lacoste/mujer/ropa/polos/women%27s-slim-fit-stretch-pique-polo-with-stripe-accents/PF8866-00.html",
              title: "Comprar Camisa"
            }, {
              type: "postback",
              title: "Call Postback(Dev)",
              payload: "Payload for first bubble",
            }],
          }
                    ]
        }
      }
    }
  };  
    sendMessageG(recipientId, messageData);
  //callSendAPI(messageData);
}
function sendPolloMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "Banquete",
            subtitle: "6 piezas + 6 complementos!! Saca la cuenta aqui te sale mejor!",
            item_url: "http://pollocampestre.com/promociones/",               
            image_url: "http://pollocampestre.com/wp-content/themes/cheseemoon/inc/tmb/?src=http://pollocampestre.com/archivos/2016/11/Promo6-6-04.png",
            buttons: [{
              type: "web_url",
              url: "http://pollocampestre.com/promociones/",
              title: "Comer ya!!"
            }, {
              type: "postback",
              title: "Sugerir a amigos!",
              payload: "Payload for first bubble",
            }],
          }, 
                     {
            title: "Domidelicioso!",
            subtitle: "8 piezas + 4 ensaladas + 1 orden de pan con ajo + 1 soda",
            item_url: "http://pollocampestre.com/promociones/",               
            image_url: "http://pollocampestre.com/wp-content/themes/cheseemoon/inc/tmb/?src=http://pollocampestre.com/archivos/2016/06/adaptacion2-1.png",
            buttons: [{
              type: "web_url",
              url: "http://pollocampestre.com/promociones/",
              title: "Comer ya!"
            }, {
              type: "postback",
              title: "En restaurantes",
              payload: "Payload for first bubble",
            }],
          },
                     {
            title: "2 piezas gratis!!!",
            subtitle: "Aprovecha!! al tercer pedido 2 piezas gratis",
            item_url: "http://pollocampestre.com/promociones/",               
            image_url: "http://pollocampestre.com/wp-content/themes/cheseemoon/inc/tmb/?src=http://pollocampestre.com/archivos/2016/04/webcampesrtre3-1.png&w=400&zc=1",
            buttons: [{
              type: "web_url",
              url: "http://pollocampestre.com/promociones/",
              title: "Comprar ya!"
            }, {
              type: "postback",
              title: "A domicilio",
              payload: "Payload for first bubble",
            }],
          }
                    ]
        }
      }
    }
  };  
    sendMessageG(recipientId, messageData);
  //callSendAPI(messageData);
}

// send rich message with kitten
function kittenMessage(recipientId, text) {
    
    text = text || "";
    var values = text.split(' ');
    
    if (values.length === 3 && values[0] === 'kitten') {
        if (Number(values[1]) > 0 && Number(values[2]) > 0) {
            
         sendGenericMessage(recipientId);
            
            return true;
        }
    }
    
    return false;
    
};

function EcomMessage(recipientId, text) {
    
    text = text || "";
    var values = text.split(' ');
    
    if (values[0] === '#promocion') {
        
            
         sendGenericcMessage(recipientId);
            
            return true;
        
    }
    if (values[0] === 'Promociones') {

          sendPolloMessage(recipientId);
            
            return true;
    }
    if (values[0] === 'tech') {

          sendQuickR(recipientId);
          //sendGenericMessage(recipientId);
            
            return true;
    }
    
    return false;
    
};


function kittenMessage_backup(recipientId, text) {
    
    text = text || "";
    var values = text.split(' ');
    
    if (values.length === 3 && values[0] === 'kitten') {
        if (Number(values[1]) > 0 && Number(values[2]) > 0) {
            
            var imageUrl = "https://placekitten.com/" + Number(values[1]) + "/" + Number(values[2]);
            
            message = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [{
                            "title": "Kitten",
                            "subtitle": "Cute kitten picture",
                            "image_url": imageUrl ,
                            "buttons": [{
                                "type": "web_url",
                                "url": imageUrl,
                                "title": "Show kitten"
                                }, {
                                "type": "postback",
                                "title": "I like this",
                                "payload": "User " + recipientId + " likes kitten " + imageUrl,
                            }]
                        }]
                    }
                }
            };
    
            sendMessage(recipientId, message);
            
            return true;
        }
    }
    
    return false;
    
};