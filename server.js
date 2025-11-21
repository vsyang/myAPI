const express = require('express');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;

app
	.use(express.json())
	.use(session({
		secret: "secret",
		resave: false ,
		saveUninitialized: true ,
	}))
	// Basic express session initialization
	.use(passport.initialize())
	// Init passport on every route call
	.use(passport.session())
	// Allow passport to use "express-session"
	.use((req, res, next) => {
		res.setHeader("Access-Controll-Allow-Origin", "*");
		res.setHeader(
				"Access-Control-Allow-Headers",
				"Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
	);
		res.setHeader(
				"Access-Control-Allow-Methods",
				"POST, GET, PUT, PATCH, DELETE, OPTIONS"
		);
		next();
	})
	.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
	.use(cors({ origin: '*' }))
	.use('/', require('./routes/index.js'));

	passport.use(new GitHubStrategy({
		clientID: process.env.GITHUB_CLIENT_ID,
		clientSecret: process.env.GITHUB_CLIENT_SECRET,
		callbackURL: process.env.CALLBACK_URL
	},
	function (accessToken, refreshToken, profile, done) {
		//User.findOrCreate({ githubId: profile.id }, function (err, user) {
		return done(null, profile);
		//})
	}
));

// OAuth 
passport.serializeUser((user, done) => {
	done(null, user);
})
passport.deserializeUser((user, done) => {
	done(null, user);
})

process.on('uncaughtException', (err, origin) => {
	console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
	process.exit(1); 
});

// Display user name/logged out
app.get('/', (req, res) => {
	res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")});

app.get('/github/callback', password.authenticate('github', {
	failureRedirect: '/api-docs', session: false}),
	(req, res) => {
	req.session.user = req.user;
	res.redirect('/');
});


// Error handler
app.use((req, res) => {
	res
		.status(404)
		.send(`
		<h1>Where did it go?!</h1>
		<p>Seems like this page doesn't exist...</p>
		<a href="/">Go Back</a>
		`);
});

mongodb.initDb((err) => {
	if (err) {
		console.log('err');
	} else {
		app.listen(port, () => {console.log(`Server is running on port ${port}`)});
	}
});
