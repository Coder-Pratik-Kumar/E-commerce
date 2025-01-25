const express = require("express");
const app=express();
const port=process.env.PORT || 5000;
const path=require("path");
const hbs=require("hbs");
require("./db/conn");

const SignUpCollection=require("./models/signup");
const { log } = require("console");

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templetes/views");
app.use(express.static(static_path));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("views",template_path);
app.set("view engine","hbs");
app.get("/",(req,res)=>{
    res.render("index");
});

app.get("/signup.html", (req, res) => {
    res.redirect("/signup");
});
app.get("/signup",(req,res)=>{
    res.render("signup");
});
app.get("/Login.html", (req, res) => {
    res.redirect("/login");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/signup",async (req,res)=>{
        try{
               const password=req.body.password;
               const confirmpassword=req.body.confirmpassword;

               if(password === confirmpassword){
                    const UserData=new SignUpCollection({
                        name:req.body.name,
                        Mob_Number:req.body.Mob_Number,
                        email:req.body.email,
                        password:password,
                        confirmpassword:confirmpassword
                    })

                    const register=await UserData.save();
                    res.status(201).render("index");
               }else{
                res.send("password is not match");
               }
        }  catch(error){
            res.status(400).send(error);
        }
});
app.post("/login", async (req, res) => {
    try {
        const check = await SignUpCollection.findOne({ email: req.body.email });
        if (check && check.password === req.body.password) {
            res.render("home");
        } else {
            res.send("Wrong Password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.send("Wrong details or user does not exist.");
    }
});
app.listen(port, ()=>{
    console.log(`Server is running at port ${port}`);    
});