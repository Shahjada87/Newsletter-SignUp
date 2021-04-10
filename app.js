const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running!!");
})

app.use(express.static("public"));


app.post("/",function(req,res){
   const firstName = req.body.fname;
   const lastName = req.body.lname;
   const email = req.body.email;

   const data = {
     members : [
       {
         email_address: email,
         status: "subscribed",
         merge_fields:{
           FNAME : firstName,
           LNAME: lastName
         }
       }
     ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us1.api.mailchimp.com/3.0/lists/6d063c97a5";

   const options ={
     method: "POST",
     auth: "shahjada1:5a68fa8248eadc86152887946db32462-us1"
   }

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }else{
      res.sendFile(__dirname + "/failure.html");
    }
      response.on("data", function(data){
        console.log(JSON.parse(data));
      });
   });

   //request.write(jsonData);
   request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signUp.html");
});

//API KEY
//fe65069b0aeb0075d486392e4e2f682d-us1

//ListId
//6d063c97a5
