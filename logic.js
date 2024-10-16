//! Start The Game
let ctrlSpan = document.querySelector(".control-buttons span");

ctrlSpan.onclick = () => {
  let promptMsg = window.prompt("Enter Your Name To Start");

  if (promptMsg == "") {
    document.querySelectorAll(".info .name span")[1].innerHTML = "Unknown";
    ctrlSpan.parentElement.remove();
  } else {
    document.querySelectorAll(".info .name span")[1].innerHTML = promptMsg;
  }

  ctrlSpan.parentElement.remove();
};

//~ Select Main vars
let game_Blocks = document.querySelectorAll(".game-block");
let duration = 1000;
let blockCont = document.querySelector(".memory_game_blocks");

// let orderRange = [...Array(game_Blocks.length).keys()];
let orderRange = Array.from(Array(game_Blocks.length).keys());
let randomIndex = [Math.floor(Math.random() * orderRange.length)];

Array.from(game_Blocks).forEach((block, index) => {
  block.style.order = shuffle(orderRange)[index];

  block.addEventListener("click", () => {
    flipBlock(block);
  });
});

function flipBlock(selectedBlock) {
  selectedBlock.classList.toggle("is-flipped");

  let allFilpped = Array.from(game_Blocks).filter((flipped) =>
    flipped.classList.contains("is-flipped")
  );

  if (allFilpped.length == 2) {
    stopClick();
    checkMatched(allFilpped[0], allFilpped[1]);
    //allFilpped.forEach((el) => (el.style.pointerEvents = "none"));
  }
}

function stopClick() {
  blockCont.classList.add("no-click");

  setTimeout(() => {
    blockCont.classList.remove("no-click");
  }, duration);
}

function checkMatched(fBlock, lBlock) {
  let triesEl = document.querySelectorAll(".tries span")[1];
  if (fBlock.dataset.tech === lBlock.dataset.tech) {
    fBlock.classList.remove("is-flipped");
    lBlock.classList.remove("is-flipped");

    fBlock.classList.add("has-match");
    lBlock.classList.add("has-match");
    document.getElementById("success").play();
    if (Array.from(document.querySelectorAll(".has-match")).length === 20) {
      endGameS();
    }
  } else {
    setTimeout(() => {
      triesEl.innerHTML = parseInt(triesEl.innerHTML) + 1;

      fBlock.classList.remove("is-flipped");
      lBlock.classList.remove("is-flipped");
      document.getElementById("fail").play();
      console.log(triesEl.innerHTML);
      if (triesEl.innerHTML == "20") {
        endGameF(blockCont);
      }
    }, duration);
  }
}

// Shuffle Fn
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;

    return array;
  }
}

shuffle(orderRange);

function endGameF(blockCont) {
  let popup = document.createElement("div");
  popup.innerHTML = `<h3>Game Over</h3>`;
  blockCont.classList.add("no-click");
  popup.classList.add("popup");
  document.body.appendChild(popup);
}

function endGameS() {
  let popup = document.createElement("div");
  popup.innerHTML = `<h3>🎉 You Win 🎉</h3>`;

  popup.classList.add("popup");
  document.body.appendChild(popup);
}
