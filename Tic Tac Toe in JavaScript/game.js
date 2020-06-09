let x = true;

const squares = [[], [], []];

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

    squares[row - 1][column - 1] = element;

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

        const color1 = squares[0][column].style.background;
        const color2 = squares[1][column].style.background;
        const color3 = squares[2][column].style.background;

        if (color1 !== "rgb(255, 255, 255)" && color1 === color2 && color1 === color3) {
            win(color1);
        }

    }

    // Horizontal Check
    for (let row = 0; row < 3; row++) {

        const color1 = squares[row][0].style.background;
        const color2 = squares[row][1].style.background;
        const color3 = squares[row][2].style.background;

        if (color1 !== "rgb(255, 255, 255)" && color1 === color2 && color1 === color3) {
            win(color1);
        }

    }

    // Cross Check
    let color1 = squares[0][0].style.background;
    let color2 = squares[1][1].style.background;
    let color3 = squares[2][2].style.background;

    if (color1 !== "rgb(255, 255, 255)" && color1 === color2 && color1 === color3) {
        win(color1);
    }

    color1 = squares[0][2].style.background;
    color2 = squares[1][1].style.background;
    color3 = squares[2][0].style.background;

    if (color1 !== "rgb(255, 255, 255)" && color1 === color2 && color1 === color3) {
        win(color1);
    }

    // No Winner Check
    const noWinnerSquares = [];
    for (const square of squares) {
        noWinnerSquares.push(square[0].style.background);
        noWinnerSquares.push(square[1].style.background);
        noWinnerSquares.push(square[2].style.background);
    }

    if (!noWinnerSquares.includes("rgb(255, 255, 255)"))
        win("rgb(0, 0, 0)");
}

function win(color) {
    if (color === "rgb(0, 0, 0)") {
        const element = document.getElementById("gameState");
        element.innerText = `No one won the game`;

        setTimeout(clean, 1000);
        return;
    }

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

        squares[row - 1][column - 1].style.background = "#FFFFFF";

        if (column % 3 === 0) {
            row++
            column = 1
        } else {
            column++;
        }
    }

}