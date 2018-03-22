#!/usr/bin/node -w

var express = require('express');
var request = require('request');
var osmosis = require('osmosis');
var app = express();

//desativa o acess controll
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/:id', function(req,res){
    function parseHtml() {
        return new Promise((resolve, reject) => {
            let result = [];
            console.log("Method GET Status Response Code /* %s */  \n",res.statusCode);
            osmosis.get('https://www.google.com.br/search?q='+req.params.id)
                .find('.g')               
                .set({
                    'titulo': '.r',                 
                    'url':  'cite'
                })
                .data(item => result.push(item))
                .done(() => resolve(result))
                .error(console.log);
            });
    }

    parseHtml().then(data => res.send(data));
});

var server = app.listen(8081, function () {


    var port = server.address().port;
  
    console.log("Listening at http//:localhost:%s",port);
  
  });



