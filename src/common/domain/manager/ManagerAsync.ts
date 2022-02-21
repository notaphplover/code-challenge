import { Manager } from './Manager';

export type ManagerAsync<TInput, TOutput> = Manager<TInput, Promise<TOutput>>;
