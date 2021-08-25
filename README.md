# paintjs : 바닐라 JS로 그림판 만들기

## wireframe 구성<br>

![wireframe](/wireframe_1.jpg)

---

---

## 강의 참고 구현 기능

### [1] canvas 위 마우스 움직임 포착 <br>

1. `mousemove` 이벤트를 `<canvas>`에 추가 <br>
   `mousemove` : 선택한 요소 내에서 마우스를 움직였을 때 이벤트 발생<br>
   받아온 target 이벤트 중 `offsetX`와 `offsetY` 속성값 이용해 canvas 위의 마우스 location 파악<br><br>
2. `mousedown`과 `mouseup` 이벤트를 `<canvas>`에 추가 <br>
   `mousedown` : 선택한 요소 내에서 마우스 눌렀을 때 이벤트 발생 <br>
   `mouseup` : 선택한 요소에서 마우스를 눌렀다가 떼었을 때 이벤트 발생<br>
   click을 누르면 `painting`을 true로 하여 시작 -> click을 놓으면 `painting`을 false로 하며 끝남<br><br>
3. `mouseleave` 이벤트를 `<canvas>`에 추가<br>
   `mouseleave` : 선택한 요소에서 마우스 포인터가 벗어났을 때 이벤트 발생<br>
   canvas에 마우스가 벗어난 경우 `painting`은 false로 끝남<br><br>

### [2] canvas 태그는 context를 가짐<br>

1. canvas의 canvas pixel modifier size 지정<br>
   `.width`와 `.height` 값 설정<br><br>
2. context의 기본 설정 값 세팅 <br>
   `.getContext("2d")` : context의 default를 2d로 설정;<br>
   `.strokeStyle` : stroke의 색상 지정<br>
   `.lineWidth` : stroke의 굵기 지정<br><br>
3. 캔버스 위에서 마우스를 움직이는 경우<br>
   3-1. `click` 없이 마우스 이동 발생<br>
   `painting`=false : default<br>
   `onMouseMove` 실행됨 -> if절 실행됨<br>
   `.beginpath()`로 path(=지점) 생성됨<br>
   `.moveTo(x,y)`로 현재 (x,y)를 path(=지점)을 옮김<br>
   3-2. `click`과 함께 마우스 이동 발생<br>
   `click` 발생 -> `startPainting` 실행-> `painting`=true로 변경됨<br>
   마우스 움직임 발생 -> `onMouseMove` 실행 -> else 절 실행됨<br>
   `lineTo(x,y)`로 이전 path의 (x,y)에서 인자로 받은 (x,y)까지 연결해 line(=선) 생성<br>
   `stroke()` : 생성된 line을 stroke<br><br>

### [3] 색상 변경 구현<br>

1. className으로 해당 `<div>` 모두 가져오기 (object 형태임)
2. `Array.from(object)`로 배열로 변환
3. `배열.forEach(요소 => js 함수)`
   배열을 하나씩 돌면서 해당 요소에게 `click` 이벤트에 대한 `handleColorClick` 함수 실행을 붙여줌`
4. `handleColorClick`의 event target에서 `backgroundcolor`를 가져와 현재 색상 변수인 `.strokeStyle`에 override 진행<br><br>

### [4] 브러쉬 사이즈 변경 구현<br>

1. Id로 해당 `<input>` 가져옴
2. 가져온 `<input>`에 대해 value 속성이 바뀌면 `handleRangeChange` 함수 실행
3. `event.target`의 `value`값 받아서 `.linewidth`에 override 함<br>
   `input` 이벤트 : `<input>`, `<select>`,`<textarea>`요소의 `value` 속성이 바뀔 때마다 발생<br><br>

### [5] 버튼 Mode 조절 : Fill <-> Paint <br>

1. id로 해당 `<button>` 가져오기
2. 가져온 `<button>`에 대해 `click` 발생 시 `handleModeClick` 함수 실행
3. <br>3-1. `filling` = false인 경우 : default<br>`handleModeClick` 실행 -> `filling`=true ->
   `.innerText`로 `<button>`안의 text를 Paint로 바꿔 유저가 painting으로 넘어가게 구현<br>
   3-2.`filling`=true인 경우<br>
   `handleModeClick` 실행 -> `filling` = false
   -> `.innerText`로 `<button>`안의 text를 Fill로 바꿔 유저가 filling으로 넘어가게 구현<br>

---

---

<br>

## 추가적으로 스스로 구현한 기능

### [1] 새로고침 시 페이지 배경색 변경

| 색상 1                              |               색상 2                |                              색상 3 |
| ----------------------------------- | :---------------------------------: | ----------------------------------: |
| ![save_as_name](/배경색상변경1.png) | ![save_as_name](/배경색상변경2.png) | ![save_as_name](/배경색상변경3.png) |

| 색상 4                              |               색상 5                |
| ----------------------------------- | :---------------------------------: |
| ![save_as_name](/배경색상변경4.png) | ![save_as_name](/배경색상변경5.png) |

1. `background__colors` 배열에 색상 코드 담기
2. 새로고침 이루어 질 때마다 인덱스 값 랜덤으로 지정해서 구현

### [2] 이미지 파일 이름 직접 지정하여 저장 <br>

| 파일 이름 입력                      |           파이 이름 확인            |           지정한 파일 이름으로 저장 |
| ----------------------------------- | :---------------------------------: | ----------------------------------: |
| ![save_as_name](/이름변경저장1.png) | ![save_as_name](/이름변경저장2.png) | ![save_as_name](/이름변경저장3.png) |

1. `saveBtn`을 클릭하면 `handleSaveClick` 함수 실행됨
2. `canvas.toDataURL("image/jpeg")`로 jpeg 변환
3. `document.createElement("a");`로 링크 생성
4. `prompt`로 부터 파일 이름 입력 받음
5. `!confirm(filename+"이 맞습니까?")`를 통해 확인 과정 거치고 해당 입력 값으로 이미지 파일 이름 직접 입력한 값으로 저장

### [3] 사용자가 직접 색상 지정하여 Fill / Paint <br>

| Color Picker 실행                     |       Color Picker 색상 고르기        |
| ------------------------------------- | :-----------------------------------: |
| ![save_as_name](/사용자지정색상1.png) | ![save_as_name](/사용자지정색상2.png) |

| 사용자 지정 색성 Paint                |         사용자 지정 색상 Fill         |
| ------------------------------------- | :-----------------------------------: |
| ![save_as_name](/사용자지정색상3.png) | ![save_as_name](/사용자지정색상4.png) |

1. `<input type="color" id="jsColorPicker" />` 이용해 Color Picker 구현
2. `document.getElementById("jsColorPicker")`로 요소를 가져오기
3. `change` 이벤트 발생 시 해당 color id로 Fill과 Paint 진행
