
const http = require('http');
const {handleReqRes} = require('./helpers/handleReqRes');
//const {enviornment} = require('./helpers/environments');
const data = require('./lib/data');
//a App object 
const app = {};

//testing file file system
//data.delete('test', 'newFile', (err) => {
 // console.log(err);
 //});

//data.update('test', 'newFile', {name: 'kolkata', language: 'bangla'}, (err, result) => {
 //   console.log(err);
//});

app.config = {
    port: 3000,
};

//creat server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () =>{
        console.log(`listening to port ${app.config.port}`);
    });
};

// handle Request response
app.handleReqRes = handleReqRes;
    
// start the server
app.createServer();