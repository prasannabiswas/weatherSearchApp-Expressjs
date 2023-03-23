const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res)=>{
    console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "d34c6f47a45743bdb58212921231803&q";
    const url  = "https://api.weatherapi.com/v1/current.json?key="+ apiKey +"="+ query +"&aqi=no";

    https.get(url,(response)=>{
        // console.log(response.statusCode);

        response.on("data",(data)=>{
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.current.temp_c;
            console.log(temp);
            const weatherDesciption = weatherData.current.condition.text;
            console.log(weatherDesciption);
            const icon = weatherData.current.condition.icon;
            const imageURL = icon;
            res.write("<h1>The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>");
            res.write("<h1>The weather is currently "+weatherDesciption+".</h1>");
            res.write("<img/ src=" + imageURL +">");
            res.send();
        })
    })

    console.log("Post request received");
});



 

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});