const express = require("express");
const fs = require("fs");
const ejs = require("ejs");
const bodyparser = require('body-parser');
const mysql = require("mysql");
const app = express();
const urlencodedParser = bodyparser.urlencoded({extended: false});

// add tasks
// view tasks
// edit tasks but im' too lazy pa

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "db",
});

connection.connect((err)=>{
    if (err) throw (err);
    console.log("connected");
});

app.set('view engine', 'ejs');

app.get("/", urlencodedParser, (req, res)=>{
    connection.query("SELECT * FROM todolist", (err, response) => {
        let rows = response;
        res.render('test', {rows: rows});
    });
})

app.post("/", urlencodedParser, (req, res)=> {
    let data = req.body;
    console.log(data);
    connection.query("INSERT INTO todolist(item) VALUES('"+data.tasks+"')", (err)=>{
        if (err) throw err;
        res.redirect("/");
    })
});

app.get("/delete/:row_id", (req, res) => {
    let row_id = req.params.row_id;
    connection.query("DELETE FROM `todolist` WHERE id="+row_id);
    res.redirect("/");
});

app.listen(3000);
