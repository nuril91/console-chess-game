export interface Move {
    from: {
        r: number;
        c: number;
    }
    to: {
        r: number;
        c: number;
    }
}

const fileToCol = (ch: string) => ch.toLowerCase().charCodeAt(0) - 97;
const rankToRow = (rank: number) => 8 - rank;

export function parseMove(line: string): Move | null {
    const s = line.trim().replace(/\s+/, ' ');

    // format numeric "1,3 2,3"
    let m = s.match(/^(\d+),(\d+)\s+(\d+),(\d+)$/);
    if (m) {
        const r1 = +m[1]!-1, c1 = +m[2]!-1, r2 = +m[3]!-1, c2 = +m[4]!-1;
        if ([r1, c1, r2, c2].every(v => v >= 0 && v < 8)) {
            return {
                from: {
                    r: r1,
                    c: c1
                },
                to: {
                    r: r2,
                    c: c2
                }
            }
        }
        return null;
    }

    // format algebraic with comma "e2,e4"
    m = s.match(/^([a-h])([1-8]),([a-h])([1-8])$/i);
    
    if (m) {
        const c1 = fileToCol(m[1]!)
        const r1 = rankToRow(+m[2]!)
        const c2 = fileToCol(m[3]!)
        const r2 = rankToRow(+m[4]!)
        return {
            from: {
                r: r1,
                c: c1
            },
            to: {
                r: r2,
                c: c2
            }
        }
    }

    return null;
}