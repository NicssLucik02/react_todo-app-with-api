// import { addTodos } from "../api/todos";
// import { useTodos } from "../hooks/useTodos";
// import { ErrorType } from "../types/enums";
// import { Todo } from "../types/Todo";

// export const handleAddTodo = async (
//     title: string,
//     setSearchQuery: (value: string) => void,
//   ) => {
//     const { setTodos, setCurrentError, inputRef, handleChangeLoading, setTempTodo } = useTodos();

//     const newTodo: Todo = {
//       id: 0,
//       userId: 3349,
//       title: title.trim(),
//       completed: false,
//     };

//     if (title.trim() === '') {
//       setCurrentError(ErrorType.EmptyTitle);

//       return;
//     }

//     handleChangeLoading('add', true);
//     setTempTodo(newTodo);
//     try {
//       const result = await addTodos(newTodo);

//       setTodos(prev => [...prev, result]);
//       setTempTodo(null);
//       setSearchQuery('');
//     } catch (error) {
//       setCurrentError(ErrorType.Add);
//       setTempTodo(null);
//     } finally {
//       handleChangeLoading('add', false);
//       if (inputRef.current && !inputRef.current.disabled) {
//         inputRef.current.focus();
//       }
//     }
//   };
