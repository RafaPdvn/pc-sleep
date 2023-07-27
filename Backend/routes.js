const express = require('express');
const router = express.Router();
const exec = require('child_process').exec;
var fs = require("fs");
const moment = require('moment'); // require

async function readFile(){
    await fs.readFile('pref.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
         console.log(JSON.stringify(data))
    }});
}

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
};


router.get("/shutdown/:seconds", async (req, res) => {

         const seconds = req.params.seconds;

    async function shutdown (seconds) {

        // Function that turns off the computer in 3s by default
        await execute(`shutdown -s -t ${seconds}`, (output) => {

            console.log(`O computador será desligado em ${seconds} segundos`)

            res.json({computer_shutdown: true})
        });

    }

    var preferences = {
        seconds: [],
        time: moment().locale('pt-br').format('L')
    };

    preferences.seconds.push(seconds)

    await readFile().then(() => {

        fs.writeFile("./pref.json", JSON.stringify(preferences, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log("File has been created");
        });

    })

 

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