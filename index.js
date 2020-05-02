const config = require('config');
const mongoose = require('mongoose');
const customers = require('./routes/customer');
const users = require('./routes/users');
const auth = require('./routes/auth');
const express = require('express');
const router = express.Router();
const app = express();

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to database'))
    .catch(err => console.error('Could not connect to database', err));

app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.listen(3000, () => console.log(`Listening on port 3000...`));
