import { System } from '..';
import { present } from '../utils';

export default class Engine {
  private isRunning: boolean;
  private latestTick: number;
  private systems: System[];

  constructor() {
    this.isRunning = false;
    this.latestTick = 0;
    this.systems = [];
  }
  start(): Engine {
    this.isRunning = true;
    this.latestTick = present();
    this.tick();
    return this;
  }
  stop(): Engine {
    this.isRunning = false;
    return this;
  }
  tick(): Engine {
    this.latestTick = present() - this.latestTick;
    if (this.isRunning) {
      this.systems.forEach(system => system.update(this.latestTick));
    }
    return this;
  }
  addSystem(system: System): Engine {
    this.systems.push(system);
    return this;
  }
}
