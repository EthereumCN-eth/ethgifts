require('dotenv').config()
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const Queue = require('bull');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { ensureLoggedIn } = require('connect-ensure-login');
const express = require('express');


const REDIS_BULLBOARD_BASE_PATH = process.env.REDIS_BULLBOARD_BASE_PATH
const REDIS_BULLBOARD_PORT = process.env.REDIS_BULLBOARD_PORT
const REDIS_BULLBOARD_USERNAME = process.env.REDIS_BULLBOARD_USERNAME
const REDIS_BULLBOARD_PASSWORD = process.env.REDIS_BULLBOARD_PASSWORD
// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(
  new LocalStrategy(function (username, password, cb) {
    if (username === REDIS_BULLBOARD_USERNAME && password === REDIS_BULLBOARD_PASSWORD) {
      return cb(null, { user: REDIS_BULLBOARD_USERNAME });
    }
    return cb(null, false);
  })
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t * 1000));

// const redisOptions = {
//   port: 6379,
//   host: 'localhost',
//   password: '',
//   // tls: false,
// };




const run = async () => {
  const signBullMq = new Queue('sign');

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath(REDIS_BULLBOARD_BASE_PATH);

  createBullBoard({
    queues: [new BullAdapter(signBullMq)],
    serverAdapter,
  });




  const app = express();
  // Configure view engine to render EJS templates.
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.use(session({ secret: 'cb3354001ae8e5df3b6e3dff72d9c965ac4f61812a0f7868857698183b36398d', saveUninitialized: true, resave: true }));
  app.use(bodyParser.urlencoded({ extended: false }));

  // Initialize Passport and restore authentication state, if any, from the session.
  app.use(passport.initialize({}));
  app.use(passport.session({}));

  app.get(`${REDIS_BULLBOARD_BASE_PATH}/login`, (req, res) => {
    res.render('login', { invalid: req.query.invalid === 'true' });
  });

  app.post(
    `${REDIS_BULLBOARD_BASE_PATH}/login`,
    passport.authenticate('local', { failureRedirect: `${REDIS_BULLBOARD_BASE_PATH}/login?invalid=true` }),
    (req, res) => {
      res.redirect(`${REDIS_BULLBOARD_BASE_PATH}`);
    }
  );

  // app.use('/add', (req, res) => {
  //   const opts = req.query.opts || {};

  //   if (opts.delay) {
  //     opts.delay = +opts.delay * 1000; // delay must be a number
  //   }

  //   signBullMq.add({data:'s'}, { title: req.query.title }, opts);

  //   res.json({
  //     ok: true,
  //   });
  // });

  app.use(`${REDIS_BULLBOARD_BASE_PATH}`, ensureLoggedIn({ redirectTo: `${REDIS_BULLBOARD_BASE_PATH}/login` }), serverAdapter.getRouter());

  app.listen(REDIS_BULLBOARD_PORT, () => {
    console.log(`Running on ${REDIS_BULLBOARD_PORT}...`);
    console.log(`For the UI, open http://localhost:${REDIS_BULLBOARD_PORT}${REDIS_BULLBOARD_BASE_PATH}`);
    console.log('Make sure Redis is running on port 6379 by default');
    // console.log('To populate the queue, run:');
    // console.log('  curl http://localhost:3000/add?title=Example');
    // console.log('To populate the queue with custom options (opts), run:');
    // console.log('  curl http://localhost:3000/add?title=Test&opts[delay]=9');
  });
};

// eslint-disable-next-line no-console
run().catch((e) => console.error(e));