import init, { greet, display } from "snake_game";


init().then(wasm => {
    console.log(greet("SNAKE GAME"));
    display("John");
  })