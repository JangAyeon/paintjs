//1. track mouse movement on canvas
const canvas=document.getElementById("jsCanvas");
let painting =false; //painting 기본 상태 : false
let filling = false; //filling 기본 상태 : false
let clearing=false; //clearing 기본 상태 : false

//2.set default 2D context in canvas 
//canvas MDN : https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D#basic_example

//2-1 : give size to canvas pixel modifier size (not only in css but also in js)
const CANVAS_SIZE=500;
canvas.width=CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

//2-2 : set default 2d context style
const ctx=canvas.getContext("2d");

//7. set default canvas background : not transparent just white
ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height);

//2-3 : set default line and Rect Style
const INITIAL_COLOR="#2c2c2c";
ctx.strokeStyle=INITIAL_COLOR;
ctx.fillStyle=INITIAL_COLOR;
ctx.lineWidth=2.5;



//3.set changing colors
const colors=document.getElementsByClassName("jsColor");
if (colors) {
    Array.from(colors).forEach(color=>
        color.addEventListener("click",handleColorClick));
}


function handleColorClick(event){
    //override stroke style with target's backgroundColor
    const color=event.target.style.backgroundColor || event.target.value;
    ctx.strokeStyle=color; 
    ctx.fillStyle=color;
}

//4.set changing brush size 
//input event MDN : https://developer.mozilla.org/ko/docs/Web/API/HTMLElement/input_event
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
        mode.innerText="Paint";
    }
}

//6. fill canvas by clicking button and selected color
function handleCanvasClick(){

    if(filling){
        //only when mode is filling make canvas be full of selected color
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

//8. prevent mouse right click
function handleContextMenu(event){
    event.preventDefault();

}

//9. save image by clicking save button
const saveBtn=document.getElementById("jsSave");//jsSave의 <button>을 모두 받아오기

function handleSaveClick(){
    const image=canvas.toDataURL("image/jpeg"); //현재 canvas에 있는 data를 jpeg로 변환
    const link=document.createElement("a"); //link 생성 (아직 비어있음)
    link.href=image;//<a>에 대한 속성인 .href 해당 URL을 다운
    var filename=prompt("파일 이름을 입력하세요 : ");
    if (!confirm(filename+"이 맞습니까?")){}
    else{
        link.download=filename; //해당 이미지의 이름 지정
        link.click();//fake click
    }

}
if(saveBtn){
    //save 버튼 click 이벤트에 대한 handleSaveClick 함수 실행
    saveBtn.addEventListener("click",handleSaveClick);
}
//10. clear all canvas
const clear=document.getElementById("jsClear");
if (clear){
    clear.addEventListener("click",handleClearClick);
}
function handleClearClick(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
}


//11. random background color
var background__colors=["#84AC67","#F8CED2","#CC8A4D","#FFD0BF","#FCF49C","FOF2E7"];
background__color=background__colors[Math.floor(Math.random()*background__colors.length)];
console.log(background__color);
document.getElementById("body").style.background=background__color;


//12. select color from color picker
const selectedColor=document.getElementById("jsColorPicker")

if (selectedColor){
    selectedColor.addEventListener("change",handleColorClick);
}


//13. open image from my data into canvas
const openimg=document.getElementById("jsOpen");
if(openimg){
    openimg.addEventListener("click",handleOpenimg);
}
function handleOpenimg(){
        console.log("open");
        img = document.createElement("img");
    img.src = 'img/base.png';
    context.drawImage(img, 100, 100);
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
    //canvas에 "mousemove" 이벤트에 대해 "onMouseMove" 함수 실행
    canvas.addEventListener("mousemove",onMouseMove);
    //canvas에 "mousedown" 이벤트에 대해 "onMouseDown" 함수 실행
    canvas.addEventListener("mousedown",startPainting);
    //canvas에 "mouseup" 이벤트에 대해 "onMouseup" 함수 실행
    canvas.addEventListener("mouseup",stopPainting);
    //canvas에 "mouseleave" 이벤트에 대해 "onMouseLeave" 함수 실행
    canvas.addEventListener("mouseleave",stopPainting);
    //canvas에 "mouseleave" 이벤트에 대해 "handleCanvasClick" 함수 실행
    canvas.addEventListener("click",handleCanvasClick);
    //canvas에 "contextmenu" 이벤트에 대해 "handleContextMenu" 함수 실행
    canvas.addEventListener("contextmenu",handleContextMenu);
}

