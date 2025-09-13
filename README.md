# Console Chess — How to Run & Play

## Run
```bash
npm install
npm run start
```

## How to Play (CLI)

The program will display the board and a turn prompt:

    Console Chess ... (Ctrl+C or type q to quit)
    White>

Enter moves in **one** of these formats:
- **Numeric (1-based):** `row,col row,col`  
  Example: `2,5 4,5`
- **Algebraic:** `e2 e4` or `e2,e4`

If the move is legal, the board updates and the turn switches.  
**The game ends** when a king is captured.

### Exit
Press **Ctrl + C** or type `q` / `quit`.
