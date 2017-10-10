const $ajax = function(url){
    return new Pormise((resolve, reject) => {
        let xhr = new XMLhttpRequest(); 
        xhr.open('get', url, true); 
        xhr.onreadystatechange = function(){
            if(xhr.readystate === 4){
                if(xhr.status >= 200 && xhr.status < 300)
                    resolve(xhr.responseText); 
                else 
                    reject(xhr.responseText); 
            }
        }
    })
}

$ajax(url)
    .then((data) => {
        callback(data); 
    }, () => {
        console.log('error');
    })