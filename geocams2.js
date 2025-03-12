// ==UserScript==
// @name         Geocams 2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  livery addon
// @author     spice9
// @match http://*/geofs.php*
// @match https://*/geofs.php*
// @run-at document-end
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

function changeFOV()
{
    geofs.camera.setFOV("1.2");
    document.getElementById("changeFOV").innerHTML = "";
}

let listdiv = document.createElement("div");
    listdiv.setAttribute("data-noblur", "true");
    listdiv.setAttribute("data-onshow", "{geofs.initializePreferencesPanel()}");
    listdiv.setAttribute("data-onhide", "{geofs.savePreferencesPanel()}");
    listdiv.setAttribute("class", "geofs-list geofs-toggle-panel geofs-livery-list geofs-visible")
    listdiv.setAttribute("onClick", "changeFOV()")
    listdiv.innerHTML = '<h3>GeoCams</h3><ul>Adjust fov</ul> <script type = "type/javascript">function changeFOV(){geofs.camera.setFOV("1.2");}</script> <button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" onClick = "changeFOV()">Change fov</button>'
    document.getElementsByClassName("geofs-ui-left")[0].appendChild(listdiv);

let button1 = document.createElement("div");
   button1.setAttribute("data-noblur", "true");
   button1.innerHTML = '<button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-tooltip-classname="mdl-tooltip--top" id = "ebutton" onClick = "changeFOV()">Button</button>'
 //  document.getElementById("ListPane").appendChild(button1);
    // Button for panel
    let buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = '<button class="button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-toggle-panel=".geofs-livery-list"  data-tooltip-classname="mdl-tooltip--top"  tabindex="0" id="cambutton" size = "50%" onClick = "listPanel()">  Geocams  </button>'
    document.body.appendChild(buttonDiv);
    let element = document.getElementById("cambutton");
    if (geofs.version >= 3.6){
        document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(element, document.getElementsByClassName("geofs-ui-bottom")[0].children[4]);
    } else {
        document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(element, document.getElementsByClassName("geofs-ui-bottom")[0].children[3]);
    }

function listPanel(){
    document.getElementById("ListPanel").innerHTML = "";

}