//index.js

let express = require('express');
let app = express();

app.set('views', __dirname + '/public/views');
app.set('view engine','ejs'); // 1
app.use(express.static(__dirname + '/public'));

//hello?nameQuery=Mike
app.get('/hello', function(req,res){ // 2
  res.render('hello', {name:req.query.nameQuery});
});

//hello/Mike
app.get('/hello/:nameParam', function(req,res){ // 3
  res.render('hello', {name:req.params.nameParam});
});

//그외 모든 경로 404 처리
app.all('*',function(req,res){
    res.status(404).send('not found');
});

var port = 3000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});