import {
  SystemConfig,
  SystemInitCallback,
  SystemUpdateCallback,
} from './types';

export default class System<T> {
  private data: T | null;
  public name: string;
  public handleUpdate: SystemConfig<T>['onUpdate'];
  private handleInit?: SystemConfig<T>['onInit'];
  constructor(systemConfig: SystemConfig<T>) {
    this.data = null;
    this.name = systemConfig.name;
    this.handleUpdate = systemConfig.onUpdate;
    this.handleInit = systemConfig.onInit;
  }

  init(): void {
    if (this.handleInit) {
      this.data = this.handleInit();
    }
  }

  update(delta: number): void {
    this.handleUpdate(delta, this.data ? (this.data as T) : null);
  }
}
