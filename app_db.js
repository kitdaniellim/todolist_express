const express = require('express');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const app = express();

//npm install mysql for the connection to our SQL database phpmyadmin
const mysql = require("mysql");

//initialize db
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "express_tutorial" //db to connect to
});
    
//actual connection
connection.connect((err) => {
    if (err) throw (err);
    console.log("Currently connected to the 'express_tutorial' database.");
})

let data = [{item: "Add video"}, {item: "Do laundry"}, {item: "Pass the assignment"}];

app.set('view engine', 'ejs');

//every time you load a static file, it will directly redirect to public
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('Hello World');
})


app.get('/todo', (req, res) => {
    connection.query("SELECT * FROM todolist", (err, response) => { 
        if (err) throw err;
        
        let database = response;
        // console.log(database);

        res.render('todo', {todos: database});
    });
})

app.post('/todo', urlEncodedParser, (req, res) => {
    // data.push(req.body); //change to sql
    let sql = "INSERT INTO todolist (item) VALUES ('" + req.body.item +"')";
    connection.query(sql, (err) => { 
        if (err) throw err; 
        console.log("1 task inserted successfully.");
    });
    res.json(req.body);
})

app.delete('/todo/:id', (req, res) => {
    // data = data.filter((todo) => { //change to sql
    //     return todo.item.replace(/ /g, '-') !== req.params.item 
    // })
    let sql = "DELETE FROM todolist WHERE ID = '" + req.params.id + "'";
    connection.query(sql, (err) => { 
        if (err) throw err; 
        console.log("1 task has been deleted!");

        //params because values are in the url ':id', not req.body
        res.send(req.params.id);
    });
    
})

app.listen(3000, () => {
    console.log("Your server is connected hooray!");
});