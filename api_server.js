// Local에서 json 전달하기 위해 서버 구축


const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const path = require("path");

app.get("/", (req, res)=>{
    res.header("Content-Type","application/json")
    res.sendFile(path.join(__dirname, "./ibm.json"))
});

app.listen(3035, ()=>{ console.log("Listening") });