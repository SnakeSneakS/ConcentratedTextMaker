canCon=document.getElementsByTagName("canvas")[0]; //背景
canText=document.getElementsByTagName("canvas")[1]; //文字
img=document.getElementsByTagName("img")[0];
inText=document.getElementsByTagName("input")[0]; //文字入力
inUpdate=document.getElementsByTagName("input")[1]; //再描画ボタン

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

