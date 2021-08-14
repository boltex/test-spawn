//import * as child from 'child_process';
var http = require('http');
var child = require('child_process');

console.log('test - Ctrl+c to stop.');

setInterval(() => { console.log("hi from node js every 5 sec"); }, 5000);

var w_options = {
    // Child to run independently of its parent process. Depends on the platform.
    // detached: true,

    // Runs command in a shell. '/bin/sh' on Unix, process.env.ComSpec on Windows.
    // shell: true
};

// w_options.stdio = ['inherit', 'inherit', 'inherit'];
// w_options.stdio = ['inherit', 'pipe', 'pipe'];
// w_options.stdio ['pipe', process.stdout, process.stderr];

var _serverProcess = child.spawn("python3", ["test.py"], w_options); // SPAWN method

// To prevent the parent from waiting for a given subprocess to exit
// _serverProcess.unref();

// Capture the OUTPUT and send it to the "leo server" OutputChannel
if (_serverProcess && _serverProcess.stdout) {
    _serverProcess.stdout.on("data", (p_data) => {

        p_data.toString().split("\n").forEach(p_line => {
            p_line = p_line.trim();
            console.log("js got data line :" + p_line)
        });



    });
} else {
    console.error("No stdout");
}

// Capture the ERROR channel and set flags on server errors
if (_serverProcess && _serverProcess.stderr) {
    _serverProcess.stderr.on("data", (p_data) => {
        console.log(`stderr: ${p_data}`);
        this._isStarted = false;
        if (!this._leoIntegration.activated) {
            return;
        }
        _serverProcess = undefined;
    });
} else {
    console.error("No stderr");
}

// Capture the CLOSE event and set flags on server actually closing
if (_serverProcess) {
    _serverProcess.on("close", (p_code) => {
        console.log(`Server exited with code ${p_code}`);
        _serverProcess = undefined;
    });
}

// Just to stay alive
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello World!');
}).listen(8080);

