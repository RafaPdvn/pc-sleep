const express = require('express');
const res = require('express/lib/response');
const app = express();
const exec = require('child_process').exec;
const cors = require('cors');
const routes = require('./routes');

  function execute(command, callback) {
      exec(command, (error, stdout, stderr) => { 
          callback(stdout); 
      });
  };

 async function testFuncion (req, res) {

    execute('shutdown -s -t 3', (output) => {

        console.log('Reiniciando em 5, 4, 3, 2, 1')
    });

    // execute('shutdown -a', (output) => {

    //     console.log('CANCELOU')
    // });

}

// Setting cors
app.use(cors());

// Setting routes
app.use(routes);

app.listen(process.env.PORT || 8080, () => {
    console.log('The server is running');
})