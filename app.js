const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require('cookie-parser');
const csurf = require("csurf");
const fs = require("fs");
const { verifyToken, signToken, deleteToken } = require("./middleware/user-auth");

const app = express();

const csrfProtection = csurf({ cookie: true });

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/login", signToken, (req,res)=> {
    
    res.send();
})

app.get("/user/profile", verifyToken, (req,res)=> {
    console.log(req.user.tema);
    console.log(req.user.tipoUtente)
    const tema = req.user.tema;
    res.render("profile", { tema }); 
});

app.get("/user/message", verifyToken, (req,res)=> {
    console.log(req.user.tema)
    res.send("Sei Autenticato!"); 
});

app.get("/logout", deleteToken, (req,res)=>{
    res.send("LogOut effettuato!");
});

app.get("/user/cambia-email", verifyToken, csrfProtection, (req, res)=>{
    console.log(req.csrfToken());
    res.render("cambia-email", { csrfToken: req.csrfToken() });
});

app.post("/user/cambia-email", verifyToken, csrfProtection, (req, res)=>{
    console.log(req.body);
    res.send("Hai richiesto la modfica dell email. Sei autorizzato!");
});


app.listen(3000 , ()=> console.log("Server In Ascolto sulla porta 3000"));

