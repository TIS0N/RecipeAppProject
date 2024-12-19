const express = require('express');
const app = express();
const port = 3000;
const crypto = require("crypto");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello world, I like you!')
});

const bookList = [];

app.post('/book/create', (req, res) => {
    const body = req.body;

    const newBook = {
        id: crypto.randomBytes(16).toString("hex"),
        ...body, 
    };

    bookList.push(newBook);

    res.json(newBook);
});

app.get('/book/read', (req, res) => {
    const query = req.query;
   const book = bookList.find(item => item.id === query.id);
    res.json(book);
});

app.get('/book/list', (req, res) => {

    res.json(bookList);
});

app.post('/book/update', (req, res) => {
    const body = req.body;
    const bookIndex = bookList.findIndex((item) => item.id === body.id);
    const book = bookList[bookIndex];
    bookList[bookIndex] = {...book, ...body };
    res.send(bookList[bookIndex]);
});

app.post('/book/delete', (req, res) => {
    const body = req.body;
    const bookIndex = bookList.find(item => item.id === body.id);
    bookList.splice(bookIndex, 1);
    res.send({});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


