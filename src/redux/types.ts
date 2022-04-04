export interface Action<T = any> {
    type: string;
    payload?: T;
}

export interface Dispatch {
    (action: Action): void;
}