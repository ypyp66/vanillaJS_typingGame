const wordInput = document.querySelector(".typing");
const word = document.querySelector(".text");
const setScore = document.querySelector(".score");
const setTime = document.querySelector(".time");
const button = document.querySelector(".btn");
const url = "https://random-word-api.herokuapp.com/word?number=100";
const commonTime = 5;
const commonScore = 0;

let score;
let time = commonTime;
let isPlaying = false; //게임중인지 확인
let timeInterval;
let words = [];

init();

function init() {
  btnChange("로딩중");
  getApi();

  score = commonScore;
  time = commonTime;
  setScore.innerText = score;
  setTime.innerText = time;
  wordInput.value = "";
  wordInput.classList.remove("wrong");

  wordInput.addEventListener("keydown", checkAnswer);
  button.addEventListener("click", run);
}

function getApi() {
  axios.get(url).then((response) => {
    words = response.data;
    btnChange("게임시작");
    word.innerText = words[0];
  });
}

//실행
function run() {
  //게임중에 클릭하면 return
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  timeInterval = setInterval(countDown, 990); //카운트다운 함수
  btnChange("게임중");
}

//카운트
function countDown() {
  time > 0 ? time-- : (isPlaying = false);
  setTime.innerText = time;
  if (!isPlaying) {
    clearInterval(timeInterval);
    window.alert(`시간초과! \n최종점수: ${score}`);
    init();
  }
}

//버튼이 바뀌었을 때
function btnChange(text) {
  button.innerText = text;
  text === "게임시작"
    ? button.classList.remove("loading")
    : button.classList.add("loading");
}

//사용자 입력 확인
function checkAnswer(event) {
  if (event.keyCode === 13 && isPlaying) {
    const word_ = word.innerHTML.toLocaleLowerCase();
    const answer = wordInput.value.toLocaleLowerCase();

    if (word_ === answer) {
      wordInput.classList.remove("wrong");
      time = commonTime;
      score++;
      setScore.innerText = score;
      setTime.innerText = time;
      wordInput.value = "";

      randomWord();
    } else {
      wordInput.classList.add("wrong");
      wordInput.value = "";
    }
  }
}

//랜덤 단어
function randomWord() {
  const index = Math.floor(Math.random() * words.length);
  word.innerText = words[index];
}
