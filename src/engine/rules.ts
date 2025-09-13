import { Board, idx, inBounds } from "./board";

// check for clear path in direction between the origin and destination boxes is empty
// used for Rook, Bishop, and Queen
function pathClear(b: Board, r: number, c: number, dr: number, dc: number, steps: number): boolean {
    for (let k = 1; k < steps; k++) {
        // check each square along the path, excluding the starting and ending squares
        if (b[idx(r + dr * k, c + dc * k)] !== null) {
            return false; // path is blocked, because there is another piece in the way
        }
    }
    return true; // path is clear
}

export function isLegalMove(b: Board, from: { r: number, c: number}, to: { r: number, c: number}, turn: 'W' | 'B'): boolean {
    if (!inBounds(from.r, from.c) || !inBounds(to.r, to.c)) {
        return false; // out of bounds
    }

    if (from.r === to.r && from.c === to.c) {
        return false; // no move
    }

    const piece = b[idx(from.r, from.c)];
    if (!piece || piece.color !== turn) {
        return false; // no piece or not player's turn
    }

    const target = b[idx(to.r, to.c)];
    if (target && target.color === piece.color) {
        return false; // cannot capture own piece
    }

    const deltaRow = to.r - from.r; // positive if moving down, negative if moving up
    const deltaCol = to.c - from.c; // positive if moving right, negative if moving left
    const absDeltaRow = Math.abs(deltaRow);
    const absDeltaCol = Math.abs(deltaCol);

    switch (piece.type) {
        case 'N': { // Knight, can jump over pieces and moves in "L" shape (2+1) or (1+2)
            return (absDeltaRow === 2 && absDeltaCol === 1) || absDeltaRow === 1 && absDeltaCol === 2;
        }
        case 'K': { // King, moves one square in any direction
            return absDeltaRow <= 1 && absDeltaCol <= 1; 
        }
        case 'R': { // Rook, straight lines any number of squares and path must be clear
            if (deltaRow !== 0 && deltaCol !== 0) {
                return false; // not a straight line, it should be either row or column change
            }

            const steps = Math.max(absDeltaRow, absDeltaCol); // number of squares moved
            if (!pathClear(b, from.r, from.c, Math.sign(deltaRow), Math.sign(deltaCol), steps)) {
                return false; // path is blocked
            }
            return true; // valid Rook move
        }
        case 'B': { // Bishop, diagonal any number of squares and path must be clear
            if (absDeltaRow !== absDeltaCol) {
                return false; // not a diagonal move, diagonal moves must have equal row and column changes
            }
            const steps = absDeltaRow; // number of squares moved, same as absDeltaCol
            if (!pathClear(b, from.r, from.c, Math.sign(deltaRow), Math.sign(deltaCol), steps)) {
                return false; // path is blocked
            }
            return true; // valid Bishop move
        }
        case 'Q': { // Queen, straight or diagonal any number of squares and path must be clear
            if (deltaRow !== 0 && deltaCol !== 0 && absDeltaRow !== absDeltaCol) {
                return false; // not a straight line or diagonal move
            }
            const steps = Math.max(absDeltaRow, absDeltaCol); // number of squares moved
            if (!pathClear(b, from.r, from.c, Math.sign(deltaRow), Math.sign(deltaCol), steps)) {
                return false; // path is blocked
            }
            return true; // valid Queen move
        }
        case 'P': { // Pawn, moves forward one square, or two squares from starting position, captures diagonally
            const direction = (piece.color === 'W') ? -1 : 1; // White moves up (decreasing row), Black moves down (increasing row)
            const startRow = (piece.color === 'W') ? 6 : 1; // starting row for pawns, 6 for White, 1 for Black

            if (deltaCol === 0 && deltaRow === direction && !target) {
                return true; // move forward one square
            }

            if (deltaCol === 0 &&
                deltaRow === 2 * direction &&
                from.r === startRow &&
                !target &&
                b[idx(from.r + direction, from.c)] === null
            ) {
                return true; // move forward two squares from starting position
            }

            if (absDeltaRow === 1 &&
                absDeltaCol === 1 &&
                deltaRow === direction &&
                target &&
                target.color !== piece.color
            ) {
                return true; // capture diagonally
            }

            return false; // invalid pawn move
        }
    }

    return false; // unknown piece type
}