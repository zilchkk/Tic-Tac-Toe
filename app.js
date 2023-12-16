let boxes = document.querySelectorAll(".Game-Btn");
let resetBtn = document.querySelector(".Reset-Btn");
let newGamebtn = document.querySelector("#new-Btn");
let msgContainer = document.querySelector(".msg-Container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX playerO
let moveCounter = 0;
const totalMoves = 9;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetbtn = () => {
    turnO = true;
    moveCounter = 0;
    enablebtn();
    msgContainer.classList.add("hide");
    resetBoxes();
};

const resetBoxes = () => {
    for (let box of boxes) {
        box.innerText = "";
    }
};

boxes.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (!btn.disabled) {
            if (turnO) {
                btn.innerText = "O";
                turnO = false;
            } else {
                btn.innerText = "X";
                turnO = true;
            }
            btn.disabled = true;
            moveCounter++;

            checkPattern();
            checkDraw();
        }
    });
});

const disablebtn = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enablebtn = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
};

const showWinner = (winner) => {
    msg.innerHTML = `Congratulations, the winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disablebtn();
};

const checkPattern = () => {
    for (pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

const checkDraw = () => {
    if (moveCounter === totalMoves) {
        msg.innerHTML = "It's a draw!";
        msgContainer.classList.remove("hide");
        disablebtn();
    }
};

resetBtn.addEventListener("click", resetbtn);
newGamebtn.addEventListener("click", resetbtn);
