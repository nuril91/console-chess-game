import * as readline from 'readline';
import { Game } from './game';
import { read } from 'fs';

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const game = new Game();

console.log('Console Chess - enter move like "e2 e4" or "2,3 3,3" or "e2,e4" (Ctrl+C to quit)');
console.log(game.show());

function prompt() {
    readlineInterface.question(`${game['turn'] === 'W' ? 'White' : 'Black'}>`, (line) => {
        const message = game.move(line);
        console.log(message);
        console.log(game.show());
        if (game['over']) {
            readlineInterface.close();
            return;
        }
        prompt();

    })
}

prompt();