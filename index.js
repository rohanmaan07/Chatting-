const express=require("express");
const path=require("path");
const app=express();
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const chat = require("./models/chat.js");
app.listen(8080,()=>{
    console.log("app is listening");
});

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.get("/",(req,res)=>{
    res.send("root working");
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
main().then(()=>{console.log("connection succesful")})
.catch((err)=>{console.log(err)});

let chat1=new chat({
    from:"king",
    to:"Queen",
    msg:"My kindom without you is nothing",
    create_at:new Date()
});
// chat1.save().then((res)=>{console.log(res)})
// .catch((err)=>{console.log(err)});

//index route
app.get("/chats",async(req,res)=>{
    let chats= await chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
});

// new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//create route
app.post("/chats",(req,res)=>{
    let{from,msg,to}=req.body;
    let newChat= new chat({
        from:from,
        to:to,
        msg:msg,
        create_at:new Date()
    });
    console.log(newChat);
  
    newChat.save().then((res)=>{console.log("data saved")}).catch((err)=>{console.log(err)});

    res.redirect("/chats");
})

//edit
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chats=await chat.findById(id);
    res.render("edit.ejs",{chats});
})
//update
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let{msg:newMsg}=req.body;
    
    let Update=await chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true},{new:true});
    res.redirect("/chats");
});
//delete
app.delete("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let deleteChat=await chat.findByIdAndDelete(id);
    console.log(deleteChat);
    res.redirect("/chats");

})