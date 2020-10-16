var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))
// var port = process.env.PORT || 5000

// app.listen(port)
// console.log('server started on port ' + port)

http.listen((process.env.PORT || 5000), function(){
    console.log('listening on *:5000');
  });