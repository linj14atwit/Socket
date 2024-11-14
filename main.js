
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
}


function recieve(){

}