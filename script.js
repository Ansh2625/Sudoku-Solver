document.addEventListener("DOMContentLoaded",function()
{
    let board = document.getElementById("sudo-board");

    for(let i=0; i<9; i++)
    {
        let row = document.createElement("tr");
        for(let j=0; j<9; j++)
        {
            let cell = document.createElement("td");
            let input = document.createElement("input");
            input.setAttribute("type","number");
            input.setAttribute("min","1");
            input.setAttribute("max","9");
            input.setAttribute("maxlength","1");
            cell.appendChild(input);
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
});

function getBoard()
{
    let board = [];
    let rows = document.querySelectorAll("#sudo-board tr");
    rows.forEach(row =>
    {
        let rowData = [];
        let cells = row.querySelectorAll("td input");
        cells.forEach(cell =>
        {
            rowData.push(cell.value === "" ? 0 : parseInt(cell.value));
        });
        board.push(rowData);
    });
    return board;
}

function setBoard(board)
{
    let rows = document.querySelectorAll("#sudo-board tr");
    rows.forEach((row,i) => 
    {
        let cells = row.querySelectorAll("td input");
        cells.forEach((cell,j) =>
        {
            cell.value = board[i][j] === 0 ? "" : board[i][j];
        });
    });
}

function isSafe(board,row,col,num)
{
    for(let x=0; x<9; x++)
    {
        if(board[row][x]==num || board[x][col]==num || board[3*Math.floor(row/3) + Math.floor(x/3)][3*Math.floor(col/3) + x%3]==num)
        {
            return false;
        }
    }
    return true;
}

function solveSudoku(board)
{
    let row = -1;
    let col = -1;
    let isEmpty = true;

    for(let i=0; i<9; i++)
    {
        for(let j=0; j<9; j++)
        {
            if(board[i][j] == 0)
            {
                row = i;
                col = j;
                isEmpty = false;
                break;
            }
        }
        if(!isEmpty)
        {
            break;
        }
    }

    if(isEmpty)
    {
        return true;
    }

    for(let num=1; num<=9; num++)
    {
        if(isSafe(board,row,col,num))
        {
            board[row][col] = num;
            if(solveSudoku(board))
            {
                return true;
            }
            board[row][col] = 0;
        }
    }

    return false;
}

function generateUnsolvedBoard()
{
    let unsolvedBoard = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ];
    setBoard(unsolvedBoard);
}

function solveIt()
{
    let board = getBoard();
    if(solveSudoku(board))
    {
        setBoard(board);
    }
    else
    {
        alert("No solution exists");
    }
}