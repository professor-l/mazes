function wilsonsMaze(width, height) {
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            maze[i].push(1);
        }
    }
    
    var s = randCoord(width, height);
    maze[s[0]][s[1]] = 0;
    
    while (!complete(maze)) {
        var c;
        do {
            c = randCoord(width, height);
        } while (maze[c[0]][c[1]] != 1); 
        
        maze[c[0]][c[1]] = 2;
        
        var path = [c];
        while (maze[path[path.length - 1][0]][path[path.length - 1][1]] != 0) {
            
            
            var last = path[path.length - 1];
            var n = neighborsAB(maze, last[0], last[1]);
            var nb = n[Math.floor(Math.random() * n.length)];
            
            path.push(nb);
            
            maze[(nb[0] + last[0]) / 2][(nb[1] + last[1]) / 2] = 2;
            if (maze[nb[0]][nb[1]] == 0) {
                
                for (var i = 0; i < height; i++) {
                    for (var j = 0; j < width; j++) {
                        if (maze[i][j] == 2)
                            maze[i][j] = 0;
                    }
                }
            }
            
            else {
                
                maze[nb[0]][nb[1]] = 2;
                var loc = indexOfCoord(path, nb);
                if (loc != path.length - 1) {
                    
                    var removed = path.splice(loc + 1, path.length - loc - 1);
                    maze[(nb[0] + last[0]) / 2][(nb[1] + last[1]) / 2] = 1;
                    last = path[path.length - 1];
                    
                    for (var k = removed.length - 1; k >= 0; k--) {
                        var on = removed[k];
                        var next = k ? removed[k - 1] : last;
                        
                        if (k != removed.length - 1)
                            maze[on[0]][on[1]] = 1;
                        
                        maze[(on[0] + next[0]) / 2][(on[1] + next[1]) / 2] = 1;
                    }
                    
                }
                
            }
            
        }
        
    }
    
    maze[0][1] = 0;
    maze[height - 1][width - 2] = 0;
    
    return maze;
    
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

function indexOfCoord(s, c) {
    for (var i = 0; i < s.length; i++) {
        if (s[i][0] == c[0] && s[i][1] == c[1])
            return i;
    }
    return -1;
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

function randCoord(width, height) {
    var c = [];
    c[0] = (Math.floor(Math.random() * Math.floor(height / 2)) * 2) + 1;
    c[1] = (Math.floor(Math.random() * Math.floor(width / 2)) * 2) + 1;
    return c;
}

async function animateWilsonsMaze(width, height, canvasId, speed) {
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    var rectWidth = Math.floor(canvas.width / width);
    var rectHeight = Math.floor(canvas.height / height);
    
    var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            maze[i].push(1);
        }
    }
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, rectWidth * width, rectHeight * height);
    ctx.fillStyle = "#EC407A";
    
    var s = randCoord(width, height);
    maze[s[0]][s[1]] = 0;
    ctx.clearRect(s[1] * rectWidth, s[0] * rectHeight, rectWidth, rectHeight);
    
    while (!complete(maze)) {
        var c;
        do {
            c = randCoord(width, height);
        } while (maze[c[0]][c[1]] != 1); 
        
        maze[c[0]][c[1]] = 2;
        
        var path = [c];
        while (maze[path[path.length - 1][0]][path[path.length - 1][1]] != 0) {
            
            
            var last = path[path.length - 1];
            var n = neighborsAB(maze, last[0], last[1]);
            var nb = n[Math.floor(Math.random() * n.length)];
            
            path.push(nb);
            
            var c1 = (nb[0] + last[0]) / 2;
            var c2 = (nb[1] + last[1]) / 2;
            maze[c1][c2] = 2;
            
            await new Promise(function(resolve, reject) {
                setTimeout(function() {
                    
                    ctx.fillRect(c2 * rectWidth, c1 * rectHeight,
                                 rectWidth, rectHeight);
                    
                    resolve();
                }, speed);
            });
            
            if (maze[nb[0]][nb[1]] == 0) {
                
                for (var i = 0; i < height; i++) {
                    for (var j = 0; j < width; j++) {
                        if (maze[i][j] == 2) {
                            maze[i][j] = 0;
                            ctx.clearRect(j * rectWidth, i * rectHeight, 
                                          rectWidth, rectHeight);
                        }
                    }
                }
            }
            
            else {
                
                maze[nb[0]][nb[1]] = 2;
                await new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        
                        ctx.fillRect(nb[1] * rectWidth, nb[0] * rectHeight,
                                     rectWidth, rectHeight);
                        
                        resolve();
                    }, speed);
                });
                
                var loc = indexOfCoord(path, nb);
                if (loc != path.length - 1) {
                    
                    var removed = path.splice(loc + 1, path.length - loc - 1);
                    maze[(nb[0] + last[0]) / 2][(nb[1] + last[1]) / 2] = 1;
                    last = path[path.length - 1];
                    
                    for (var k = removed.length - 1; k >= 0; k--) {
                        var on = removed[k];
                        var next = k ? removed[k - 1] : last;
                        
                        if (k != removed.length - 1) {
                            maze[on[0]][on[1]] = 1;
                            
                            ctx.fillStyle = "black";
                            ctx.fillRect(on[1] * rectWidth, on[0] * rectHeight,
                                         rectWidth, rectHeight);
                            
                        }
                        
                        c1 = (on[0] + next[0]) / 2;
                        c2 = (on[1] + next[1]) / 2;
                        maze[c1][c2] = 1;
                        
                        ctx.fillStyle = "black";
                        ctx.fillRect(c2 * rectWidth, c1 * rectHeight,
                                     rectWidth, rectHeight);
                        ctx.fillStyle = "#EC407A";
                    }
                    
                }
                
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