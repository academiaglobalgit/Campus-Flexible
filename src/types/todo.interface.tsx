export interface Todo {
  id?: number;
  title: string;
  completed?: boolean;
}

export interface TodoResponse {    
    code: number;
    message: string;
    data: Todo;
}