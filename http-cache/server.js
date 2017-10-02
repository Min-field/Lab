const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 
const mime = require('mime'); 

function serve(res, absPath){
    fs.exists(absPath, (exist) => {
        if(!exist) 
            send404(res); 
        else {
            fs.readFile(absPath, (err, data) => {
                if(err)
                    send404(res); 
                else {
                    sendFile(res, data, absPath); 
                }
            });
        }
    });
}

function send404(res){
    res.writeHead(404, {
        'Content-type': 'text/plain'
    });
    res.write('404 - not found'); 
    res.end(); 
}

function sendFile(res, data, absPath){
    var date = new Date(); 
    res.writeHead(200, {
        'Content-type': mime.getType(path.basename(absPath))
    }); 
    res.end(data); 
}

http.createServer((req, res) => {
    let url = req.url; 
    serve(res, path.resolve(__dirname, './' + url), res); 
}).listen(3000, () => {
    console.log('server listen in port 3000');
})