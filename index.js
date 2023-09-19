const express= require('express')
const app= express() ;
const mongoose= require('mongoose');
const path= require('path')
const methodOverride= require('method-override')
const BusDetails = require('./models/BusDetailDB');
const bcrypt=require("bcrypt");
const { Int32 } = require('bson');
const Schema = mongoose.Schema;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/UserDB')


const session = require('express-session');
// body parser
app.use(express.urlencoded({ extended: true })); //for form data
app.use(methodOverride('_method'));

let configSesion = {
    secret: 'SIH',
    resave: false,
    saveUninitialized: true,
}
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

app.use(session(configSesion));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

passport.use(new LocalStrategy(User.authenticate()));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static(path.join(__dirname, '/public')));


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})


mongoose.connect('mongodb+srv://dhruvsingh235443:BFMX2t0GxU6eEWkq@cluster0.sfxysuk.mongodb.net/?retryWrites=true&w=majority')
    .then(()=>{
        console.log('DB connected')
    })
    .catch((err)=>{
        console.log('Ye ni chal rha ') 
})
// t1VAf70fOcOk887p
// mongodb+srv://dhruvsingh235443:<password>@cluster0.sfxysuk.mongodb.net/?retryWrites=true&w=majority
// const User = require('./models/UserDB');

app.get('/signup', (req, res)=>{
    res.render('signup')
})
app.post("/signup", async (req, res) => {
  console.log(req.body);
  let { username, mobileno, age, email, password } = req.body;
    // const user = new User({ email, username });
    try{
	const newUser = await User.register({username:username,mobileno:mobileno,age:age,email:email}, password);
    res.redirect('/login');
    console.log('User registered successfully');
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Error registering user');
  }
});

app.get('/login', (req, res) => {
    res.render('login');
})
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login'
}),
    function (req, res) {
        res.redirect('/home');
    })
app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});


app.get('/profile', async (req, res)=>{
    let userfake= await User.find({}) ;
    if(req.isAuthenticated()){
        res.render('profile',{userfake});
    } else{
        res.render('home', {userfake}) ;
    }
})

// MongoDB Connection
const BusDetailDB = mongoose.model("BusDetailDB",BusDetails);
app.get('/home', (req, res) => {
  const existingUser = req.user;
  res.render('search', { existingUser });
});

app.post('/home', async (req, res) => {
    const search = req.body.search;
    const destination = req.body.destination;

    try {
        const results = await BusDetailDB.find({
            $and: [
                { 'busStops.address': search },
                { 'busStops.address': destination }
            ]});

        // Now 'results' contains documents where both 'search' and 'destination' are present in 'busStops'
        console.log(results);

        // Render the results to a view or send them as JSON response
        res.render("bus", { results });
    } catch (err) {
        console.error('Error searching bus details:', err);
        // Handle the error
        res.status(500).send('Error searching bus details');
    }
});

app.get('/api/bus', async (req, res) => {
    const search = req.query.search;
    const destination = req.query.destination;

    try {
        const results = await BusDetailDB.find({
            $and: [
                { 'busStops.address': search },
                { 'busStops.address': destination }
            ]
        });

        // Now 'results' contains documents where both 'search' and 'destination' are present in 'busStops'
        console.log("some one run this");

        // Return the results as JSON
        res.status(200).json({ results });
    } catch (err) {
        console.error('Error searching bus details:', err);
        // Handle the error
        res.status(500).json({ error: 'Error searching bus details' });
    }
});

app.get('/api/map/:id',async (req,res)=>{
	let {id} = req.params;
	let obj = await BusDetailDB.findById(id);
	res.status(200).json({obj});
})


app.get('/map/show/:id',async (req,res)=>{
    let {id} = req.params;
    let obj = await BusDetailDB.findById(id);
    res.render('map',{obj});
});

const port = 8080 || 8000;
app.listen(port,(req,res)=>{
    console.log("connected succesfully")
})



















