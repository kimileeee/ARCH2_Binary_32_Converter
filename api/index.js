// Imports
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
});

const port = 8080;

app.use('/public', express.static(__dirname + '/public'));
app.use('/', router)

app.listen(port, () => {
    console.log('Listening on port ' + port)
})