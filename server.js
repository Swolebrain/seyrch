const express = require('express');
const app = express();
const Yelp = require('yelp');

const YELP_KEY = "_KmP2E9o4G-UyjUNsNmqaA";
const YELP_SECRET = "nXvK3YTVFuABRn3i0qUoOZlz0lA";
const YELP_TOKEN = "G29Z77UFYp5XfvoKLBwd6Z9rjHBTkpQV";
const YELP_TOKENSECRET = "uc4Ppu3LR7uPvZczAvOQY9yrUyE";

app.get('/', function(req, res){
  res.sendFile(__dirname + '/webpage/index.html');
});
app.get('/css/style.css', function(req,res){
  res.sendFile(__dirname + '/webpage/css/style.css');
});

app.get('/airplanes', function(req, res){
  res.send("Jet fuel can't melt steel beams");
});

app.get('/randombetween10and20', function(req, res){
  res.send("" + Math.floor(Math.random()*10 + 10)  );
});

app.get('/random/:start/:end', function(req, res){
  var start = Number(req.params.start);
  var end = Number(req.params.end);
  res.send(""+ Math.ceil(Math.random()*(end-start) + start) );
});

app.get('/getChineseinMiami', function(req, res){
  var yelp = new Yelp({
    consumer_key: YELP_KEY,
    consumer_secret: YELP_SECRET,
    token: YELP_TOKEN,
    token_secret: YELP_TOKENSECRET,
  });
  yelp.search({ term: 'chinese', location: 'Miami, FL' })
    .then(function (data) {
      console.log(JSON.stringify(data, null, 2));
      res.json(data);
    });
});

app.get('/seyrch/:city/:term', function(req, res){
  var yelp = new Yelp({
    consumer_key: YELP_KEY,
    consumer_secret: YELP_SECRET,
    token: YELP_TOKEN,
    token_secret: YELP_TOKENSECRET,
  });
  yelp.search({ term: req.params.term, location: req.params.city })
    .then(function (data) {
      console.log(JSON.stringify(data, null, 2));
      res.json(data);
    })
    .catch(function (err) {
      console.error(err);
      res.send(err);
    });
});

app.listen(3003, function(){ console.log("Server listening on port 3003")  });
