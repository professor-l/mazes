/* 
    global
    animateBacktrackingMaze,
    animatePrimsMaze,
    animateEllersMaze,
    animateKruskalsMaze,
    animateAldousBroderMaze,
    animateWilsonsMaze,
    animateRecursiveDivisionMaze,
    animateHuntAndKillMaze,
    animateSidewinderMaze,
    animateBinaryTreeMaze
*/

function drawMaze(maze, canvasId) {
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    
    var rectWidth = Math.floor(canvas.width / maze[0].length);
    var rectHeight = Math.floor(canvas.height / maze.length);
    
    for (var i = 0; i < maze.length; i++) {
        for (var j = 0; j < maze[i].length; j++) {
            if (maze[i][j]) {
                ctx.fillRect(rectWidth * j, rectHeight * i,
                             rectWidth, rectHeight);
            }
            else {
                ctx.clearRect(rectWidth * j, rectHeight * i,
                              rectWidth, rectHeight);
            }
        }
    }
}




var backtrackCanvas = document.getElementById("backtracking-maze-animation");
var ctx1 = backtrackCanvas.getContext("2d");

ctx1.font = "20px 'PT Serif'";
ctx1.textAlign = "center";
ctx1.fillRect(0, 0, backtrackCanvas.width, backtrackCanvas.height);
ctx1.fillStyle = "white";
ctx1.fillText("Click to animate", 240, 252);

async function backtrackOnclick() {
    ctx1.clearRect(0, 0, backtrackCanvas.width, backtrackCanvas.height);
    backtrackCanvas.onclick = null;
    await animateBacktrackingMaze(101, 101, "backtracking-maze-animation", 3);
    backtrackCanvas.onclick = backtrackOnclick;
}

backtrackCanvas.onclick = backtrackOnclick;





var primsCanvas = document.getElementById("prims-maze-animation");
var ctx2 = primsCanvas.getContext("2d");

ctx2.font = "20px 'PT Serif'";
ctx2.textAlign = "center";
ctx2.fillRect(0, 0, primsCanvas.width, primsCanvas.height);
ctx2.fillStyle = "white";
ctx2.fillText("Click to animate", 240, 252);

async function primsOnclick() {
    ctx2.clearRect(0, 0, primsCanvas.width, primsCanvas.height);
    primsCanvas.onclick = null;
    await animatePrimsMaze(101, 101, "prims-maze-animation", 3);
    primsCanvas.onclick = primsOnclick;
}

primsCanvas.onclick = primsOnclick;




var ellersCanvas = document.getElementById("ellers-maze-animation");
var ctx3 = ellersCanvas.getContext("2d");

ctx3.font = "20px 'PT Serif'";
ctx3.textAlign = "center";
ctx3.fillRect(0, 0, ellersCanvas.width, ellersCanvas.height);
ctx3.fillStyle = "white";
ctx3.fillText("Click to animate", 240, 252);

async function ellersOnclick() {
    ctx3.clearRect(0, 0, ellersCanvas.width, ellersCanvas.height);
    ellersCanvas.onclick = null;
    await animateEllersMaze(101, 101, "ellers-maze-animation", 8);
    ellersCanvas.onclick = ellersOnclick;
}

ellersCanvas.onclick = ellersOnclick;




var kruskalsCanvas = document.getElementById("kruskals-maze-animation");
var ctx4 = kruskalsCanvas.getContext("2d");

ctx4.font = "20px 'PT Serif'";
ctx4.textAlign = "center";
ctx4.fillRect(0, 0, kruskalsCanvas.width, kruskalsCanvas.height);
ctx4.fillStyle = "white";
ctx4.fillText("Click to animate", 240, 252);

async function kruskalsOnclick() {
    ctx4.clearRect(0, 0, kruskalsCanvas.width, kruskalsCanvas.height);
    kruskalsCanvas.onclick = null;
    await animateKruskalsMaze(101, 101, "kruskals-maze-animation", 3);
    kruskalsCanvas.onclick = kruskalsOnclick;
}

kruskalsCanvas.onclick = kruskalsOnclick;





var aldousBroderCanvas = document.getElementById("aldous-broder-maze-animation");
var ctx5 = aldousBroderCanvas.getContext("2d");

ctx5.font = "20px 'PT Serif'";
ctx5.textAlign = "center";
ctx5.fillRect(0, 0, aldousBroderCanvas.width, aldousBroderCanvas.height);
ctx5.fillStyle = "white";
ctx5.fillText("Click to animate", 240, 250);

async function aldousBroderOnclick() {
    ctx5.clearRect(0, 0, aldousBroderCanvas.width, aldousBroderCanvas.height);
    aldousBroderCanvas.onclick = null;
    await animateAldousBroderMaze(25, 25, "aldous-broder-maze-animation", 20);
    aldousBroderCanvas.onclick = aldousBroderOnclick;
}

aldousBroderCanvas.onclick = aldousBroderOnclick;





var wilsonsSize = document.getElementById("wilsons-size");
var wilsonDim = 25;
wilsonsSize.onclick = function() {
    if (wilsonDim == 25) {
        wilsonDim = 49;
        this.innerHTML = "Medium";
    }
    else if (wilsonDim == 49) {
        wilsonDim = 101;
        this.innerHTML = "Large";
    }
    else {
        wilsonDim = 25;
        this.innerHTML = "Small";
    }
}

var wilsonsCanvas = document.getElementById("wilsons-maze-animation");
var ctx6 = wilsonsCanvas.getContext("2d");

ctx6.font = "20px 'PT Serif'";
ctx6.textAlign = "center";
ctx6.fillRect(0, 0, wilsonsCanvas.width, wilsonsCanvas.height);
ctx6.fillStyle = "white";
ctx6.fillText("Click to animate", 240, 252);

async function wilsonsOnclick() {
    ctx6.clearRect(0, 0, wilsonsCanvas.width, wilsonsCanvas.height);
    wilsonsCanvas.onclick = null;
    await animateWilsonsMaze(wilsonDim, wilsonDim, "wilsons-maze-animation", 10);
    wilsonsCanvas.onclick = wilsonsOnclick;
}

wilsonsCanvas.onclick = wilsonsOnclick;



var recursiveDivisionCanvas = document.getElementById("recursive-division-maze-animation");
var ctx7 = recursiveDivisionCanvas.getContext("2d");

ctx7.font = "20px 'PT Serif'";
ctx7.textAlign = "center";
ctx7.fillRect(0, 0, recursiveDivisionCanvas.width, recursiveDivisionCanvas.height);
ctx7.fillStyle = "white";
ctx7.fillText("Click to animate", 240, 252);

async function recursiveDivisionOnclick() {
    ctx7.clearRect(0, 0, recursiveDivisionCanvas.width, recursiveDivisionCanvas.height);
    recursiveDivisionCanvas.onclick = null;
    await animateRecursiveDivisionMaze(101, 101, "recursive-division-maze-animation", 35);
    recursiveDivisionCanvas.onclick = recursiveDivisionOnclick;
}
recursiveDivisionCanvas.onclick = recursiveDivisionOnclick;



var huntAndKillCanvas = document.getElementById("hunt-and-kill-maze-animation");
var ctx8 = huntAndKillCanvas.getContext("2d");

ctx8.font = "20px 'PT Serif'";
ctx8.textAlign = "center";
ctx8.fillRect(0, 0, huntAndKillCanvas.width, huntAndKillCanvas.height);
ctx8.fillStyle = "white";
ctx8.fillText("Click to animate", 240, 252);

async function huntAndKillOnclick() {
    ctx8.clearRect(0, 0, huntAndKillCanvas.width, huntAndKillCanvas.height);
    huntAndKillCanvas.onclick = null;
    await animateHuntAndKillMaze(101, 101, "hunt-and-kill-maze-animation", 10);
    huntAndKillCanvas.onclick = huntAndKillOnclick;
}
huntAndKillCanvas.onclick = huntAndKillOnclick;



var sidewinderCanvas = document.getElementById("sidewinder-maze-animation");
var ctx9 = sidewinderCanvas.getContext("2d");

ctx9.font = "20px 'PT Serif'";
ctx9.textAlign = "center";
ctx9.fillRect(0, 0, sidewinderCanvas.width, sidewinderCanvas.height);
ctx9.fillStyle = "white";
ctx9.fillText("Click to animate", 240, 252);

async function sidewinderOnclick() {
    ctx9.clearRect(0, 0, sidewinderCanvas.width, sidewinderCanvas.height);
    sidewinderCanvas.onclick = null;
    await animateSidewinderMaze(101, 101, "sidewinder-maze-animation", 5);
    sidewinderCanvas.onclick = sidewinderOnclick;
}
sidewinderCanvas.onclick = sidewinderOnclick;



var binaryTreeCanvas = document.getElementById("binary-tree-maze-animation");
var ctx0 = binaryTreeCanvas.getContext("2d");

ctx0.font = "20px 'PT Serif'";
ctx0.textAlign = "center";
ctx0.fillRect(0, 0, binaryTreeCanvas.width, binaryTreeCanvas.height);
ctx0.fillStyle = "white";
ctx0.fillText("Click to animate", 240, 252);

async function binaryTreeOnclick() {
    ctx0.clearRect(0, 0, binaryTreeCanvas.width, binaryTreeCanvas.height);
    binaryTreeCanvas.onclick = null;
    await animateBinaryTreeMaze(101, 101, "binary-tree-maze-animation", 10);
    binaryTreeCanvas.onclick = binaryTreeOnclick;
}
binaryTreeCanvas.onclick = binaryTreeOnclick;