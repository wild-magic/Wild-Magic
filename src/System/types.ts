export type SystemUpdateCallback<T> = (
  delta: number,
  initializableItem: T | null,
) => void;

export type SystemInitCallback<T> = () => T;

export interface SystemConfig<T> {
  name: string;
  onUpdate: SystemUpdateCallback<T>;
  onInit?: SystemInitCallback<T>;
}
