const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

var client_ip='';
var client_uname='';
var client_pass='';


app.get('/',function(req,res){
    res.render('home');
});

app.post('/',function(req,res){
    client_uname=req.body.client_uname;
    client_pass=req.body.client_pass;
    client_ip= req.body.client_ip;
    

    if(client_ip.length===0  || client_pass.length===0 || client_uname.length===0){
        console.log("Client Parameters missing!");
        res.redirect('/');
    }else{
        console.log("Uname : " + client_uname);
        console.log("Password : " + client_pass);
        console.log("Client IP : "+client_ip);
        res.redirect('/');
    }
});














let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function(){
  console.log("Server ativated at port successfully");
});