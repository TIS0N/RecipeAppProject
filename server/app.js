const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.get('/technet', (req, res) => {
    res.send('Hello - novinky ze sveta techniky!')
});

app.get('/book/create', (req, res) => {
    res.send('Hello - novinky ze sveta techniky!')
});

app.get('/book/read', (req, res) => {
    res.send('Hello - novinky ze sveta techniky!')
});

app.get('/techbook/list', (req, res) => {
    res.send('Hello - novinky ze sveta techniky!')
});

app.get('/book/update', (req, res) => {
    res.send('Hello - novinky ze sveta techniky!')
});

app.get('/book/delete', (req, res) => {
    res.send('Hello - novinky ze sveta techniky!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});