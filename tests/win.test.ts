import { Game } from '../src/game';
import { expect, test } from 'vitest';

test('game ends when king is captured', () => {
  const g = new Game();
  // scenario where white captures black king
  g.move('e2,e4'); // W
  g.move('a7,a6'); // B
  g.move('d1,h5'); // W
  g.move('f7,f6'); // B
  const res = g.move('h5,e8'); // W captures black king
  expect(res.startsWith('Game Over')).toBe(true);
});