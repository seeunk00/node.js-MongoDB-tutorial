const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
const { MongoClient } = require('mongodb');

var db;
const uri = "mongodb+srv://admin:admin1234@cluster0.irzrs.mongodb.net/todoapp?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {

	db = client.db('todoapp');

	db.collection('post').insertOne( {이름 : 'John', 나이 : 20 }, function(err, result){
		console.log('저장완료');
	});

  app.listen('8080', function(){
		console.log('listening on 8080');
	});
  client.close();
});


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

app.post('/add', function(req, res){
	res.send('전송완료');
	console.log(req.body);
	console.log(req.body.title);
});

