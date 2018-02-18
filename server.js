var express= require('express');
var app=express();
var bodyParser=require('body-parser');//<<-- (error 30X) security compromized
const mongoose= require('mongoose');
var Path = require('path');	
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt= require('bcryptjs');
const expressValidator = require('express-validator');
const passport = require('passport');
const LocalStrategy =require('passport-local').Strategy;

app.use(expressValidator())

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get("*",function(req,res,next){
	res.locals.user = req.user||null;
	next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});





/*
Following section added by Madhav
*/

//adding static folder to serve css,js,images, etc
app.use(express.static(__dirname+'/assets'));

/*
 * setting up view engine to render html files
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

const config = require('./config/database');

mongoose.connect(config.database);
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
  res.sendFile('index2.html', {root: __dirname});
});



// app.get("/login",function(req,res){
// 	res.sendFile("views/LoginPage.html", {root: __dirname});
// });

// app.post("/login", function(req,res){
// 	// console.log(req.params);
// 	console.log(req.body);
// 	var user= db.collection('user').find(req.body).toArray(function(err, results) {
//   console.log(results);
//   	req.user=results[0];
//   	// req.user.authenticated=true;
//   	// res.redirect('/')
//   	res.sendFile('index.html', {root: __dirname, user: req.user, isAuth: req.user.authenticated});
// 	})
// 	// console.log(user);
// })

// app.get("/logout",function(req,res){
// 	req.user=null;
// 	res.redirect("/")
// })


// app.get("/register",function(req,res){
// 	res.sendFile("views/SignupPage.html", {root: __dirname});
// });

// app.post("/register", function(req,res){
// 	// console.log(req.params);
// 	console.log(req.body);
// 	 db.collection('user').save(req.body, (err, result) => {
// 	    if (err) return console.log(err)
// 	    console.log('saved to database');
// 		console.log("Successfully registered");
// 	    res.redirect('/')
// 	  })
// })



// Bring in User Model
let User = require('./models/user');

// Register Form
app.get('/register', function(req, res){
  res.sendFile(__dirname+'/views/SignupPage.html');
});

// Register Proccess
app.post('/register', function(req, res){
  const name = req.body.name;
  const password = req.body.password;
  const password2 = req.body.password2;
  console.log(password,"pass=",password2);
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
  	console.log("Ran into errors",errors);
    res.sendFile(__dirname+'/views/SignupPage.html', {
      errors:errors
    });
  } else {
    let newUser = new User({
      name:name,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.redirect('/login');
          }
        });
      });
    });
  }
});

//Login
app.get("/login",function(req,res){
	res.sendFile("views/LoginPage.html", {root: __dirname});
});


app.post("/login", function(req,res,next){
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})(req,res,next);
	// console.log("Request.user=",req.user);
})


app.get("/logout",function(req,res,next){
	req.logout();
	req.flash("success","Successfully Logged Out");
	console.log("Successfully Logged Out");
	res.redirect("/");
});


app.listen(3000, function(){
	console.log("Listening on port http://localhost:3000/");
})
