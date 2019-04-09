import * as React from "react";
import { render } from "react-dom";
import "./styles.css";
import Engine from "./Engine";
import createEngine from "wild-magic/dist/lib/Engine";

const useAnimationFrame = (callback: Function) => {
  const callbackRef = React.useRef(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = () => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  };

  const frameRef = React.useRef<any>();
  React.useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};

function App() {
  const [engine, setEngine] = React.useState(createEngine());
  const frameRef = React.useRef<any>();
  React.useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(() => {
      setEngine(engine.tick());
    });
    return () => cancelAnimationFrame(frameRef.current);
  });

  return (
    <div className="App">
      <h1>Tick: {engine.latestTick}</h1>
      <button
        disabled={engine.isRunning}
        onClick={() => {
          setEngine(engine.start());
        }}
      >
        Start
      </button>
      <button
        disabled={!engine.isRunning}
        onClick={() => setEngine(engine.stop())}
      >
        Stop
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
