import WildMagic from "wild-magic";

console.log("hello second world...");

const tickCounter = document.createElement("div");
tickCounter.innerText = `Tick: 0`;
console.log(document);

document.addEventListener("DOMContentLoaded", () => {
  let engine = WildMagic.createEngine();
  const root = document.querySelector("#root");

  const tickCounter = document.createElement("div");
  tickCounter.innerText = `Tick: 0`;
  root.append(tickCounter);

  const button = document.createElement("button");
  button.innerText = "Start";
  button.addEventListener(
    "click",
    e => {
      if (engine.isRunning) {
        engine = engine.stop();
        button.innerText = "Start";
      } else {
        engine = engine.start();
        button.innerText = "Stop";
      }
    },
    false
  );

  root.append(button);

  const run = () => {
    engine = engine.tick(engine);
    tickCounter.innerText = `Tick: ${engine.latestTick}`;
    window.requestAnimationFrame(run);
  };

  run();
});
