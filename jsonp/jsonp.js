// 简单的jsonp函数，在head中插入一个script脚本，脚本的源路径中自带一个callback的名字，服务器更具传入的callback以及
// 后台的数据返回一个可执行的脚本，这样的jsonp比较大的问题是内存会不断的飙升，同时，无法确定脚本执行是否超时等
function jsonp(req){
    var script = document.createElement('script'); 
    script.src = req.url + "?callback=" + req.callback.name; 
    document.getElementsByTagName('head')[0].appendChild(script);
}

function hello(res){
    alert('hello', res.data); 
}

jsonp({
    url: '',
    callback: hello
})

/**
 * jsonp封装 注意点: 
 * 1. 每次函数执行之后，将jsonp返回的调用函数销毁
 * 2. 控制延时函数
 */

var JSONP = (function(){
    var count = 0, head, error, window = this; 

    function jsonp(url, params, error, callback, delay){
        url += '?'; 
        Object.keys(params).forEach(function(key){
            url = url + key + '=' + params[key]; 
        }); 
        var jsopName = 'jsonp' + (count++); 
        url = url + 'callback=' + jsonpName; 

        window[jsonpName] = function(data){
            callback(data); 
            try{
                delete window[jsonpName]; 
            }catch(e){
                console.error(e); 
            }
            window[jsonpName] = null; 
        }

        load(url); 
        error = error || function(){}

        window.settimeout(function(){
            if(typeof window[jsonpName] === 'function'){
               window[jsonpName] = function(data){
                    try{
                        delete window[jsonp]; 
                    }catch(e){}
                    wondow[jsonpName] = null; 
               } 
            
               error(); 

            }
        }, delay);
    }

    function load(url){
        var script = document.createElement('script'); 
        var done = false; 
        script.src = url; 
        script.async = true; 
        script.onload = script.onreadystatechange = function(){
            if(script.readystate === 'complete' || script.readystate === 'load'){
                script.onload = script.onreadystatechange = null; 
                if(script && script.parentNode)
                    script.parentNode.removeChild(script); 
            }
        }
        head = head || document.getElementsByTagName('head')[0]; 
        head.appendChild(script);
    }

    return {
        get: jsonp
        
    }
})(); 