var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.listen((process.env.PORT || 3000));

// Server frontpage2
app.get('/', function (req, res) {
    res.send('This is Aureo.io Server');
    
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
                
                                if(event.message.text == 'Hola'){
                sendMessage(event.sender.id, {text: "Hola, bienvenido a coexport. Escribe el producto o servicio que desees y yo podre asistirte"});
            }else{
                    sendMessage(event.sender.id, {text: "" + event.message.text});
            }
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
              title: "Productos similares",
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
              title: "Productos similares",
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
              title: "Productos similares",
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
    
    if (values[0] == 'camisas' || values[0] == 'camisa') {
        
            
         sendGenericcMessage(recipientId);
            
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