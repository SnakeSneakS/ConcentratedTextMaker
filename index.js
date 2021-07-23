
can=document.getElementsByTagName("canvas")[0];



function drawConcentratedLine(can){
    ctx=can.getContext("2d");
    let l=can.width;

    for(let i=0;i<100;i++){
        let a=2*Math.PI*i/100;
        ctx.lineWidth=(1+Math.random()*4);
        ctx.beginPath();
        ctx.moveTo(can.width/2, can.height/2)
        ctx.lineTo(can.width/2 + l*Math.cos(a), can.height/2+l*Math.sin(a));
        ctx.closePath();
        ctx.stroke();
    }
}

function drawTextArea(can){
    ctx=can.getContext("2d");
    let l=can.width/4;

    let a=0;
    let preA=0;
    ctx.lineWidth=(1+Math.random()*4);
    ctx.fillStyle="white";
    ctx.beginPath();
    ctx.moveTo(can.width/2+l, can.height/2)
    while(true){
        preA=a;
        a+=(20+Math.random()*20)*2*Math.PI/360;

        if(a>=2*Math.PI){
            a=2*Math.PI;
            ctx.quadraticCurveTo(can.width/2+0.8*l*(Math.cos(a)+Math.cos(preA)), can.height/2+0.8*l*(Math.sin(a)+Math.sin(preA))/2, can.width/2 + l*Math.cos(a), can.height/2+l*Math.sin(a)/2);
            break;
        }         
        ctx.quadraticCurveTo(can.width/2+0.8*l*(Math.cos(a)+Math.cos(preA)), can.height/2+0.8*l*(Math.sin(a)+Math.sin(preA))/2, can.width/2 + l*Math.cos(a), can.height/2+l*Math.sin(a)/2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

drawConcentratedLine(can);
drawTextArea(can);