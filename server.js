const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
const { MongoClient } = require('mongodb');
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

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
	res.render('index.ejs');
});

app.get('/write', function(req, res){
	res.render('write.ejs');
});

// app.post('/add', function(req, res){
// 	res.send('전송완료');
// 	console.log(req.body);
// 	console.log(req.body.title);
// });

app.post('/add', function(req, res){
	db.collection('counter').findOne({name : '게시물갯수'}, function(err, result){
    var 총게시물갯수 = result.totalPost;
    db.collection('post').insertOne( { _id : (총게시물갯수 + 1), title : req.body.title, date : req.body.date } , function(){
      console.log('저장완료');
			db.collection('counter').updateOne({name: '게시물갯수'}, { $inc : { totalPost: 1 } }, function(err, result){
				if (err) {
					return console.log(err);
				}
			});
      res.send('전송완료');
    });
  });
});

app.get('/list', function(req, res){
	db.collection('post').find().toArray(function(err, result){
		console.log(result);
		res.render('list.ejs', { posts : result });
	});
});

app.delete('/delete', function(req, res){
	console.log(req.body);
	req.body._id = parseInt(req.body._id);
	db.collection('post').deleteOne(req.body, function(err, result){
		console.log('삭제완료');
		res.status(200).send({ message : '성공했습니다'});
	});
});

app.get('/detail/:id', function(req, res){
	db.collection('post').findOne({_id: parseInt(req.params.id)}, function(err, result){
		console.log(result);
		res.render('detail.ejs', { data : result });
	});
});

app.get('/edit/:id', function(req, res){
	db.collection('post').findOne({_id : parseInt(req.params.id)}, function(err, result){
		res.render('edit.ejs', { post : result });
	});
});