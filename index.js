// Imports
const express = require('express');
const path = require('path');
const product = require('./api/product');

const app = express();

const port = process.env.PORT || 3000;

app.use('/api/product', product);
app.use('/public', express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log('Listening on port ' + port)
})