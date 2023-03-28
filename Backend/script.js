const exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => { 
        callback(stdout); 
    });
};

// call the function
execute('sleep -s -t', (output) => {
    console.log(output);

    console.log('Reiniciando em 5, 4, 3, 2, 1')
});

