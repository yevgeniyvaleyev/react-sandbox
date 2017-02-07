import { schema } from 'normalizr';

// defines data structure for normalizr
export const todo = new schema.Entity('todos');
export const arrayOfTodos = new schema.Array(todo);
