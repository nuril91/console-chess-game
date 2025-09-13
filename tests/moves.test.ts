import { initialBoard, idx } from '../src/engine/board';
import { isLegalMove } from '../src/engine/rules';
import { expect, test } from 'vitest';

test('pawn can move 2 from start if clear', () => {
  const b = initialBoard();
  // e2->e4
  expect(isLegalMove(b, {r:6,c:4}, {r:4,c:4}, 'W')).toBe(true);
});

test('bishop cannot jump over pieces', () => {
  const b = initialBoard();
  // c1->h6 blocked by pawns
  expect(isLegalMove(b, {r:7,c:2}, {r:2,c:7}, 'W')).toBe(false);
});
