//1. track mouse movement on canvas
const canvas=document.getElementById("jsCanvas");
let painting =false; //painting 기본 상태 : false
let filling = false; //filling 기본 상태 : false

//2.set default 2D context in canvas 
//canvas MDN : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#basic_example

//2-1 : give size to canvas pixel modifier size (not only in css but also in js)
canvas.width=500;
canvas.height=500;

//2-2 : set default 2d context style
const ctx=canvas.getContext("2d");
ctx.strokeStyle="#2c2c2c";
ctx.lineWidth=2.5;

//3.set changing colors
const colors=document.getElementsByClassName("jsColor");
if (colors) {
    Array.from(colors).forEach(color=>
        color.addEventListener("click",handleColorClick));
}

function handleColorClick(event){
    //override stroke style with target's backgroundColor
    const color=event.target.style.backgroundColor;
    ctx.strokeStyle=color; 
}

//4.set changing brush size
const range=document.getElementById("jsRange");
if (range){
    range.addEventListener("input",handleRangeChange);
}

function handleRangeChange(event){
    //override line width with target's input value
    const size=event.target.value;
    ctx.lineWidth=size;
    
}


//5. change button from Fill to Paint

const mode=document.getElementById("jsMode");

if (mode){
    mode.addEventListener("click",handleModeClick);
}

function handleModeClick(event){
    if(filling){
        filling=false;
        mode.innerText="Fill";
    }
    else{
        filling=true;
        mode.innerText="Paint"
    }
}

function startPainting(){
    //마우스를 클릭하면 painting 시작
    painting=true;
}

function onMouseMove(event){ //마우스를 움직일 때 실행됨
    
    const x=event.offsetX; //canvas 위 x좌표
    const y=event.offsetY; //canvas 위 y좌표

    if(!painting){
        //painting = false : 클릭하지 않고 마우스를 움직이는 경우
        ctx.beginPath(); //path(=지점) 생성
        ctx.moveTo(x,y); //마우스의 x와 y좌표로 path를 옯김
    }
    else{
        //painting = true : 클릭하고 마우스를 움직이는 경우
        ctx.lineTo(x,y); //이전 path의 x,y에서 인자로 받은 x,y까지 연결해 line(=선) 생성
        ctx.stroke(); //해당 line을 stroke함
    }
}

function stopPainting(event){
    //1. 마우스를 클릭했다가 떼면 painting 끝남
    //2. 캔버스 밖으로 마우스 벗어나면 painting 끝남
    painting=false
}



if (canvas) { //캔버스가 존재하는 경우,
    //canvas에 "mousemove" 이벤트 추가하고 "onMouseMove" 함수 실행
    canvas.addEventListener("mousemove",onMouseMove);
    //canvas에 "mousedown" 이벤트 추가하고 "onMouseDown" 함수 실행
    canvas.addEventListener("mousedown",startPainting);
    //canvas에 "mouseup" 이벤트 추가하고 "onMouseup" 함수 실행
    canvas.addEventListener("mouseup",stopPainting);
    //canvas에 "mouseleave" 이벤트 추가하고 "onMouseLeave" 함수 실행
    canvas.addEventListener("mouseleave",stopPainting);
}

