var express = require('express');
var mongojs = require('mongojs');
var db = mongojs('contactlist',['contactlist']);
var app = express();
var bodyParser = require('body-parser');

/*app.get('/', function(req , res) {
	res.send("Hello World from server.js")
});*/

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.get('/contactlist', function(req , res) {
	console.log("I recieved a get request")

	db.contactlist.find(function(err,docs){
		//console.log(docs);
		res.json(docs);
	})

	/*person1 = {
    	name : 'vishnu',
    	email : 'vishnuprasa1990@gmail.com',
    	number : '8943861660'
    };
    person2 = {
    	name : 'prasad',
    	email : 'vishnu@gmail.com',
    	number : '9995517171'
    };
    person3 = {
    	name : 'das',
    	email : 'das@gmail.com',
    	number : '8861065832'
    };
    var contactlist = [person1,person2,person3];	
    res.json(contactlist);*/
});
app.post('/contactlist', function(req , res) {
	//console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		res.json(doc);
	})
});
app.delete('/contactlist/:id', function(req , res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
	
});
app.get('/contactlist/:id', function(req , res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	})
	
});
app.put('/contactlist/:id', function(req , res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query:{_id: mongojs.ObjectId(id)},update:{$set: {name:req.body.name,email:req.body.email,number:req.body.number}},
	new:true}, function(err, doc){
		res.json(doc);
	})
	
});

app.listen(3000);
console.log("server running at port 3000");