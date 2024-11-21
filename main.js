// import {send_to_server} from "./chat.js";

var websocket = NaN;
var user_id = NaN;


function send(){
    var text = document.getElementById("textarea").value;
    // console.log(text);
    document.getElementById("tdisplay").innerHTML = text;

    // display(text);

    document.getElementById("textarea").value = ""; 

    send_to_server(text);
    
}


function send_to_server(text, id=user_id, action="SEND"){
    if(websocket == NaN){
        console.log("socket undefined");
        return;
    }
    const message = {user_name: id, action: action, message_id: Date.now(), text: text};
    websocket.send(JSON.stringify(message));
}

//creates the message element on the browser
function display(text, user, id){
    const container = document.getElementById("display");
    const div_text = document.createElement("div");
    div_text.id = id;
    var str = user + ": " + text;
    const d = document.createTextNode(str);
    div_text.appendChild(d);
    container.appendChild(div_text);
}


// function show_message(message){

// }

function recieve(){
    console.log("rec");
    websocket.addEventListener("message", (data) =>{
        console.log(data);
    });
}

// window.addEventListener("DOMContentLoaded", ()=>{

// });

function join(){
    var id = document.getElementById("textarea").value;
    if (id.length < 1) {
        document.getElementById("textarea").value = "enter valid username"; 
        return;
    }
    user_id = id;
    websocket = new WebSocket("ws://localhost:8001/");

    websocket.onopen = (event) => {
        send_to_server("connected", user_id, action="join");
    };
    websocket.onmessage = (event) => {
        console.log(event.data);
        let dict = JSON.parse(event.data);
        console.log(typeof(dict));
        console.log(dict);
        display(dict["text"], dict["user_name"], dict["message_id"]);

    }
    websocket.addEventListener("message", (data) =>{
        console.log(data);
    });
}

window.addEventListener('load', () => {
    // join();
    // send();
    // recieve();
});