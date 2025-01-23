const express=require('express')
const app=express()
const path=require('path')
const hbs=require('hbs')
const collection=require('./mongodb')
app.set('view engine', 'ejs');
app.set('views', './views');

const templatePath=path.join(__dirname,'../public')

app.use(express.json())
app.set("views",templatePath)

app.use(express.urlencoded({extended:false}))
app.get('/', (req, res) => {
    res.render('index'); // Looks for './views/index.ejs'
});
app.get("/",(req,res)=>{
    res.render("login")
})
app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post("/signup",async (req,res)=>{
    const data={
        name:req.body.name,
        password:req.body.password,
        email:req.body.email,
        confirmpassword:req.body.confirmpassword,
        mobile:req.body.number
    }
    await collection.insertMany([data])
    res.render("index")
})

app.post("/login",async (req,res)=>{
    try {
        // Await the result of the findOne method
        const check = await collection.findOne({ email: req.body.email});

        // Check if user exists and password matches
        if (check && check.password === req.body.password) {
            res.render("index");
        } else {
            res.send("Wrong Password");
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.send("Wrong details or user does not exist.");
    }
})
app.listen(5000,()=>{
    console.log("port connected")
})