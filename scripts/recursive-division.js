function recursiveDivisionMaze(width, height) {
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    var maze = [];
    
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            maze[i].push((i == 0 ||
                          j == 0 ||
                          i == height - 1 ||
                          j == width - 1) + 0);
        }
    }
    
    divide(maze, [1, height - 2], [1, width - 2], horv(1, 1));
    
    maze[0][1] = 0;
    maze[height - 1][width - 2] = 0;
    
    return maze;
    
}

function divide(maze, iCoords, jCoords, hv) {
    var iDim = iCoords[1] - iCoords[0];
    var jDim = jCoords[1] - jCoords[0];
    
    if (iDim <= 0 || jDim <= 0)
        return;
        
    if (hv == "h") {
        
        var split;
        do {
            split = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
        } while (split % 2);
        
        var hole;
        do {
            hole = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
        } while (!(hole % 2));
        
        for (var j = jCoords[0]; j <= jCoords[1]; j++) {
            if (j != hole)
                maze[split][j] = 1;
        }
        
        divide(maze, 
               [iCoords[0], split - 1],
               jCoords, 
               horv(split - iCoords[0] - 1, jDim));
               
        divide(maze, 
               [split + 1, iCoords[1]], 
               jCoords, 
               horv(iCoords[1] - split - 1, jDim));
        
    }
    
    else {
        
        var split;
        do {
            split = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
        } while (split % 2);
        
        var hole;
        do {
            hole = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
        } while (!(hole % 2));
        
        for (var i = iCoords[0]; i <= iCoords[1]; i++) {
            if (i != hole) {
                maze[i][split] = 1;
            }
        }
        
        divide(maze, 
               iCoords, 
               [jCoords[0], split - 1],
               horv(iDim, split - jCoords[0] - 1));
        divide(maze, 
               iCoords, 
               [split + 1, jCoords[1]],
               horv(jCoords[0] - split - 1));
        
    }
    
}

function horv(iDim, jDim) {
    
    if (iDim < jDim)
        return "v";
    else if (jDim < iDim)
        return "h";
    else
        return Math.floor(Math.random() * 2) ? "h" : "v";
}



async function animateRecursiveDivisionMaze(width, height, canvasId, speed) {
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    var rectWidth = Math.floor(canvas.width / width);
    var rectHeight = Math.floor(canvas.height / height);
    
    var maze = [];
    
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            var add = (i == 0 ||
                       j == 0 ||
                       i == height - 1 ||
                       j == width - 1) + 0;
            maze[i].push(add);
            if (add) {
                ctx.fillRect(rectWidth * j, 
                             rectHeight * i, 
                             rectWidth, 
                             rectHeight);
            }
        }
    }
    
    await divideA(maze, 
                  [1, height - 2],
                  [1, width - 2],
                  horv(1, 1),
                  rectWidth,
                  rectHeight,
                  ctx,
                  speed);
                  
    maze[0][1] = 0;
    maze[height - 1][width - 2] = 0;
    
    ctx.clearRect(rectWidth, 0, rectWidth, rectHeight);
    ctx.clearRect((width - 2) * rectWidth,
                  (height - 1) * rectHeight,
                  rectWidth,
                  rectHeight);
    
    return;
    
}

async function divideA(maze, iCoords, jCoords, hv, rectWidth, rectHeight, ctx, speed) {
    
    var iDim = iCoords[1] - iCoords[0];
    var jDim = jCoords[1] - jCoords[0];
    
    if (iDim <= 0 || jDim <= 0)
        return;
        
    if (hv == "h") {
        
        var split;
        do {
            split = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
        } while (split % 2);
        
        var hole;
        do {
            hole = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
        } while (!(hole % 2));
        
        await new Promise(function(resolve, reject) {
            setTimeout(function() {
            
                for (var j = jCoords[0]; j <= jCoords[1]; j++) {
                    if (j != hole) {
                        maze[split][j] = 1;
                        ctx.fillRect(j * rectWidth,
                                     split * rectHeight,
                                     rectWidth,
                                     rectHeight);
                    }
                }
                
                resolve();
            }, speed);
        });
        
        await divideA(maze, 
               [iCoords[0], split - 1],
               jCoords, 
               horv(split - iCoords[0] - 1, jDim),
               rectWidth,
               rectHeight,
               ctx,
               speed);
               
        await divideA(maze, 
               [split + 1, iCoords[1]], 
               jCoords, 
               horv(iCoords[1] - split - 1, jDim),
               rectWidth,
               rectHeight,
               ctx,
               speed);
        
    }
    
    else {
        
        var split;
        do {
            split = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
        } while (split % 2);
        
        var hole;
        do {
            hole = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
        } while (!(hole % 2));
        
        await new Promise(function(resolve, reject) {
            setTimeout(function() {
            
                for (var i = iCoords[0]; i <= iCoords[1]; i++) {
                    if (i != hole) {
                        maze[i][split] = 1;
                        
                        ctx.fillRect(split * rectWidth,
                                     i * rectHeight,
                                     rectWidth,
                                     rectHeight);
                    }
                }
                
                resolve();
            }, speed);
        });
        
        await divideA(maze, 
               iCoords, 
               [jCoords[0], split - 1],
               horv(iDim, split - jCoords[0] - 1),
               rectWidth,
               rectHeight,
               ctx,
               speed);
               
        await divideA(maze, 
               iCoords, 
               [split + 1, jCoords[1]],
               horv(jCoords[0] - split - 1),
               rectWidth,
               rectHeight,
               ctx,
               speed);
        
    }
    
}