const mongoose=require("mongoose");
const chat=require("./models/chat.js");
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}
main().then(()=>{console.log("connection succesful")})
.catch((err)=>{console.log(err)});

chat.insertMany([{
    from:"Rohan",
    to:"Tripti",
    msg:"Hey, Wassup..",
    create_at:new Date()
},
{
    from:"Kevin",
    to:"bob",
    msg:"Call me, its urgent",
    create_at:new Date()
},
{
    from:"Preeti",
    to:"Priya",
    msg:"please sends the notes.",
    create_at:new Date()
},
{
    from:"Om",
    to:"Gauri",
    msg:"Its long time to chats",
    create_at:new Date()
},
{
    from:"Radha",
    to:"Krishna",
    msg:"Our destiny is true.",
    create_at:new Date()
},
]).then((res)=>{console.log(res)})
.catch((err)=>{console.log(err)});