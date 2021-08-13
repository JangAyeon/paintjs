//1. track mouse movement on canvas

const canvas=document.getElementById("jsCanvas");
let painting =false; //painting 기본 상태 : false

function onMouseMove(event){
    //mousemove 이벤트가 받아온 내용 : console.log(event);
    const x=event.offsetX;
    const y=event.offsetY;
}

function stopPainting(event){
    //1. 마우스를 클릭했다가 떼면 painting 끝남
    //2. 캔버스 밖으로 마우스 벗어나면 painting 끝남
    painting=false
}

function onMouseDown(event){
    //마우스를 클릭하면 painting 시작
    painting=true;
}

function onMouseUp(event){
    stopPainting();
}

if (canvas) { //캔버스가 존재하는 경우,
    //canvas에 "mousemove" 이벤트 추가하고 "onMouseMove" 함수 실행
    canvas.addEventListener("mousemove",onMouseMove);
    //canvas에 "mousedown" 이벤트 추가하고 "onMouseDown" 함수 실행
    canvas.addEventListener("mousedown",onMouseDown);
    //canvas에 "mouseup" 이벤트 추가하고 "onMouseup" 함수 실행
    canvas.addEventListener("mouseup",onMouseUp);
    //canvas에 "mouseleave" 이벤트 추가하고 "onMouseLeave" 함수 실행
    canvas.addEventListener("mouseleave",stopPainting);
}

