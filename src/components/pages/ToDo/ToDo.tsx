import React from "react";
import { InputText } from "../../atoms/Input/Input";
import Card from "../../molecules/Card/Card"
import Button from "../../atoms/Button/Button";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from "@mui/material";
import type { Todo, TodoResponse } from "../../../types/todo.interface";
import { useGetTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from "../../../services/TodoService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ToDo: React.FC = () => {
    const queryClient = useQueryClient();
    const [id, setId] = React.useState(0);
    const [title, setTitle] = React.useState('');
    const { data: rows } = useGetTodos();
    const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);
    
    const handleSubmit = () => {
        // console.log(title);
        if (editingTodo) {
            updateMutation.mutate({ id: editingTodo.id, title });
        } else {
            createMutation.mutate({ title, completed: false });
        }
    };

    const createMutation = useMutation({
        mutationFn: useCreateTodo,
        onSuccess: (newTodo: TodoResponse) => {
            const data = newTodo.data;
            queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => 
                old ? [...old, data] : [data]
            );
        
            // Resetear el formulario
            resetForm();
        },
        onError: (error) => {
            alert(`Error al crear el todo: ${error.message}`);
        },
        onSettled: () => {
            console.log('La mutación ha finalizado');
        }
    });

    const updateMutation = useMutation({
        mutationFn: useUpdateTodo,
        onSuccess: (updatedTodo: TodoResponse) => {
            const data = updatedTodo.data;
            queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => 
                old?.map(todo => todo.id === data.id ? data : todo)
            );

            resetForm();
        },
        onError: (error) => {
          alert(`Error updating todo: ${error.message}`);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: useDeleteTodo,
        onMutate: async (deletedId) => {
          // Cancelar queries en progreso
          await queryClient.cancelQueries({ queryKey: ['todos'] });
    
          // Snapshot del valor anterior
          const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
    
          // Eliminación optimista
          queryClient.setQueryData(['todos'], (old: Todo[] | undefined) => 
            old?.filter(todo => todo.id !== deletedId)
          );
    
          resetForm();
          // Retornar contexto con snapshot
          return { previousTodos };
        },
        onError: (err, _variables, context) => {
          // Revertir al snapshot en caso de error
          if (context?.previousTodos) {
            queryClient.setQueryData(['todos'], context.previousTodos);
          }
          alert(`Error deleting todo: ${err.message}`);
        },
        onSettled: () => {
          // Invalidar para asegurar datos frescos
          queryClient.invalidateQueries({ queryKey: ['todos'] });
        }
    });

    const handleEdit = (todo: Todo) => {
        setEditingTodo(todo);
        setId(todo.id!);
        setTitle(todo.title);
    };

    const handleComplete = (todo: Todo) => {
        updateMutation.mutate({
            id: todo.id,
            title: todo.title,
            completed: !todo.completed
        });
    };

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este todo?')) {
            deleteMutation.mutate(id);
        }
    };
    const handleCancel = () => {
        setEditingTodo(null);
        setTitle('');
    };

    const resetForm = () => {
        setEditingTodo(null);
        setId(0);
        setTitle('');
    };

    return(
        <>
            <Card>
                <form className="form-todo">
                    <InputText
                        id="title"
                        label="Title"
                        placeholder="Title"
                        onChange={(value) => setTitle(value)}
                        value={title}
                    ></InputText>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 6, md: 4 }}>
                            <Button onClick={handleSubmit}>
                                {
                                    editingTodo ? 'Editar' : 'Agregar'
                                }
                            </Button>
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                                {
                                    editingTodo && <Button color="warning" onClick={handleDelete}>Eliminar</Button>
                                }
                        </Grid>
                        <Grid size={{ xs: 6, md: 4 }}>
                                {
                                     editingTodo && <Button color="error" variant="outlined" onClick={handleCancel} >Cancelar</Button>
                                }
                        </Grid>
                    </Grid>
                </form>
                <br />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Completed</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            rows?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                    onDoubleClick={()=> handleEdit(row) }
                                >
                                    <TableCell component="th" scope="row" align="center">{row.id}</TableCell>
                                    <TableCell align="right">{row.title}</TableCell>
                                    <TableCell align="center">
                                        {
                                            row.completed
                                            ? 
                                                'Completed'
                                            :
                                                <Button key={row.id} onClick={() => handleComplete(row)} >Completar</Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>
        </>
    )
};

export default ToDo;