const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const PORT = process.env.PORT || 5000;

const config = require('./config');


const app = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then(() => console.log(chalk.green('Database Initialized.')))
    .catch((err) => console.log(chalk.red(err)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/images', require('./routes/imageRoutes'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

 app.listen(PORT, (err) => {
    if (err)
        console.error(err);
    else
        console.log(chalk.green(`API Running on port ${PORT}`));
});