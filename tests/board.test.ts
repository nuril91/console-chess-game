import { idx, initialBoard } from "../src/engine/board";
import { expect, test } from 'vitest';

test('initial board has pawns and back ranks', () => {
    const b = initialBoard();
    expect(b[idx(1, 0)]?.type).toBe('P');
    expect(b[idx(6, 7)]?.type).toBe('P');
    expect(b[idx(0, 4)]?.type).toBe('K');
    expect(b[idx(7, 4)]?.type).toBe('K');
})