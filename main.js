
var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))

mongoose.connect('mongodb+srv://jaya232:jaya232000@cluster0.lg6os.mongodb.net/formdb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})



var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))
app.post("/success.html",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;

    var data = {
        "name": name,
        "email" : email,
        "subject": subject,
        "message" : message
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
        
    });
    
    return res.redirect('success.html')

})




app.listen(process.env.PORT || 3000,function(){
    console.log("Listening on PORT 3000");
})

