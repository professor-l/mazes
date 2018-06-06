function binaryTreeMaze(width, height) {
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    // Initialize maze
    var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            maze[i].push(!(i % 2 == 1 && j % 2 == 1));
        }
    }
    
    for (var k = 1; k < width; k += 2) {
        for (var m = 1; m < height; m += 2) {
            var south = Math.floor(Math.random() * 2);
            
            if (m == height - 2)
                south = 0;
            if (k == width - 2)
                south = 1;
            if (k == width - 2 && m == height - 2)
                break;
            
            if (south)
                maze[m + 1][k] = 0;
            else
                maze[m][k + 1] = 0;
        }
    }
    
    maze[0][1] = 0;
    maze[height - 1][width - 2] = 0;
    
    return maze;
    
}

async function animateBinaryTreeMaze(width, height, canvasId, speed) {
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    var rectWidth = Math.floor(canvas.width / width);
    var rectHeight = Math.floor(canvas.height / height);
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, rectWidth * width, rectHeight * height);
    
     var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            var p = !(i % 2 == 1 && j % 2 == 1);
            maze[i].push(p);
            
            if (!p) {
                ctx.clearRect(rectWidth * j, 
                              rectHeight * i, 
                              rectWidth, 
                              rectHeight);
            }
        }
    }
    
    for (var k = 1; k < width; k += 2) {
        for (var m = 1; m < height; m += 2) {
            var south = Math.floor(Math.random() * 2);
            
            if (m == height - 2)
                south = 0;
            if (k == width - 2)
                south = 1;
            if (k == width - 2 && m == height - 2)
                break;
            
            if (south) {
                maze[m + 1][k] = 0;
                
                await new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        
                        ctx.clearRect(k * rectWidth,
                                      (m + 1) * rectHeight,
                                      rectWidth,
                                      rectHeight);
                        
                        resolve();
                        
                    }, speed);
                });
                
            }
            
            else {
                maze[m][k + 1] = 0;
                
                await new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        
                        ctx.clearRect((k + 1) * rectWidth,
                                      m * rectHeight,
                                      rectWidth,
                                      rectHeight);
                        
                        resolve();
                        
                    }, speed);
                });
        
            }
        }
    }
    
    maze[0][1] = 0;
    maze[height - 1][width - 2] = 0;
    
    ctx.clearRect(rectWidth, 0, rectWidth, rectHeight);
    ctx.clearRect((width - 2) * rectWidth,
                  (height - 1) * rectHeight,
                  rectWidth,
                  rectHeight);
    
    
    return maze;
    
}