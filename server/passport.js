const passport = require('passport')
const strategy = require('passport-twitter').Strategy;


passport.use(new strategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
}, (token, tokenSecret, profile, cb) => {
  console.log(profile, 'profile')
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

module.exports = passport
