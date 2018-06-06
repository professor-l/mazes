function huntAndKillMaze(width, height) {
    
    // Make them odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    // Fill maze with 1's (walls)
    var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            maze[i].push(1);
        }
    }
    
    // Opening at top - start of maze
    maze[0][1] = 0;
    maze[1][1] = 0;
    
    var on = [1, 1];
    
    while (!complete(maze)) {
        
        var n = neighbors(maze, on[0], on[1]);
        if (n.length == 0) {
            var t = findCoord(maze);
            on = t[0];
            
            maze[on[0]][on[1]] = 0;
            maze[(on[0] + t[1][0]) / 2][(on[1] + t[1][1]) / 2] = 0;
        }
        
        else {
            
            var i = Math.floor(Math.random() * n.length);
            var nb = n[i];
            maze[nb[0]][nb[1]] = 0;
            maze[(nb[0] + on[0]) / 2][(nb[1] + on[1]) / 2] = 0;
            
            on = nb.slice();
            
        }
        
    }
    
    maze[height - 2][width - 1] = 0;
    
    return maze;
    
}

function neighbors(maze, ic, jc) {
    var final = [];
    for (var i = 0; i < 4; i++) {
        var n = [ic, jc];
        
        // Iterates through four neighbors
        // [i][j - 2] 
        // [i][j + 2]
        // [i - 2][j]
        // [i + 2][j]
        n[i % 2] += ((Math.floor(i / 2) * 2) || -2);
        if (n[0] < maze.length && 
            n[1] < maze[0].length && 
            n[0] > 0 && 
            n[1] > 0) {
            
            if (maze[n[0]][n[1]] == 1) {
                final.push(n);
            }
        }
    }
    return final;
}

function neighborsAB(maze, ic, jc) {
    var final = [];
    for (var i = 0; i < 4; i++) {
        var n = [ic, jc];
        
        // Iterates through four neighbors
        // [i][j - 2] 
        // [i][j + 2]
        // [i - 2][j]
        // [i + 2][j]
        n[i % 2] += ((Math.floor(i / 2) * 2) || -2);
        if (n[0] < maze.length && 
            n[1] < maze[0].length && 
            n[0] > 0 && 
            n[1] > 0) {
            
            final.push(n);
        }
    }
    return final;
}

function complete(maze) {
    for (var i = 1; i < maze.length; i += 2) {
        for (var j = 1; j < maze[0].length; j += 2) {
            if (maze[i][j] != 0)
                return false;
        }
    }
    return true;
}

function findCoord(maze) {
    for (var i = 1; i < maze.length; i += 2) {
        for (var j = 1; j < maze[0].length; j += 2) {
            
            if (maze[i][j] == 1) {
                var n = neighborsAB(maze, i, j);
                
                for (var k = 0; k < n.length; k++) {
                    if (maze[n[k][0]][n[k][1]] == 0)
                        return [[i, j], n[k]];
                }
            }
            
        }
    }
}



async function animateHuntAndKillMaze(width, height, canvasId, speed) {
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    
    width += !(width % 2);
    height += !(height % 2);
    
    var rectWidth = Math.floor(canvas.width / width);
    var rectHeight = Math.floor(canvas.height / height);
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width * rectWidth, height * rectHeight);
    
    var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            maze[i].push(1);
        }
    }
    
    maze[0][1] = 0;
    maze[1][1] = 0;
    
    ctx.clearRect(rectWidth, 0, rectWidth, rectHeight);
    ctx.clearRect(rectWidth, rectHeight, rectWidth, rectHeight);
    
    var on = [1, 1];
    
    while (!complete(maze)) {
        
        var n = neighbors(maze, on[0], on[1]);
        if (n.length == 0) {
            var t = findCoord(maze);
            on = t[0];
            
            var c1 = (on[0] + t[1][0]) / 2;
            var c2 = (on[1] + t[1][1]) / 2;
            maze[on[0]][on[1]] = 0;
            maze[c1][c2] = 0;
            
            await new Promise(function(resolve, reject) {
                setTimeout(function() {
                    
                    ctx.clearRect(rectWidth * on[1],
                                  rectHeight * on[0],
                                  rectWidth,
                                  rectHeight);
                    
                    ctx.clearRect(rectWidth * c2,
                                  rectHeight * c1,
                                  rectWidth,
                                  rectHeight);
                    
                    resolve();
                }, speed);
            });
        }
        
        else {
            
            var ind = Math.floor(Math.random() * n.length);
            var nb = n[ind];
            
            var c1 = (nb[0] + on[0]) / 2;
            var c2 = (nb[1] + on[1]) / 2;
            maze[nb[0]][nb[1]] = 0;
            maze[c1][c2] = 0;
            
            await new Promise(function(resolve, reject) {
                setTimeout(function() {
                    
                    ctx.clearRect(rectWidth * nb[1],
                                  rectHeight * nb[0],
                                  rectWidth,
                                  rectHeight);
                    
                    ctx.clearRect(rectWidth * c2,
                                  rectHeight * c1,
                                  rectWidth,
                                  rectHeight);
                    
                    resolve();
                }, speed);
            });
            
            on = nb;
            
        }
        
    }
    
    maze[height - 2][width - 1] = 0;
    ctx.clearRect((width - 2) * rectWidth,
                  (height - 1) * rectHeight,
                  rectWidth,
                  rectHeight);
    
    return maze;
    
}