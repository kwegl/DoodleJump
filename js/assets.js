var canvas = document.querySelector("#canvas"),
ctx = canvas.getContext("2d"),
width = 500,
height = 890,
player = {
    x:width/2-20,
    y:height/2+50,
    height:40,
    width:40,
    velX:5,
    velY:0,
    a:0.1,
    dist:0,
    maxDist:0,
    maxScore:0,
    jumpPower:7,
    screen:0
};
keys = [];
platforms = [[player.x, height-1, 0],[Math.floor(Math.random()*(width-70)),height/8, 0],[Math.floor(Math.random()*(width-70)),2*height/8, 0],[Math.floor(Math.random()*(width-70)),3*height/8, 0],[Math.floor(Math.random()*(width-70)),4*height/8, 0],[Math.floor(Math.random()*(width-70)),5*height/8, 0],[Math.floor(Math.random()*(width-70)),6*height/8, 0],[Math.floor(Math.random()*(width-70)),7*height/8, 0]];//8