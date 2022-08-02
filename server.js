const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
const { MongoClient } = require('mongodb');
app.set('view engine', 'ejs');

var db;
const uri = "mongodb+srv://admin:admin1234@cluster0.irzrs.mongodb.net/todoapp?retryWrites=true&w=majority";
MongoClient.connect(uri,
function(err, client) {
    if (err) {return console.log(err)}
    db = client.db('todoapp')
    app.listen(8080, function() {
        console.log('listening on 8080')
    });
})


app.get('/pet', function(req, res){
	res.send('펫 용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/beauty', function(req, res){
	res.send('뷰티 용품 쇼핑할 수 있는 페이지입니다.');
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/write', function(req, res){
	res.sendFile(__dirname + '/write.html');
});

// app.post('/add', function(req, res){
// 	res.send('전송완료');
// 	console.log(req.body);
// 	console.log(req.body.title);
// });

app.post('/add', function(req, res){
	res.send('전송완료');
	db.collection('post').insertOne({title: req.body.title, data: req.body.date}, function(){
		console.log('저장완료');
	});
});

app.get('/list', function(req, res){
	res.render('list.ejs');
});