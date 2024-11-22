// import {send_to_server} from "./chat.js";

// const websocket = new WebSocket(getWebSocketServer());
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
    // div_text.style.backgroundColor = 
    var str = user + ": " + text;
    const d = document.createTextNode(str);
    div_text.appendChild(d);
    container.appendChild(div_text);
}

function display_messages() {
    document.getElementById("display").innerHTML = ""
    for (let msg of messages) {
        let container = document.getElementById("display");
        let disp = document.createElement("div");
        let d = document.createTextNode(`${msg.sender}: ${msg.message_text}`);

        disp.className = "message";
        disp.appendChild(d);
        container.appendChild(disp);
    }
}


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
    console.log("join");

    if(websocket == NaN){
    websocket = new WebSocket(getWebSocketServer());
    }

    websocket.onopen = (event) => {
        send_to_server("connected", user_id, action="JOIN");
    };

    websocket.onmessage = (event) => {
        console.log(event.data);
        let dict = JSON.parse(event.data);
        console.log(dict);
        if (dict["action"]=="DENY"){
            document.getElementById("textarea").value = "username taken";
            document.getElementById("join").disabled = false;
            user_id = NaN;
        }
        display(dict["text"], dict["user_name"], dict["message_id"]);

    }
    // websocket.addEventListener("message", (data) =>{
    //     console.log(data);
    // });

    document.getElementById("join").disabled = true;
}

function getWebSocketServer() {
    if (window.location.host === "linj14atwit.github.io") {
      return "wss://peaceful-harbor-39175-23737a204d74.herokuapp.com/";
    } else if (window.location.host === "localhost:8000") {
      return "ws://localhost:8001/";
    } else {
      throw new Error(`Unsupported host: ${window.location.host}`);
    }
  }

// window.addEventListener('load', () => {
    // join();
    // send();
    // recieve();
// });


// window.addEventListener("DOMContentLoaded", () => {
//     // Open the WebSocket connection and register event handlers.
//     const websocket = new WebSocket(getWebSocketServer());
//   });