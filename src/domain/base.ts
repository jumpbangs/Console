export interface Action<T, M = {}> {
  type: T;
  meta: M;
}

export interface ActionWithPayload<T, P, M = {}> extends Action<T, M> {
  payload: P;
}

export interface ActionWithError<T, P, M = {}> extends ActionWithPayload<T, P, M> {
  error: true;
}
