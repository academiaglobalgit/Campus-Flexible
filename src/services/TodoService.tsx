import { useQuery } from '@tanstack/react-query';
import { apiClient } from './ApiConfiguration/httpClient';
import type { Todo, TodoResponse } from '../types/todo.interface';

export const useGetTodos = () => {
    return useQuery<Todo[], Error>({
        queryKey: ['todos'],
        queryFn: () => apiClient.get('/page/todo'),
        staleTime: 1000 * 60 * 5, // 5 minutos de stale time
    });
};

export const useCreateTodo = async (data: Todo): Promise<TodoResponse> => {
    return await apiClient.post<TodoResponse>('/page/todo', data);
};

export const useUpdateTodo = async (data: Todo): Promise<TodoResponse> => {
    return await apiClient.put<TodoResponse>(`/page/todo/${data.id}`, data);
};

export const useDeleteTodo = async (id: number): Promise<void> => {
    return await apiClient.delete(`/page/todo/${id}`);
};