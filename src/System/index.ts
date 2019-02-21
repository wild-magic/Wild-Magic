import { SystemConfig, UpdateCallback } from './types';

export default class System {
  public update: UpdateCallback;
  constructor(systemConfig: SystemConfig) {
    this.update = systemConfig.onUpdate;
  }
}
