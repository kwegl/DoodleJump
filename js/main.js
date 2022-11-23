canvas.width = width;
canvas.height = height;
ctx.font = "30px Arial";
function update(){
    ctx.fillStyle = "#f0f0f0";
    ctx.fillRect(0,0, width, height);// background
    if(player.screen==0){
        ctx.shadowColor = "#000000";
        ctx.shadowBlur = 10;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = 10;
        ctx.strokeStyle = "#661111";
        ctx.moveTo(width/2-50, height/2-50);
        ctx.lineTo(width/2+50, height/2-50);
        ctx.lineTo(width/2+50, height/2+50);
        ctx.lineTo(width/2-50, height/2+50);
        ctx.lineTo(width/2-50, height/2-50);
        ctx.stroke();
        ctx.fillStyle = "#ff6644";
        ctx.fillRect(width/2-50, height/2-50, 100,100);
        ctx.shadowBlur = 0;
        //ctx.strokeStyle = "#ffffff";
        ctx.moveTo(width/2-25, height/2-30);
        ctx.lineTo(width/2-25, height/2+30);
        ctx.lineTo(width/2+25, height/2);
        ctx.lineTo(width/2-25, height/2-30);
        ctx.stroke();
        ctx.font="30px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("RECORD: "+Math.floor(player.maxScore/100), 10,30);
    }
    if(player.screen==1){// game
        if(keys[39]){
            player.x+=player.velX;
        }
        if(keys[37]){
            player.x-=player.velX;
        }
        if(player.x<0){
            player.x=width;
        }
        else if(player.x>width){
            player.x=0;
        }
        if(player.dist+height-player.y<player.maxDist){// death
            player.screen = 0;
            if(player.maxScore<player.maxDist){
                player.maxScore = player.maxDist;
            }
        }
        if(player.velY>=0){
            for(var i=0;i<platforms.length-1;i++){ // collision
                if(player.y+player.height<platforms[i][1]+10 && player.y+player.height>platforms[i][1]){
                    if(player.x<platforms[i][0]+50 && player.x+player.width>platforms[i][0]){
                        if(platforms[i][2]==0){
                            player.velY=-player.jumpPower;
                        }
                        else if(platforms[i][2]==1){
                            player.velY=-player.jumpPower;
                            platforms[i][2]=-1;
                        }
                    }
                }
            }
        }
        player.velY+=player.a;
        player.dist-=player.velY;
        if(player.dist>player.maxDist){// score
            player.maxDist=player.dist;
        }
        for(var i=0;i<platforms.length-1;i++){
            platforms[i][1]-=player.velY;
            if(platforms[i][2]==1){
                ctx.fillStyle = "#bbbb33";
            }
            else{
                ctx.fillStyle = "#229977";
            }
            if(platforms[i][2]!=-1){
                ctx.fillRect(platforms[i][0],platforms[i][1], 50,10);// platforms
            }
            
            temp = []
            if(platforms[i][1] > height){
                if(Math.random()<0.2){
                    platforms[i] = [Math.floor(Math.random()*(width-70)), 0, 1];
                }
                else{
                    platforms[i] = [Math.floor(Math.random()*(width-70)), 0, 0];
                }
            }
        }

        ctx.fillStyle = "#0939dd";
        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height)
        //ctx.fillRect(player.x, player.y, player.width, player.height);// player
        ctx.font="20px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("SCORE: "+Math.floor(player.maxDist/100), 10,30);// text
    }
    requestAnimationFrame(update);
}

window.addEventListener("load", function () {
    update();
});
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});
document.body.addEventListener("mousedown", function  (e) { 
    if(player.screen==0){
        if(e.offsetX>width/2-50 && e.offsetX<width/2+50){
            if(e.offsetY>height/2-50 && e.offsetY<height/2+50){
                player.screen=1;
                player.velY=0;
                player.dist=0;
                player.maxDist=0;
                platforms = [[player.x, height-1, 0],[Math.floor(Math.random()*(width-70)),height/8, 0],[Math.floor(Math.random()*(width-70)),2*height/8, 0],[Math.floor(Math.random()*(width-70)),3*height/8, 0],[Math.floor(Math.random()*(width-70)),4*height/8, 0],[Math.floor(Math.random()*(width-70)),5*height/8, 0],[Math.floor(Math.random()*(width-70)),6*height/8, 0],[Math.floor(Math.random()*(width-70)),7*height/8, 0]];
            }
        }
    }
});