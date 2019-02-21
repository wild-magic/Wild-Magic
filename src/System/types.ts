export type UpdateCallback = (delta: number) => void;

export interface SystemConfig {
  onUpdate: UpdateCallback;
}
