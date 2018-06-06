function ellersMaze(width, height) {
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    // Initialize maze: each square is its own set
    var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            maze[i].push(!(i % 2 == 1 && j % 2 == 1) + 0);
        }
    }
    
    maze[0][1] = 0;
    
    var sets = [];
    for (var i = 1; i < width; i += 2) {
        sets.push([[1, i]]);
    }
    
    
    
    for (var i = 1; i < height; i += 2) {
        
        // Clear sets
        for (var m = 0; m < sets.length; m++) {
            for (var n = 0; n < sets[m].length; n++) {
                if (sets[m][n][0] < i)
                    sets[m].splice(n, 1);
            }
        }
        
        for (var j = 3; j < width; j += 2) {
            var set1 = indexOfSet(sets, [i, j - 2]);
            var set2 = indexOfSet(sets, [i, j]);
            if (set1 != set2) {
            
                var join = (i != height - 2) ?
                    Math.floor(Math.random() * 2) : 
                    1;
                
                if (join) {
                    var removed = sets.splice(set2, 1)[0];
                    if (set2 < set1) {
                        set1--;
                    }
                    
                    sets[set1] = sets[set1].concat(removed);
                    maze[i][j - 1] = 0;
                }
            }
        }
        
        if (i == height - 2)
            break;
        
        var initialSetLength = sets.length;
        for (var j = 0; j < initialSetLength; j++) {
            var continued = false;
            
            var initialLength = sets[j].length;
            for (var k = 0; k < initialLength; k++) {
                
                var newCoord = sets[j][k].slice();
                newCoord[0] += 2;
                
                if (newCoord[0] != i + 2)
                    continue;
                
                var add = Math.floor(Math.random() * 2);
                if (add) {
                    continued = true;
                    sets[j].push(newCoord);
                    maze[newCoord[0] - 1][newCoord[1]] = 0;
                    
                }
                else
                    sets.push([newCoord]);
            }
            
            if (!continued) {
                var ind;
                do {
                    ind = Math.floor(Math.random() * sets[j].length);
                } while (sets[j][ind][0] != i);
                var newC = sets[j][ind].slice();
                newC[0] += 2;
                
                sets.splice(indexOfSet(sets, newC), 1);
                
                sets[j].push(newC);
                maze[newC[0] - 1][newC[1]] = 0;
            }
        }
        
    }
    
    maze[height - 1][width - 2] = 0;
    
    return maze;
    
}

function indexOfSet(sets, c) {
    for (var i = 0; i < sets.length; i++) {
        if (contains(sets[i], c))
            return i;
    }
    return -1;
}

function contains(s, c) {
    for (var i = 0; i < s.length; i++) {
        if (s[i][0] == c[0] && s[i][1] == c[1])
            return true;
    }
    return false;
}

async function animateEllersMaze(width, height, canvasId, speed) {
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    var rectWidth = Math.floor(canvas.width / width);
    var rectHeight = Math.floor(canvas.height / height);
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, rectWidth * width, rectHeight * height);
    
    // Initialize maze: each square is its own set
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
    
    maze[0][1] = 0;
    ctx.clearRect(rectWidth, 0, rectWidth, rectHeight);
    
    var sets = [];
    for (var i = 1; i < width; i += 2) {
        sets.push([[1, i]]);
    }
    
    for (var i = 1; i < height; i += 2) {
        
        // Clear sets
        for (var m = 0; m < sets.length; m++) {
            for (var n = 0; n < sets[m].length; n++) {
                if (sets[m][n][0] < i)
                    sets[m].splice(n, 1);
            }
        }
        
        for (var j = 3; j < width; j += 2) {
            var set1 = indexOfSet(sets, [i, j - 2]);
            var set2 = indexOfSet(sets, [i, j]);
            if (set1 != set2) {
            
                var join = (i != height - 2) ?
                    Math.floor(Math.random() * 2) : 
                    1;
                
                if (join) {
                    var removed = sets.splice(set2, 1)[0];
                    if (set2 < set1) {
                        set1--;
                    }
                    
                    sets[set1] = sets[set1].concat(removed);
                    maze[i][j - 1] = 0;
                    
                    await new Promise(function(resolve, reject) {
                        setTimeout(function() {
                            ctx.clearRect((j - 1) * rectWidth,
                                           i * rectHeight,
                                           rectWidth,
                                           rectHeight);
                            
                            resolve();
                        }, speed);
                    });
                }
            }
        }
        
        if (i == height - 2)
            break;
        
        var initialSetLength = sets.length;
        for (var j = 0; j < initialSetLength; j++) {
            var continued = false;
            
            var initialLength = sets[j].length;
            for (var k = 0; k < initialLength; k++) {
                
                var newCoord = sets[j][k].slice();
                newCoord[0] += 2;
                
                if (newCoord[0] != i + 2)
                    continue;
                
                var add = Math.floor(Math.random() * 2);
                if (add) {
                    continued = true;
                    sets[j].push(newCoord);
                    var ii = newCoord[0] - 1;
                    var jj = newCoord[1];
                    maze[ii][jj] = 0;
                    await new Promise(function(resolve, reject) {
                        setTimeout(function() {
                            ctx.clearRect(jj * rectWidth,
                                          ii * rectHeight,
                                          rectWidth,
                                          rectHeight);
                            resolve();
                        }, speed);
                    });
                    
                }
                else
                    sets.push([newCoord]);
            }
            
            if (!continued) {
                var ind;
                do {
                    ind = Math.floor(Math.random() * sets[j].length);
                } while (sets[j][ind][0] != i);
                var newC = sets[j][ind].slice();
                newC[0] += 2;
                
                sets.splice(indexOfSet(sets, newC), 1);
                
                sets[j].push(newC);
                
                var ii = newC[0] - 1;
                var jj = newC[1];
                maze[ii][jj] = 0;
                
                await new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        ctx.clearRect(jj * rectWidth,
                                      ii * rectHeight,
                                      rectWidth,
                                      rectHeight);
                        resolve();
                    }, speed);
                });
            }
        }
        
    }
    
    maze[height - 1][width - 2] = 0;
    ctx.clearRect((width - 2) * rectWidth,
                  (height - 1) * rectHeight,
                  rectWidth,
                  rectHeight);
    
    return maze;
    
}
