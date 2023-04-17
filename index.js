// Imports
const express = require('express');
const path = require('path');
const router = express.Router();

const app = express();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
    // res.sendFile('index.html', {root: path.join(__dirname, 'public')});
});

const port = process.env.PORT || 3000;

app.use('/public', express.static(__dirname + '/public'));
app.use('/', router);


app.listen(port, () => {
    console.log('Listening on port ' + port)
});
