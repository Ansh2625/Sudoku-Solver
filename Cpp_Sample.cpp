#include <bits/stdc++.h>
using namespace std;

class Sudoku
{
private:
    int board[9][9];

    bool solve()
    {
        for(int i=0; i<9; i++)
        {
            for(int j=0; j<9; j++)
            {
                if(board[i][j] == 0)
                {
                    for(int k=1; k<=9; k++)
                    {
                        if(isValid(i,j,k))
                        {
                            board[i][j] = k;

                            if(solve())
                                return true;
                            else
                                board[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    bool isValid(int row, int col, int k)
    {
        for(int i=0; i<9; i++)
        {
            if(board[row][i]==k)
                return false;
            
            if(board[i][col]==k)
                return false;

            if(board[3*(row/3)+(i/3)][3*(col/3)+(i%3)]==k)
                return false;
        }
        return true;
    }

public:
    Sudoku()
    {
        cout<<"Enter the Sudoku Puzzle (Enter 0 for Empty Box): "<<endl;
        for(int i=0; i<9; i++)
        {
            for(int j=0; j<9; j++)
            {
                cin>>board[i][j];
            }
        }
    }

    void solveSudoku()
    {
        if(solve())
            printBoard();
        else
            cout<<"No valid Solution exists for given Sudoku Puzzle.";

    }

    void printBoard()
    {
        cout<<endl;
        
        for(int i=0; i<9; i++)
        {
            for(int j=0; j<9; j++)
            {
                cout<<board[i][j]<<" ";
            }
            cout<<endl;
        }
    }

};

int main()
{
    Sudoku obj;

    obj.solveSudoku();

    return 0;
}