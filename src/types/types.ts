export const USER_ID = 3349;

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export type LoadingTypes = {
  todos: boolean;
  add: boolean;
  deletedId: number[];
  update: number | null;
};
