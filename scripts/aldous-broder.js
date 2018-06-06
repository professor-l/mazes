function aldousBroderMaze(width, height) {
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    // Initialize maze: each square is its own set
    var maze = [];
    var unvisited = 0;
    
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            
            var add = (i % 2 == 1 && j % 2 == 1);
            if (add)
                unvisited++;
            
            maze[i].push(1);
        }
    }
    var on = [];
    
    do {
        on[0] = Math.floor(Math.random() * height);
        on[1] = Math.floor(Math.random() * width);
    } while (on[0] % 2 == 0 || on[1] % 2 == 0);
    
    maze[on[0]][on[1]] = 0;
    unvisited--;
    
    while (unvisited > 0) {
        var n = neighborsAB(maze, on[0], on[1]);
        if (!n.length) { 
            console.log(maze);
            console.log(on);
            break;
        }
        
        var to = n[Math.floor(Math.random() * n.length)];
        
        if (maze[to[0]][to[1]] == 1) {
            maze[to[0]][to[1]] = 0;
            maze[(to[0] + on[0]) / 2][(to[1] + on[1]) / 2] = 0;
            unvisited--;
        }
        on = to;
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



async function animateAldousBroderMaze(width, height, canvasId, speed) {
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    var rectWidth = Math.floor(canvas.width / width);
    var rectHeight = Math.floor(canvas.height / height);
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width * rectWidth, height * rectHeight);
    ctx.fillStyle = "#EC407A";

    // Initialize maze: each square is its own set
    var maze = [];
    var unvisited = 0;
    
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            
            var add = (i % 2 == 1 && j % 2 == 1);
            if (add)
                unvisited++;
            
            maze[i].push(1);
        }
    }
    var on = [];
    
    do {
        on[0] = Math.floor(Math.random() * height);
        on[1] = Math.floor(Math.random() * width);
    } while (on[0] % 2 == 0 || on[1] % 2 == 0);
    
    maze[on[0]][on[1]] = 0;
    unvisited--;
    
    while (unvisited > 0) {
        var n = neighborsAB(maze, on[0], on[1]);
        
        var to = n[Math.floor(Math.random() * n.length)];
        
        if (maze[to[0]][to[1]] == 1) {
            
            var wall = [];
            wall.push((to[0] + on[0]) / 2);
            wall.push((to[1] + on[1]) / 2);
            
            maze[to[0]][to[1]] = 0;
            maze[wall[0]][wall[1]] = 0;
            
            unvisited--;
            
            await new Promise(function(resolve, reject) {
                setTimeout(function() {
                    
                    ctx.clearRect(to[1] * rectWidth,
                                  to[0] * rectHeight,
                                  rectWidth,
                                  rectHeight);
                    
                    ctx.clearRect(wall[1] * rectWidth,
                                  wall[0] * rectHeight,
                                  rectWidth,
                                  rectHeight);
                    
                    resolve();
                }, speed);
            });
        }
        
        await new Promise(function(resolve, reject) {
            setTimeout(function() {
                
                ctx.clearRect(on[1] * rectWidth,
                              on[0] * rectHeight,
                              rectWidth,
                              rectHeight);
                    
                if (unvisited != 0) {
                    ctx.fillRect(to[1] * rectWidth,
                                 to[0] * rectHeight,
                                 rectWidth,
                                 rectHeight);
                }
                resolve();
            }, speed);
        });
        
        on = to;
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