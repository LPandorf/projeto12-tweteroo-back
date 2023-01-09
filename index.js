import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users=[];
const tweets=[];

app.post("/sign-up", (req, res) =>{
    const {username, avatar}=req.body;
    users.push({username, avatar});
    //console.log(users);   
    res.status(200).send("OK");
})

app.post("/tweets", (req, res) =>{
    const {username, tweet}=req.body;
    const {avatar}=users.find((user)=>user.username===username);
    tweets.push({username, tweet, avatar});
    //console.log(tweets);
    if(!username){
        res.status(401).send("UNAUTHORIZED");
    }
    res.status(200).send("OK");
});

app.get("/tweets", (req, res) =>{
    res.send(tweets.slice(-10));
});

app.listen(5000, ()=>{console.log("listening on port 5000")});
