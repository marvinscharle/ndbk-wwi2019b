const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const app = express();
const redisClient = redis.createClient();

// npm init => Neues Node.js-Projekt initialisieren
// npm install express => Express installieren
// npm install -D nodemon => Nodemon als Dev-Dependency installieren
// npm install redis => Redis-Client installieren
// npm install body-parser => Body Parser installieren

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hallo Welt');
});

app.get('/chats/:id', (req, res) => {
    redisClient.lrange(`chat.${req.params.id}`, 0, -1, (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        } else {
            res.send(data);
        }
    });
});

app.post('/chats/:id', (req, res) => {
    redisClient.rpush(`chat.${req.params.id}`, req.body.message, err => {
        if (err) {
            console.error(err);
            res.status(500).send('Error');
        } else {
            res.send('OK');
        }
    });
});

app.listen(3000); // => http://localhost:3000
