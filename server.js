const express = require('express');
// const bodyParser = require('body-parser');
const mongodb = require('./data/database.js');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
// app.use(bodyParser.json())
app
    .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
    })
    .use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
    process.exit(1); 
});


mongodb.initDb((err) => {
    if (err) {
        console.log('err');
    } else {
        app.listen(port, () => {console.log(`Server is running on port ${port}`)});
    }
});
