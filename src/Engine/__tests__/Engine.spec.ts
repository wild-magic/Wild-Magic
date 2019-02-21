import Engine from '../';
import { System } from '../..';

describe('Engine', () => {
  it('should create an Engine with some properties', () => {
    const engine = new Engine();
    expect(engine).toHaveProperty('isRunning', false);
    expect(engine).toHaveProperty('latestTick', 0);
    expect(engine).toHaveProperty('systems', []);
  });
  describe('start()', () => {
    it('should start the engine', () => {
      const engine = new Engine();
      engine.start();
      expect(engine).toHaveProperty('isRunning', true);
    });

    it('should set latestTick to a new value', () => {
      const engine = new Engine();
      engine.start();
      // @ts-ignore
      expect(engine.latestTick).toBeGreaterThan(0);
    });

    it('should call the tick() method immediately', () => {
      const engine = new Engine();
      let spyValue = false;
      engine.tick = () => {
        spyValue = true;
        return engine;
      };
      engine.start();
      expect(spyValue).toBe(true);
    });
  });

  describe('stop()', () => {
    it('should stop the engine', () => {
      const engine = new Engine();
      engine.start();
      expect(engine).toHaveProperty('isRunning', true);
      engine.stop();
      expect(engine).toHaveProperty('isRunning', false);
    });
  });

  describe('tick()', () => {
    it('should set latestTick to a new value', () => {
      const engine = new Engine();
      engine.tick();
      // @ts-ignore
      expect(engine.latestTick).toBeGreaterThan(0);
    });

    it('should not iterate through systems if its not running', () => {
      let testDelta = 0;
      const mySystem = new System({
        onUpdate: delta => (testDelta = delta),
      });
      const engine = new Engine();
      engine.addSystem(mySystem);
      engine.tick();
      expect(testDelta).toEqual(0);
    });

    it('should iterate through systems and call their update functions with the right delta value', () => {
      let testValue = 0;
      const mySystem = new System({
        onUpdate: delta => (testValue = delta),
      });
      const engine = new Engine();
      engine
        .addSystem(mySystem)
        .start()
        .tick();
      // @ts-ignore
      expect(testValue).toEqual(engine.latestTick);
    });
  });

  describe('addSystem()', () => {
    it('should add a system and return itself', () => {
      const mySystem = new System({
        onUpdate: () => {},
      });
      const engine = new Engine();
      const isChainable = engine.addSystem(mySystem);
      expect(isChainable).toBe(engine);
      expect(engine).toHaveProperty('systems', [mySystem]);
    });
  });
});
