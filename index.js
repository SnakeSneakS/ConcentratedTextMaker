canCon=document.getElementById("canCon"); //背景
canText=document.getElementById("canText"); //文字
img=document.getElementById("displayImg");
inText=document.getElementById("inputDisplayText"); //文字入力
inUpdate=document.getElementById("inputUpdateButton"); //再描画ボタン
fukidashiPosOption=document.getElementById("fukidashiPosOption");
fukidashiSharpness=document.getElementById("fukidashiSharpness");

//clear canvas
function ClearCan(can){
    ctx=can.getContext("2d");
    ctx.fillStyle="white";
    ctx.fillRect(0,0,can.width,can.height);
}

//集中線描画
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

//テキスト描画欄(吹き出し)描画
function drawTextArea(can){
    ctx=can.getContext("2d");
    let l=can.width/3;
    
    let a=0;
    let preA=0;
    ctx.lineWidth=4;
    ctx.fillStyle="white";
    ctx.beginPath();
    ctx.moveTo(can.width/2+l, can.height/2)

    let isFukidashi=true;
    let fukidashiAngles=[0,0,0];
    if(fukidashiPosOption.value=="0") isFukidashi=false;
    switch(fukidashiPosOption.value){ //吹き出しの位置 
        case "1": //left-up
        fukidashiAngles=[210*2*Math.PI/360,225*2*Math.PI/360,240*2*Math.PI/360]; break;
        case "2": //left-down
            fukidashiAngles=[130*2*Math.PI/360,135*2*Math.PI/360,150*2*Math.PI/360]; break;         
        case "3": //right-up
            fukidashiAngles=[300*2*Math.PI/360,315*2*Math.PI/360,330*2*Math.PI/360]; break;
        case "4": //right-down
            fukidashiAngles=[30*2*Math.PI/360,45*2*Math.PI/360,60*2*Math.PI/360]; break;
    }

    let cr1=fukidashiSharpness.value;
    if(cr1<0.5){
        cr1=0.5;
        fukidashiSharpness.value=0.5;
    }
    else if(cr1>1.2){
        cr1=1.2;
        fukidashiSharpness.value=1.2;
    }
    while(true){
        preA=a;
        a+=(20+Math.random()*20)*2*Math.PI/360;

        if(isFukidashi==true){
            if(Math.abs(fukidashiAngles[1]-a)<=40*Math.PI/360){
                a=fukidashiAngles[0]+(Math.random()*10-5)*2*Math.PI/360;
                ctx.quadraticCurveTo(can.width/2+cr1*l*(Math.cos(a)+Math.cos(preA)), can.height/2+0.8*l*(Math.sin(a)+Math.sin(preA))/2, can.width/2 + l*Math.cos(a), can.height/2+l*Math.sin(a)/2); //吹き出し第1頂点まで
                a=fukidashiAngles[1];
                ctx.lineTo(can.width/2 + 2*l*Math.cos(a), can.height/2+2*l*Math.sin(a)/2); //吹き出し第2頂点(大外)まで
                a=fukidashiAngles[2]+(Math.random()*10-5)*2*Math.PI/360;
                ctx.lineTo(can.width/2 + l*Math.cos(a), can.height/2+l*Math.sin(a)/2); //吹き出し第3頂点まで
                preA=a;
                a+=(20+Math.random()*20)*2*Math.PI/360; 
                isFukidashi=false;    
            }
        }

        if(a>=2*Math.PI){
            a=2*Math.PI;
            ctx.quadraticCurveTo(can.width/2+cr1*l*(Math.cos(a)+Math.cos(preA)), can.height/2+0.8*l*(Math.sin(a)+Math.sin(preA))/2, can.width/2 + l*Math.cos(a), can.height/2+l*Math.sin(a)/2);
            break;
        }         
        ctx.quadraticCurveTo(can.width/2+cr1*l*(Math.cos(a)+Math.cos(preA)), can.height/2+0.8*l*(Math.sin(a)+Math.sin(preA))/2, can.width/2 + l*Math.cos(a), can.height/2+l*Math.sin(a)/2);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

}

function copyCanContext(can1,can2){
    can2.getContext("2d").drawImage(can1,0,0);  
}

function ShowAsImage(can,img){
    img.setAttribute("src",can.toDataURL("image/png"));
}

//背景を描画
function drawBackGround(can){
    drawConcentratedLine(canCon);
    drawTextArea(canCon);
}

function DrawText(can, text, maxWidth){
    fontSize=100;
    ctx=can.getContext("2d");
    ctx.fillStyle="black";
    ctx.font=`${fontSize}px san-serif`
    ctx.textAlign="center"
    ctx.fillText(text, can.width/2, can.height/2+fontSize/2-5, maxWidth);
}

//描画を更新
function Update(text,canCon,canText){
    //clear
    ClearCan(canText);

    //CopyFromBGM
    copyCanContext(canCon,canText);

    //DrawText
    DrawText(canText, text, canCon.width/2);

    //ShowAsImage
    ShowAsImage(canText,img);
}




/*
//////////////////////////////////////////////
//  /// / //////////       /////////  ////////
//  //////////////////////////////////////////
//  /////////////////////////////        /////
//  ///  //////////////////////////////  /////
///     ///    /////       ////////////  /////
///////////// ////////////////////////  //////
//////////////////////////////////////////////
*/

//背景描画
drawBackGround(canCon);
Update(inText.value,canCon,canText);

//update text
inText.addEventListener("input",function(){
    Update(inText.value,canCon,canText)
});

//update background
inUpdate.addEventListener("click",function(){
    ClearCan(canCon);
    drawBackGround(canCon);
    Update(inText.value,canCon,canText);
});

