var grid = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

var deepest = 0;
//create canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var iterationoreder  =[...Array(81).keys()];
clear();

function generate(){
    clear();
    iterationoreder = iterationoreder.reverse();
    grid = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
    //grid = JSON.parse(JSON.stringify(randomfill(grid)));
    drawGrid(grid);
    solve(grid,0,0,-1,0);

}
drawGrid(grid);

function clear(){
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, 500, 500);
    ctx.fillStyle = "#000000";
}


function drawGrid(grid){
  
    ctx.font = "25px Arial";
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (grid[i][j]!= 0) {
                ctx.fillText(grid[i][j], 15+i*40,29+j*40 )
            }
        }
    }
    for (var i = 0; i < 10; i++) {
        if(i%3==0){
            ctx.fillRect(i*40,0,5,600);
            ctx.fillRect(0,i*40,600,5);
        }else{
            ctx.fillRect(i*40,0,1,600);

            ctx.fillRect(0,i*40,600,1);
        }
    }
}


//validate board
function validate(grid) {

    //check rows
    for(let x=0;x<9;x++){
        for(let i=0;i<9;i++){
            for(let j=i+1;j<9;j++){
                if(grid[x][i]==grid[x][j] && grid[x][i] !=0){
                    
                    //console.log("failed on rowcheck");
                    return false;
                }
            }
        }
    }
    //check columns
    for(let x=0;x<9;x++){
        for(let i=0;i<9;i++){
            for(let j=i+1;j<9;j++){
                if(grid[i][x]==grid[j][x]&&grid[i][x] !=0){
                    //console.log("failed on col check");
                   
                    return false;
                }
            }
        }
    }

    //check boxes
    for(let x=0;x<9;x+=3){
        for(let y=0;y<9;y+=3){
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    for(let k=0;k<3;k++){
                        for(let l=0;l<3;l++){
                            if(grid[x+i][y+j]==grid[x+k][y+l] && (i!=k &&j!=l)  && grid[x+i][y+j]!=0){
                                //console.log("failed on grid check");
                                
                                return false;
                            }
                        }
                    }
                }
            }
        }
    }
    return true;

}
function getnextEmpty(grid){
    

    //random iteration
    for(let i=0;i<81;i++){
        let index = iterationoreder[i];
        let x = Math.floor(index/9);
        let y = index%9;
        if(grid[x][y]==0){
            
            return [x,y];
        }
    }

    //row iteration
    /*for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(grid[i][j]==0){
                return[i,j];
            }
        }
    }*/
    return false;
}

function randomfill(grid){
    let count = 0;
    let prevcopy =JSON.parse(JSON.stringify(grid));
    while(count<0){
        let copy =JSON.parse(JSON.stringify(prevcopy));
        let x = Math.floor(Math.random()*9);
        let y = Math.floor(Math.random()*9);
        let value = Math.floor(Math.random()*9)+1;
        if(copy[x][y]==0){
            copy[x][y]=value;
            
        }
        if(validate(copy)){
            prevcopy =JSON.parse(JSON.stringify(copy));
            count++;
        }
    }
    return prevcopy;
}

var starttime = 0;
function solve(grid, x, y,value,depth) {
    //disgusting hack but it works
    
    let copy =JSON.parse(JSON.stringify(grid));
    if(depth!=0){
        //not in root
        copy[x][y]=value;
    }else{
        starttime = new Date().getTime();
        console.log("solving...");
    }
    
    let valid = validate(copy);

    if(!valid){
        //console.log("not valid");
        return false;
    }
    //console.log("valid");
    let next = getnextEmpty(copy);
    if(next == false){
        let now = new Date().getTime();
        console.log("solved under "+(now-starttime)+"ms");
        drawGrid(copy);
        return true;
    }
    for(let i = 1;i<10;i++){
        let result = solve(copy,next[0],next[1],i,depth+1);
        if(result){
            return true;
        }
    }
    if(value==-1){
        console.log("end...");
    }
    return false;
    
   
}