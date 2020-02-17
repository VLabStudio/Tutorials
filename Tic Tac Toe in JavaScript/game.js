let x = true;

const square = [[], [], []];

let row = 1;
let column = 1;

for (let i = 0; i < 9; i++) {

    const element = document.getElementById(`${row}-${column}`);

    element.addEventListener("click", () => {

        if (element.style.background === "rgb(255, 255, 255)") {

            if (x === true) {
                element.style.background = "#00FF00";
            } else {
                element.style.background = "#FF0000";
            }

            x = !x;

        }

        check();

    });

    element.style.background = "#FFFFFF";

    square[row - 1][column - 1] = element;

    if (column % 3 === 0) {
        row++
        column = 1
    } else {
        column++;
    }
}

function check() {

    // Vertical Check
    for (let column = 0; column < 3; column++) {

        const color1 = square[0][column].style.background;
        const color2 = square[1][column].style.background;
        const color3 = square[2][column].style.background;

        if (color1 !== "rgb(255, 255, 255)" && color1 === color2 && color1 === color3) {
            win(color1);
        }

    }

    // Horizontal Check
    for (let row = 0; row < 3; row++) {

        const color1 = square[row][0].style.background;
        const color2 = square[row][1].style.background;
        const color3 = square[row][2].style.background;

        if (color1 !== "rgb(255, 255, 255)" && color1 === color2 && color1 === color3) {
            win(color1);
        }

    }

    // Cross Check
    let color1 = square[0][0].style.background;
    let color2 = square[1][1].style.background;
    let color3 = square[2][2].style.background;

    if (color1 !== "rgb(255, 255, 255)" && color1 === color2 && color1 === color3) {
        win(color1);
    }

    color1 = square[0][2].style.background;
    color2 = square[1][1].style.background;
    color3 = square[2][0].style.background;

    if (color1 !== "rgb(255, 255, 255)" && color1 === color2 && color1 === color3) {
        win(color1);
    }

}

function win(color) {

    let winner = "";
    if (color === "rgb(255, 0, 0)") {
        winner = "Red";
    } else {
        winner = "Green";
    }

    const element = document.getElementById("gameState");
    element.innerText = `Player ${winner} Won`;

    setTimeout(clean, 1000);

}

function clean() {

    let row = 1;
    let column = 1;

    for (let i = 0; i < 9; i++) {

        square[row - 1][column - 1].style.background = "#FFFFFF";

        if (column % 3 === 0) {
            row++
            column = 1
        } else {
            column++;
        }
    }

}