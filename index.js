import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = "AEZQUFFA4FY43C79ECERRFBYG";
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static")); // Serve static files from the "static" directory
app.use(express.json());

const config = {
    params: {key:apiKey,contentType:"json"},
  };

app.post("/post",async(req,res)=>{
    var location = req.body.search;
    try{
        const result = await axios.get(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}`,config);
        console.log(result.data.days[0]);
        res.render("view.ejs",{weather:result.data.days,location:location})
    }catch(error){
        console.log(error.response.data);
        res.render("view.ejs",{error:error.response.data,location:location});
    };
});

app.get("/",(req,res)=>{
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});