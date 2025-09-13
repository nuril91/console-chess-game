import { Board, idx } from "../engine/board";

// convert piece to single character symbol for printing
const sym = (p: any) => {
    if (!p) return '.';
    const s = p.type; // P, R, N, B, Q, K
    return p.color === 'W' ? s : s.toLowerCase();
}

// print the board in a human-readable format
export function printBoard(b: Board): string {
    let out = '  a b c d e f g h\n';
    for (let r = 0; r < 8; r++) {
        const rank = 8 - r;
        let line = `${rank} `;
        for (let c = 0; c < 8; c++) {
            line += sym(b[idx(r, c)]) + ' ';
        }
        out += line.trimEnd() + '\n';
    }

    return out;
}