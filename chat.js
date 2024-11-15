function send_to_server(websocket, id, text){
    if(websocket == NaN){
        return;
    }
    const message = {user_id: id, action:"SEND", message_id: Date.now(), text: text};
    websocket.send(JSON.stringify(message));
}
 
function listen(){

}
