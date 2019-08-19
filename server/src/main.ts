import { DotGame } from './dot.game';
// @ts-ignore app is globally defined
const dotGame = new DotGame(4, 4, app.ports.response.send, console);
// @ts-ignore app is globally defined
app.ports.request.subscribe(message => dotGame.request(message));
