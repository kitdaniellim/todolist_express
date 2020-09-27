const express = require('express');
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const app = express();

let data = [{item: "Add video"}, {item: "Do laundry"}, {item: "Pass the assignment"}];

app.set('view engine', 'ejs');

//every time you load a static file, it will directly redirect to public
app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.get('/todo', (req, res) => {
    res.render('todo', {todos: data});
})

app.post('/todo', urlEncodedParser, (req, res) => {
    data.push(req.body);
    console.log(req.body);
    res.json(data);
})

app.delete('/todo/:item', (req, res) => {
    data = data.filter((todo) => {
        return todo.item.replace(/ /g, '-') !== req.params.item 
    })
    res.json(data);
})

app.listen(3000, () => {
    console.log("Your server is connected hooray!");
});