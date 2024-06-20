function typingTextEffect(id, text, typeSpeed){
    var i = 0;
    function typeText(){
        if(i < text.length){
            document.getElementById(id).textContent += text[i];
            i++;
            console.log("Type");
            setTimeout(typeText, typeSpeed);
        }
    }
    typeText();
}

function getJoke(callback)
{
    var host = window.location.protocol + "//" + window.location.host;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback("titleJoke", JSON.parse(xmlHttp.responseText).joke, 50);
    }
    xmlHttp.open("GET", host + "/random", true);
    xmlHttp.send(null);
}
getJoke(typingTextEffect);