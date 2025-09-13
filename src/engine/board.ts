import { Piece, PieceType } from './pieces.js';

export type Board = (Piece | null)[]; // 64 elements, row-major order
export const idx = (r: number, c: number) => r * 8 + c; // convert (row, col) to index in 1D array
export const inBounds = (r: number, c: number) => r >= 0 && r < 8 && c >= 0 && c < 8; // check if (row, col) is within the board

// create the initial chess board setup
// pawns on 2nd and 7th ranks, back rank pieces on 1st and 8th ranks
export function initialBoard(): Board {
    const b: Board = Array(64).fill(null); // start with an empty board
    const back: PieceType[] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'] as any; // back rank pieces order

    // place pawns and back rank pieces for both colors
    back.forEach((t, c) => {
        b[idx(1, c)] = { type: 'P', color: 'B' };
        b[idx(6, c)] = { type: 'P', color: 'W' };
        b[idx(0, c)] = { type: t, color: 'B' };
        b[idx(7, c)] = { type: t, color: 'W' };
    });

    return b;
}