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

// Define the changeFOV function globally
function changeFOV() {

    let currentFOV = geofs.camera.currentFOV;
    let targetFOV;
    if(currentFOV>1.2)
    {
    targetFOV=5;
    }
    else{
        targetFOV=1.2;
    }
    let steps = currentFOV<targetFOV?0.1:-0.1;
    let interval = setInterval(function(){
    currentFOV+=steps;
    geofs.camera.setFOV(currentFOV);

    if((steps>0&&currentFOV>=targetFOV)||(steps<0&&currentFOV<=targetFOV)){
        clearInterval(interval);
        document.getElementById("changeFOV").innerHTML = "FOV Adjusted!";
    }
    },50);
    geofs.camera.animations.orbitHorizontal.active==1
}

// Dynamically create the panel div
let listdiv = document.createElement("div");
listdiv.setAttribute("data-noblur", "true");
listdiv.setAttribute("data-onshow", "{geofs.initializePreferencesPanel()}");
listdiv.setAttribute("data-onhide", "{geofs.savePreferencesPanel()}");
listdiv.setAttribute("class", "geofs-list geofs-toggle-panel geofs-livery-list geofs-visible");

// Adjusted inner HTML with no conflicting script tag
listdiv.innerHTML = '<h3>GeoCams</h3><ul>Adjust FOV</ul><button id="changeFOVButton" class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly">Change FOV</button>';

// Append the panel div to the UI
document.getElementsByClassName("geofs-ui-left")[0].appendChild(listdiv);

// Add the event listener to the button after it’s created
document.getElementById("changeFOVButton").addEventListener("click", changeFOV);

// Create a button to toggle the panel
let button1 = document.createElement("div");
button1.setAttribute("data-noblur", "true");
button1.innerHTML = '<button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-tooltip-classname="mdl-tooltip--top" id="ebutton">Button</button>';

// Append the button for the panel toggle
let buttonDiv = document.createElement("div");
buttonDiv.innerHTML = '<button class="mdl-button mdl-js-button geofs-f-standard-ui geofs-mediumScreenOnly" data-toggle-panel=".geofs-livery-list" data-tooltip-classname="mdl-tooltip--top" tabindex="0" id="cambutton" size="50%">Geocams</button>';
document.body.appendChild(buttonDiv);

// Insert the button into the appropriate UI section based on the GeofS version
let element = document.getElementById("cambutton");
if (geofs.version >= 3.6) {
    document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(element, document.getElementsByClassName("geofs-ui-bottom")[0].children[4]);
} else {
    document.getElementsByClassName("geofs-ui-bottom")[0].insertBefore(element, document.getElementsByClassName("geofs-ui-bottom")[0].children[3]);
}

// Function to clear list panel (if needed)
function listPanel() {
    document.getElementById("ListPanel").innerHTML = "";
}
