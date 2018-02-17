var express= require('express');
var app=express();
var bodyParser=require('body-parser');//<<-- (error 30X) security compromized
var mongoose= require('mongoose');
var Path = require('path');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/*
Following section added by Madhav
*/

//adding static folder to serve css,js,images, etc
app.use(express.static(__dirname+'/assets'));
/**
 * setting up view engine to render html files beautifully
 */
var exphbs = require('express-handlebars');

app.set('views',__dirname+'/template/')
app.engine('html', exphbs(
	{ 
		extname: 'html',
		layoutsDir: __dirname+'/template/layouts/',
		defaultLayout: __dirname+'/template/layouts/layout',
		partialsDir : [__dirname+'/template/partials']
	}
));

app.set('view engine', 'handlebars');

//All routes defined in routes.js
var route = require('./routes')
app.use('/', route);

/*
above section is added by Madhav
 */

//Connect to Mongoose
mongoose.connect("mongodb://localhost/users");
var db = mongoose.connection;

db.once('open',function(){
	console.log("connected to database users");
})

db.on('error', function(err){
	console.log(err);
})

app.get('/', function(req, res) {
  // res.send('Hello World');
  // if(req.user.authenticated)
  // 	{console.log(req.user.authenticated);}
  res.sendFile('index.html', {root: __dirname});
});

app.get("/login",function(req,res){
	res.sendFile("views/LoginPage.html", {root: __dirname});
});

app.post("/login", function(req,res){
	// console.log(req.params);
	console.log(req.body);
	var user= db.collection('user').find(req.body).toArray(function(err, results) {
  console.log(results);
  	req.user=results[0];
  	// req.user.authenticated=true;
  	// res.redirect('/')
  	res.sendFile('index.html', {root: __dirname, user: req.user, isAuth: req.user.authenticated});
	})
	// console.log(user);
})

app.get("/logout",function(req,res){
	req.user=null;
	res.redirect("/")
})


app.get("/register",function(req,res){
	res.sendFile("views/SignupPage.html", {root: __dirname});
});

app.post("/register", function(req,res){
	// console.log(req.params);
	console.log(req.body);
	 db.collection('user').save(req.body, (err, result) => {
	    if (err) return console.log(err)
	    console.log('saved to database');
		console.log("Successfully registered");
	    res.redirect('/')
	  })
})


app.listen(3000, function(){
	console.log("Listening on port http://localhost:3000/");
})
