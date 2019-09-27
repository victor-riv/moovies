export interface EffectPayload<T> {
  type: T;
}

export type Effect<T> = EffectPayload<T> | undefined;
