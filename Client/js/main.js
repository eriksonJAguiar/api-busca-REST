var pesquisou = false;
var createNewElements = function(rjson){
    var myDiv = document.getElementById("resultados");
    
    for(var index in rjson){

        if(rjson[index].titulo == undefined || rjson[index].url == undefined)
            continue;

        var p = document.createElement("p");
        var a = document.createElement("a");

        var pnode = document.createTextNode(rjson[index].titulo);
        var anode = document.createTextNode("["+ rjson[index].url +"]");
        a.setAttribute("href",rjson[index].url);

        p.appendChild(pnode);
        a.appendChild(anode)
        myDiv.appendChild(p);
        myDiv.appendChild(a);
    }

    pesquisou = true;
}

var search = function(){

    if(pesquisou){
        limpar();
    }
    
    var word_search = document.getElementById("txtBusca").value;
    var url = "http://localhost:8081/api/"+word_search.replace(" ","+");
    function httpGet() {
        return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();
            request.open("GET", url);
            request.responseType = "json";
            request.addEventListener("readystatechange", function () {
                if (request.readyState == 4){
                    if (request.status == 200){
                        resp = request.response;
                        resolve(resp);
                    }
                }
            });
            request.send();
        });
    }
    httpGet().then(resp => createNewElements(resp)); 
}

var limpar = function(){
    document.getElementById('resultados').innerHTML = location.reload();
    document.getElementById("txtBusca").value = "";
}