function kruskalsMaze(width, height) {
    
    // Make dimensions odd
    width -= width % 2; width++;
    height -= height % 2; height++;
    
    // Initialize maze: each square is its own set
    var maze = [];
    var sets = [];
    var edges = [];
    
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            var add = !(i % 2 == 1 && j % 2 == 1);
            maze[i].push(add + 0);
            if (!add)
                sets.push([[i, j]]);
            
            if (i != height - 2 && !add)
                edges.push([i + 1, j]);
            
            if (j != width - 2 && !add)
                edges.push([i, j + 1]);
        }
    }
    
    maze[0][1] = 0;
    
    while (edges.length) {
        
        var index = Math.floor(Math.random() * edges.length);
        var removed = edges.splice(index, 1)[0];
        
        var iorj = removed[0] % 2;
        
        var cell1, cell2;
        
        if (iorj) {
            cell1 = [removed[0], removed[1] - 1];
            cell2 = [removed[0], removed[1] + 1];
        }
        else {
            cell1 = [removed[0] - 1, removed[1]];
            cell2 = [removed[0] + 1, removed[1]];
        }
    
        var i1 = indexOfSet(sets, cell1);
        var i2 = indexOfSet(sets, cell2);
        
        if (i1 != i2) {
            var add = sets.splice(i2, 1)[0];
            if (i2 < i1)
                i1--;
            sets[i1] = sets[i1].concat(add);
            maze[removed[0]][removed[1]] = 0;
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



async function animateKruskalsMaze(width, height, canvasId, speed) {
    
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
    var sets = [];
    var edges = [];
    for (var i = 0; i < height; i++) {
        maze.push([]);
        for (var j = 0; j < width; j++) {
            var add = !(i % 2 == 1 && j % 2 == 1);
            maze[i].push(add + 0);
            
            if (!add) {
                sets.push([[i, j]]);
                ctx.clearRect(j * rectWidth,
                              i * rectHeight,
                              rectWidth,
                              rectHeight);
            }
            
            if (i != height - 2 && !add)
                edges.push([i + 1, j]);
            
            if (j != width - 2 && !add)
                edges.push([i, j + 1]);
        }
    }
    
    maze[0][1] = 0;
    ctx.clearRect(rectWidth, 0, rectWidth, rectHeight);
    
    while (edges.length) {
        
        var index = Math.floor(Math.random() * edges.length);
        var removed = edges.splice(index, 1)[0];
        
        var iorj = removed[0] % 2;
        
        var cell1, cell2;
        
        if (iorj) {
            cell1 = [removed[0], removed[1] - 1];
            cell2 = [removed[0], removed[1] + 1];
        }
        else {
            cell1 = [removed[0] - 1, removed[1]];
            cell2 = [removed[0] + 1, removed[1]];
        }
    
        var i1 = indexOfSet(sets, cell1);
        var i2 = indexOfSet(sets, cell2);
        
        if (i1 != i2) {
            var add = sets.splice(i2, 1)[0];
            if (i2 < i1)
                i1--;
            sets[i1] = sets[i1].concat(add);
            
            maze[removed[0]][removed[1]] = 0;
            await new Promise(function(resolve, reject) {
                setTimeout(function() {
                    ctx.clearRect(removed[1] * rectWidth,
                                  removed[0] * rectHeight,
                                  rectWidth,
                                  rectHeight);
                    resolve();
                }, speed);
            });
        }
        
    }
    
    maze[height - 1][width - 2] = 0;
    
    ctx.clearRect((width - 2) * rectWidth,
                  (height - 1) * rectHeight,
                  rectWidth,
                  rectHeight);
    
    return maze;
    
}