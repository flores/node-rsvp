var redis = require("redis"),
  client = redis.createClient();

client.on("error", function (err) {
  console.log("Error " + err);
});

var NEXT_EVENT = "A get together somewhere!";
var RSVP_LIMIT = 95;
var CONTACT = "rsvp@someaddress";

function rsvps(){
  var rsvps = new Array();
  rsvps = client.keys(NEXT_EVENT + "*");
  return rsvps.length;
};

var app = require('express').createServer();
app.register('.html', require('jade'));

app.get('/rsvp', function(req, res){
//  res.send(rsvps_left());
  console.log("rsvps " + rsvps());
  var rsvps_left = RSVP_LIMIT - rsvps();
  console.log(rsvps_left);
  res.send(rsvps_left);
});

app.listen(3000);
