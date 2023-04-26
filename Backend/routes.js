const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
const fs = require('fs');
const moment = require('moment');

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
};


router.get("/shutdown/:seconds", (req, res) => {

         const seconds = req.params.seconds;

    async function shutdown (seconds) {

        // Function that turns off the computer in 3s by default
        await execute(`shutdown -s -t ${seconds}`, (output) => {

            console.log(`O computador será desligado em ${seconds} segundos`)

            res.json({computer_shutdown: true})


            const shutdownDetails = `${seconds} ${moment().locale('pt-br').format('L')}` 

                        // fileName is a string that contains the path and filename created in the save file dialog.  
                fs.writeFile('shutdownPref.txt', shutdownDetails, (err) => {
                    if(err){
                        console.log("An error ocurred creating the file "+ err.message)
                    }
                                
                    console.log("The file has been succesfully saved");
                });

        });

    }

    console.log(`Desligando em ${seconds}`)

    shutdown(seconds)
});

router.get("/restart/:seconds", (req, res) => {

    const seconds = req.params.seconds;
    
    function restart (seconds) {

        console.log(seconds)
       // Function that turns off the computer in 3s by default
        execute(`shutdown -r -t ${seconds}`, (output) => {

            console.log(`O computador será reiniciado em ${seconds} segundos`)

           res.json({computer_restart: true})
       });

   }

   restart(seconds);
});


router.get("/cancel", (req, res) => {

     function shutdownCancel () {

        // Function that turns off the computer in 3s by default
         execute(`shutdown -a`, (output) => {

            console.log('Desligamento cancelado')

            res.json({shutdown_canceled: true})
        });

    }

    shutdownCancel();
});


module.exports = router;