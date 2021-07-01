const addImgToDiv = function (imgUrl, div){
    let imgTag = document.createElement("img");
    imgTag.setAttribute("src", imgUrl);
    div.appendChild(imgTag);
}

function Player(turn){
    let playerTurn = turn;
    let url = `./photos/${turn}.png`;

    return {playerTurn, url};
}

let playerX = Player("x");
let playerO = Player("o");

function square(div){
    const squareDiv = div;
    let markedBy = null;

    const isMarked = () => squareObj.markedBy;
    const isMarkedBy = (player) => {
        squareObj.markedBy = player.playerTurn;
        addImgToDiv(player.url, squareObj.squareDiv);
        // return {markedBy, isMarkedBy};
    };
    const squareObj = {markedBy, isMarked, isMarkedBy, squareDiv}
    return squareObj;
}

const Board = ((playerX, playerO, dimension) => {

    let currentPlayer = playerX;
    let nextPlayer = playerO;

    const boardDiv = document.querySelector("#tic-tac-toe");
    const turnIndicator = document.querySelector("#turn-indicator");

    // create 2d array
    const squares = new Array(dimension);
    for (let i = 0; i < dimension; i++){
        squares[i] = new Array(dimension);
    }

    // populate 2d array with square div (y = vertical direction, x = horizontal direction)
    for (let y = 0; y < dimension; y++){
        for (let x = 0; x < dimension; x++){
            let squareDiv = document.createElement("div");
            squareDiv.classList.add("square");
            squareDiv.addEventListener("click", e => markSquare(e.currentTarget));
            squareDiv.setAttribute("data-x", x);
            squareDiv.setAttribute("data-y", y);
            
            boardDiv.appendChild(squareDiv);

            squares[y][x] = square(squareDiv);
        }
    }

    const markSquare = (squareDiv) => {
        let x = parseInt(squareDiv.getAttribute("data-x"));
        let y = parseInt(squareDiv.getAttribute("data-y"));

        // skip marked square   
        if (squares[y][x].isMarked()) {
            console.log("marked!!");
            return;
        }
        
        squares[y][x].isMarkedBy(currentPlayer);

        console.log(squares[y][x]);
        console.log(squares[y][x].markedBy);
        console.log(squares[y][x].isMarked());

        if (checkWinCondition(y, x)){
            end();
        }
        else{
            changeTurn();
        }
    }

    
    const displayNextPlayer = () => {
        turnIndicator.setAttribute("src", currentPlayer.url);
    }

    const displayWinner = () => {
        // const indicator = document.querySelector("#indicator");
        // while(indicator.firstChild){
        //     indicator.firstChild.remove();
        // }
        // const playerSymbol = document.createElement("img");
        // const textSpan = document.createElement("span");
        // textSpan.textContent = "The winner is: ";
        // playerSymbol.setAttribute("src", currentPlayer.url);

        // indicator.appendChild(textSpan);
        // indicator.appendChild(playerSymbol);
        setTimeout(() => alert(`The winner is: ${currentPlayer.playerTurn}`), 0);
    }

    const changeTurn = () => {
        [currentPlayer, nextPlayer] = [nextPlayer, currentPlayer];
        displayNextPlayer();
    };

    const checkWinCondition = (currentYPos, currentXPos) => {
        if (checkDiagonally(currentYPos, currentXPos) || 
        checkHorizontally(currentYPos, currentXPos) || 
        checkVertically(currentYPos, currentXPos)){
            return true;
        }
        return false;
    }

    const checkHorizontally = (fixedY, currentX) => {
        let count = 1;

        // check left to right, only check to dimension - 1
        for (let x = currentX; x < dimension - 1; x++){
            let currentSquare = squares[fixedY][x];
            let rightOfCurrentSquare = squares[fixedY][x+1];

            

            if(currentSquare.isMarked() === rightOfCurrentSquare.isMarked()){
                // increase count if there are 2 same marks (o and o or x and x)
                count++;
            }
            else{
                // reset count if there are 2 different mark (x and o)
                count = 1;
                break; 
            }

            if(count === 3){
                return true;
            }
        }

        // check right to left
        for (let x = currentX; x >= 1; x--){
            let currentSquare = squares[fixedY][x];
            let leftOfCurrentSquare = squares[fixedY][x-1];
            if(currentSquare.isMarked() === leftOfCurrentSquare.isMarked()){
                // increase count if there are 2 same marks (o and o or x and x)
                count++;
            }
            else{
                // reset count if there are 2 different mark (x and o)
                count = 1;
                break; 
            }

            if(count === 3){
                return true;
            }
        }

        return false;
    }

    const checkVertically = (currentY, fixedX) => {
        let count = 1;

        // check top to btm, only check to dimension - 1
        for (let y = currentY; y < dimension - 1; y++){
            let currentSquare = squares[y][fixedX];
            let underCurrentSquare = squares[y+1][fixedX];
            if(currentSquare.isMarked() === underCurrentSquare.isMarked()){
                count++;
            }
            else{
                count = 1;
                break; 
            }

            if(count === 3){
                return true;
            }
        }

        // check btm to top
        for (let y = currentY; y >= 1; y--){
            let currentSquare = squares[y][fixedX];
            let aboveCurrentSquare = squares[y-1][fixedX];
            if(currentSquare.isMarked() === aboveCurrentSquare.isMarked()){
                count++;
            }
            else{
                count = 1;
                break; 
            }

            if(count === 3){
                return true;
            }
        }

        return false;
        
    }

    const checkDiagonally = (currentY, currentX) => {
        let count = 1;
        // check diagonally down (0,0) => (1,1)
        for(let x = currentX, y = currentY; x < dimension - 1 && y < dimension - 1; x++, y++){
            let currentSquare = squares[y][x];
            let nextSquare = squares[y+1][x+1];

            if (currentSquare.isMarked() === nextSquare.isMarked()){
                count++;
                if (count === 3){
                    return true;
                }
            }
            else{
                count = 1;
                break;
            }
        }

        for(let x = currentX, y = currentY; x >= 1 && y >= 1; x--, y--){
            let currentSquare = squares[y][x];
            let nextSquare = squares[y-1][x-1];
            if (currentSquare.isMarked() === nextSquare.isMarked()){
                count++;
                if (count === 3){
                    return true;
                }
            }
            else{
                count = 1;
                break;
            }
        }
        
        return false;
    }

    const start = () => {
        displayNextPlayer();
    }

    const end = () => {
        displayWinner();

    }

    return {start}
})(playerX, playerO, 3);

Board.start();
