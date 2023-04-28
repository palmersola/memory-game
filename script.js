$(document).ready(function() {
  const memory = [
    "&#127752;",
    "&#127754;",
    "&#127774;",
    "&#127794;",
    "&#127797;",
    "&#127815;",
    "&#127814;",
    "&#127822;",
    "&#127928;",
    "&#127944;",
    "&#127936;",
    "&#127968;",
    "&#128004;",
    "&#128018;",
    "&#128043;"
  ];
  let shuffArr = [];
  let selectionArr = [];
  let moves = 0;
  let score = 0;

  const gameOver = won => {
    $("#gameOver").css("visibility", "visible");
    won
      ? $(".item").children().css("visibility", "visible")
      : $(".item").css("background-color", "aquamarine").children().css("visibility", "hidden");
    $(".item").prop("onclick", null).off("click");
    clearInterval(timerCount);
  };

  const gameHandle = () => {
    setTimeout(() => {
      console.log(selectionArr);
      if (selectionArr[0] === selectionArr[2]) {
        selectionArr[1].prop("onclick", null).off("click").css("background-color", "yellow");
        selectionArr[3].prop("onclick", null).off("click").css("background-color", "yellow");
        score++;
        if (score === 15) {
          gameOver(true);
        }
      } else {
        selectionArr[1].children().css("visibility", "hidden");
        selectionArr[3].children().css("visibility", "hidden");
      }
      moves++;
      $("#movesSpan").html(moves);
      selectionArr = [];
    }, 750);
  };

  const buttHand = (item, i, element) => {
    console.log(i);
    console.log(item);
    element.children().css("visibility", "visible");
    selectionArr.push(item, element);
    if (selectionArr.length === 4) {
      gameHandle();
    }
  };

  const shuffle = () => {
    memory.map(item => shuffArr.push(item, item));
    shuffArr = shuffArr.sort(() => 0.5 - Math.random());
    shuffArr.map((item, i) => {
      let element = $(`#${i}`);
      element.children().html(item).css("visibility", "hidden");
      element.off("click");
      element.click(e => {
        e.preventDefault;
        buttHand(item, i, element);
      });
    });
  };

  const startTimer = () => {
    let timer = 120,
      minutes,
      seconds;
    timerCount = setInterval(() => {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      seconds = seconds < 10 ? "0" + seconds : seconds;
      --timer < -1 ? gameOver() && $("#time").text("0:00") : $("#time").text(minutes + ":" + seconds);
    }, 1000);
  };

  shuffle();
  startTimer();

  $("#restart").click(e => {
    e.preventDefault;
    shuffArr = [];
    selectionArr = [];
    moves = 0;
    score = 0;
    $(".item").css("background-color", "aquamarine");
    $(".item").children().css("visibility", "hidden");
    $("#movesSpan").html(0);
    $("#gameOver").css("visibility", "hidden");
    clearInterval(timerCount);
    startTimer();
    shuffle();
  });
});
