import { Board, idx } from "./board";
import { isLegalMove } from "./rules";

export interface ApplyResult {
    ok: boolean;
    board: Board;
    capture?: 'K' | 'k' | undefined; // if a king is captured, uppercase for white king, lowercase for black king
}

export function applyMove(b: Board, from: { r: number, c: number}, to: { r: number, c: number}, turn: 'W'|'B'): ApplyResult {
    if (!isLegalMove(b, from, to, turn)) {
        return { ok: false, board: b }; // illegal move, return original board
    }

    const next = b.slice(); // shallow copy of the board
    const fromIdx = idx(from.r, from.c); // index of the piece being moved
    const toIdx = idx(to.r, to.c); // index of the target square

    const moving = next[fromIdx]; // the piece being moved
    const target = next[toIdx]; // could be null or an opponent's piece if destination square is empty or occupied

    const capture: 'K' | 'k' | undefined = (target && target.type === 'K') ? (target.color === 'W' ? 'K' : 'k') : undefined; // check if a king is captured

    next[toIdx] = moving!; // move the piece to the target square
    next[fromIdx] = null; // empty the original square

    return { ok: true, board: next, capture };
}