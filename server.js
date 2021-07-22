const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for Project
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));

mongoose.connect(process.env.MONGOOSE_URI || 'mongodb://localhost/the-social-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.set('debug', true);

app.use(require('./routes'));
app.listen(PORT, () =>
    console.log(`Server initialized on localhost: ${PORT}`)
);