var http = require('http'),
    urlLib = require('url'); 

var data = {
    'data': 'world'
}

http.createServer((req, res) => {
    var params = urlLib.parse(req.url); 
    if(params.query.callback){
        console.log(params.query.callback); 
        var str = params.query.callback + '(' + JSON.stringify(data) + ')'; 
        res.end('str'); 
    }
}).listen(8000, () => {
    console.log('server listen in port 3000'); 
})