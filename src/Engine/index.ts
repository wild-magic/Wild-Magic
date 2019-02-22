import { System } from '..';
import { present } from '../utils';

export default class Engine {
  private isRunning: boolean;
  private latestTick: number;
  private systems: System<any>[];

  constructor() {
    this.isRunning = false;
    this.latestTick = 0;
    this.systems = [];
  }
  start(): Engine {
    console.log('starting engine');
    this.isRunning = true;
    this.latestTick = present();
    this.tick();
    return this;
  }
  stop(): Engine {
    console.log('stopping engine');
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
  addSystem(system: System<any>): Engine {
    console.log('adding system: ', system.name);
    this.systems.push(system);
    system.init();
    return this;
  }
}
