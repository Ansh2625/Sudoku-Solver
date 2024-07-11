class SudokuSolver
{
    constructor(boardId)
    {
        this.boardElement = document.getElementById(boardId);
        this.createBoard();
    }

    createBoard()
    {
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
            this.boardElement.appendChild(row);
        }
    }

    getBoard()
    {
        let board = [];
        let rows = this.boardElement.querySelectorAll("tr");
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

    setBoard(board)
    {
        let rows = this.boardElement.querySelectorAll("tr");
        rows.forEach((row,i) => 
        {
            let cells = row.querySelectorAll("td input");
            cells.forEach((cell,j) =>
            {
                cell.value = board[i][j] === 0 ? "" : board[i][j];
            });
        });
    }

    isSafe(board,row,col,num)
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

    solveSudoku(board)
    {
        for(let i=0; i<9; i++)
        {
            for(let j=0; j<9; j++)
            {
                if(board[i][j] == 0)
                {
                    for(let k=1; k<=9; k++)
                    {
                        if(this.isSafe(board,i,j,k))
                        {
                            board[i][j] = k;
                            if(this.solveSudoku(board))
                            {
                                return true;
                            }
                            else
                            {
                                board[i][j] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    generateUnsolvedBoard()
    {
        let unsolvedBoard = [
            [0,7,5,0,9,0,0,0,6],
            [0,2,3,0,8,0,0,4,0],
            [8,0,0,0,0,3,0,0,1],
            [5,0,0,7,0,2,0,0,0],
            [0,4,0,8,0,6,0,2,0],
            [0,0,0,9,0,1,0,0,3],
            [9,0,0,4,0,0,0,0,7],
            [0,6,0,0,7,0,5,8,0],
            [7,0,0,0,1,0,3,9,0]
        ];
        this.setBoard(unsolvedBoard);
    }

    solveIt()
    {
        let board = this.getBoard();
        if(this.solveSudoku(board))
        {
            this.setBoard(board);
        }
        else
        {
            alert("No solution exists");
        }
    }
}

document.addEventListener("DOMContentLoaded",function()
{
    window.sudokuSolver = new SudokuSolver("sudo-board");
});