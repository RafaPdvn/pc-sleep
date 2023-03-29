const { app, BrowserWindow } = require('electron');
const exec = require('child_process').exec;


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true
  })

  win.loadFile('index.html')
}



app.whenReady().then(() => {
  createWindow()

  // function execute(command, callback) {
  //     exec(command, (error, stdout, stderr) => { 
  //         callback(stdout); 
  //     });
  // };

  // call the function
  execute('ping google.com', (output) => {
    console.log(output);

    console.log('Reiniciando em 5, 4, 3, 2, 1')
  });

})