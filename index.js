import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users=[];
const tweets=[];

app.post("/sign-up", (req, res) =>{
    const {username, avatar}=req.body;
    if(!username||!avatar){
        res.status(400).send({message:"Todos os campos são obrigatórios"});
    }
    users.push({username, avatar});
    //console.log(users);   
    res.status(201).send("OK");
})

app.post("/tweets", (req, res) =>{
    const {username, tweet}=req.body;
    if(!username||!tweet){
        res.status(400).send({message:"Todos os campos são obrigatórios"});
    }
    let exist=false;
    for(let i=0; i<users.length; i++){
        if(username===users[i].username){
            exist=true;
        }
    }
    if(exist===false){
        res.status(401).send({message: "UNAUTHORIZED"});
    }
    const {avatar}=users.find((user)=>user.username===username);
    tweets.push({username, tweet, avatar});
    //console.log(tweets);
    res.status(201).send("OK");
});

app.get("/tweets", (req, res) =>{
    res.send(tweets.slice(-10));
});

app.listen(5000, ()=>{console.log("listening on port 5000")});
