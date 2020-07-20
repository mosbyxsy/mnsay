export default function loadJs(url, callback){
    const script = document.createElement("script");
    script.type = "text/javascript";
    if (callback) {
        if (script.readyState){ //IE
            script.onreadystatechange = function(){
                if (script.readyState === "loaded" ||
                    script.readyState === "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else { //Others: Firefox, Safari, Chrome, and Opera
            script.onload = function(){
                callback();
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}