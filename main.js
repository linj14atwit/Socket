var websocket = NaN;

function send(){
    var text = document.getElementById("textarea").value;
    console.log(text);
    document.getElementById("tdisplay").innerHTML = text;

    const container = document.getElementById("display");
    const dis_text = document.createElement("div");
    const d = document.createTextNode(text);
    dis_text.appendChild(d);
    container.appendChild(dis_text);

    document.getElementById("textarea").value = ""; 

    websocket.send(text);
    
}

function show_message(message){
    console.log(message);
}

function recieve(){
    show_message("rec");
    websocket.addEventListener("message", (data) =>{
        show_message(data);
    });
}

// window.addEventListener("DOMContentLoaded", ()=>{
    
// });
function join(){
    websocket = new WebSocket("ws://localhost:8001/");

    websocket.onopen = (event) => {
        websocket.send("connected");
    };
    websocket.onmessage = (event) => {
        console.log(event.data)
    }

    // recieve(websocket);
    // send(websocket);
}
