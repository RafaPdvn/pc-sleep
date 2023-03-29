const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => { 
        callback(stdout); 
    });
};


router.get("/shutdown/:seconds", (req, res) => {

         const seconds = req.params.seconds;

         console.log(seconds)
    async function shutdown (seconds) {
        
        console.log(seconds)

        // Function that turns off the computer in 3s by default
        await execute(`shutdown -s -t ${seconds}`, (output) => {
    
            console.log(`O computador será desligado em ${seconds} segundos`)
        });
    
    }

    shutdown(seconds)
})


module.exports = router;