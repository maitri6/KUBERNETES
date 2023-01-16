require('dotenv').config();

const express=require('express');
const http=require('http');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const cors = require("cors");


const app=express();
app.use(express.json());

const server=http.createServer(app);
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

const indexRouter = require("./routes/index");
console.log(process.env.MONGO_USERNAME);




//mongoose connection
//mongoose.connect("mongodb://kube:kube@localhost:27017/kube", {
 mongoose.connect(`mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:27017/kube`,{

   useNewUrlParser: true,
   useUnifiedTopology: true
});


app.use("/api/v1", indexRouter);
const dbConn = mongoose.connection;
dbConn.on("error", () => {
 console.log("Mongodb connection error");
});

dbConn.once("open", function () {
    console.log("Mongodb connected successfully");
});

app.get('/',function(req,res) {
    res.send("Doctor Patient App Runs")
});

server.listen(3003,function(){
    console.log("Server is running at 3003");
})
