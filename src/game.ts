import { applyMove } from "./engine/applyMove";
import { Board, initialBoard } from "./engine/board";
import { parseMove } from "./io/parser";
import { printBoard } from "./io/printer";

export type turn = 'W' | 'B'; // W: white, B: black

export class Game {
    board: Board = initialBoard();
    turn: turn = 'W'; // white starts
    over = false;
    winner: 'White' | 'Black' | null = null;

    show(): string {
        return printBoard(this.board);
    }

    move(line: string): string {
        const move = parseMove(line);
        if (!move) {
            return 'Invalid input, please use format like "2,3 3,3" or "e2,e4"';
        }

        const response = applyMove(this.board, move.from, move.to, this.turn);
        if (!response.ok) {
            return 'Illegal move, try again';
        }

        this.board = response.board;
        if (response.capture) {
            this.over = true;
            this.winner = (this.turn === 'W') ? 'White' : 'Black';
            return `Game Over! - ${this.winner} wins by capturing the king.`;
        }
        this.turn = (this.turn === 'W') ? 'B' : 'W'; // switch turn
        return 'Ok';
    }
}