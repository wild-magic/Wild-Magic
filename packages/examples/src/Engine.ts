import wildMagic from "wild-magic";

export default class Engine {
  private statelessEngine: any;
  constructor() {
    this.statelessEngine = wildMagic.createEngine();
  }

  tick() {
    this.statelessEngine = this.statelessEngine.tick();
    return this;
  }

  start() {
    this.statelessEngine = this.statelessEngine.start();
  }

  stop() {
    this.statelessEngine = this.statelessEngine.stop();
  }

  get isRunning() {
    return this.statelessEngine.isRunning;
  }

  get latestTick() {
    return this.statelessEngine.latestTick;
  }
}
