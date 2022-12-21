const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

let items = ["Buy Groceries", "Cook Food"];
let workItems = [];

app.get("/",(req,res)=>{
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "numeric",
        year: "numeric"
    };
    let day = today.toLocaleDateString("en-IN", options);
    res.render("list",{
        listTitle: day,
        newListItems: items
    });
});

app.post("/",(req,res)=>{
    let item = req.body.newItem;
    if(req.body.list === "Work"){
        workItems.push(item);
        res.redirect("/work");
    }
    else{
        items.push(item);
        res.redirect("/");
    }
})

app.get("/work",(req,res)=>{
    res.render("list",{
        listTitle: "Work",
        newListItems: workItems
    })
})

app.listen(3000,()=>{
    console.log("Server running on port 3000.");
});