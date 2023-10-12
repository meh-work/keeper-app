const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

const db = 'mongodb+srv://mehworkwithme:akRdSMHhRyMZnP8l@cluster0.m30coht.mongodb.net/keeperAppDatabase?retryWrites=true&w=majority'
mongoose.connect(db).then(()=>{
    console.log("Database connected successfully.");
})

const keeperSchema = mongoose.Schema({
    title:String,
    content:String
});

const Keeper = new mongoose.model("Keeper",keeperSchema);

app.get("/",(req,res)=>{
    res.send("Backend connected successfully.")
})

app.get("/api/getAll",(req,res)=>{
    Keeper.find({},(err,keeperList)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(keeperList)
        }
    });
})
app.post("/api/addNew",(req,res)=>{
    console.log(req.body);
    const {title,content} = req.body;
    const keeperObj = new Keeper({
        title,
        content
    })
    keeperObj.save(err => {
        if(err){
            console.log(err);
        }
        Keeper.find({},(err,keeperList)=>{
            if(err){
                console.log(err);
            }else{
                res.status(200).send(keeperList)
            }
        });
    })
});

app.post("/api/delete",(req,res)=>{
    const{id} = req.body;
    Keeper.deleteOne({_id:id},()=>{
        Keeper.find({},(err,keeperList)=>{
            if(err){
                console.log(err);
            }else{
                res.status(200).send(keeperList)
            }
        });
    })
})

app.listen(PORT,(req,res)=>{
    console.log("Backend connected successfully.");
})