const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");


const app = express();


app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    console.log(req.body.lName);
    mailchimp.setConfig({
        apiKey: "b16833066fc87682cff6e6c27de06ce1-us13",
        server: "us13"
    })
    const listID = "854e435998";
    var isSuccess= false;
    const data = {
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        isSuccess
    };
    async function run() {
        const response = await mailchimp.lists.addListMember(listID, {
            email_address: data.email,
            status: "subscribed",
            merge_fields: {
                FNAME: data.firstName,
                LNAME: data.lastName,
            }
            
        }).catch((error)=>{});
        if (response){
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html");
        }
    } 
    run();
    
});



app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running at port 3000");
})



//audience id
//854e435998

//api key
//b16833066fc87682cff6e6c27de06ce1-us13