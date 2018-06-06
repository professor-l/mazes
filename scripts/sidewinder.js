function sidewinderMaze(width, height) {
    
    width += !(width % 2);
    height += !(height % 2);
    
    var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            maze[i].push(!(i % 2 == 1 && j % 2 == 1) + 0);
        }
    }
    
    for (var row = 1; row < height; row += 2) {
        
        var begin = 1;
        
        for (var col = 1; col < width; col += 2) {
            
            var ctn = (row == 1) ? 1 : Math.floor(Math.random() * 2);
            if (col == width - 2) ctn = 0;
            
            if (ctn) {
                maze[row][col + 1] = 0;
            }
            
            else if (row != 1){
                var up;
                do {
                    up = Math.floor(Math.random() * (col - begin)) + begin;
                } while (!(up % 2));    
                maze[row - 1][up] = 0;
                
                begin = col + 2;
                
            }
            
        }
        
    }
    
    maze[0][1] = 0;
    maze[height - 1][width - 2] = 0;
    
    return maze;
    
}



async function animateSidewinderMaze(width, height, canvasId, speed) {
    
    var canvas = document.getElementById(canvasId);
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    
    width += !(width % 2);
    height += !(height % 2);
    
    var rectWidth = Math.floor(canvas.width / width);
    var rectHeight = Math.floor(canvas.height / height);
    
    var maze = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            var add = !(i % 2 == 1 && j % 2 == 1) + 0;
            maze[i].push(add);
            if (add) {
                ctx.fillRect(rectWidth * j,
                             rectHeight * i, 
                             rectWidth, 
                             rectHeight);
            }
        }
    }
    
    for (var row = 1; row < height; row += 2) {
        
        var begin = 1;
        
        for (var col = 1; col < width; col += 2) {
            
            var ctn = (row == 1) ? 1 : Math.floor(Math.random() * 2);
            if (col == width - 2) ctn = 0;
            
            if (ctn) {
                maze[row][col + 1] = 0;
                
                await new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        
                        ctx.clearRect((col + 1) * rectWidth,
                                      row * rectHeight,
                                      rectWidth,
                                      rectHeight);
                        
                        resolve();
                    }, speed)
                });
            }
            
            else if (row != 1) {
                var up;
                do {
                    up = Math.floor(Math.random() * (col - begin)) + begin;
                } while (!(up % 2));    
                maze[row - 1][up] = 0;
                
                await new Promise(function(resolve, reject) {
                    setTimeout(function() {
                        
                        ctx.clearRect(up * rectWidth,
                                      (row - 1) * rectHeight,
                                      rectWidth,
                                      rectHeight);
                        
                        resolve();
                    }, speed)
                });
                
                begin = col + 2;
                
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