const express = require('express');
const res = require('express/lib/response');
const app = express();
const exec = require('child_process').exec;
const cors = require('cors');
const routes = require('./routes');

// Setting cors
app.use(cors());

// Setting routes
app.use(routes);

app.listen(process.env.PORT || 8080, () => {
    console.log('The server is running');
})