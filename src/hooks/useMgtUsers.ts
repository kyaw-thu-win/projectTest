// import genres from "../data/genres";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MgtUser } from "../entities/mgtUser";
import APIClient from "../services/api-client";
let token = "";
// import { CACHE_KEY_MgtUsers } from "../constants";

// if(isLoading) return <p> Loading....<p>;
// if(error) return <p>{error.message}</p>

const useMgtUsers = () =>
  // useQuery<Todo[], Error>({
  useQuery<any, Error>({
    // queryKey: CACHE_KEY_MgtUsers,
    queryKey: ["users"],
    // queryFn: mgtService.getAll,
    staleTime: 24 * 60 * 60 * 1000, // 24h
    // initialData: { count: genres.length, results: genres, next: null },
    // initialData: genres,
  });

interface AddMgtUserContextForError {
  previousMgtUsers: any[];
}

const apiClient = new APIClient<any>("/users", token);

export const useAddMgtUser = () => {
  // const useAddMgtUser = (onAdd: () => void) => {
  const queryClient = useQueryClient();
  return useMutation<MgtUser, Error, MgtUser, AddMgtUserContextForError>({
    mutationFn: apiClient.post,
    onMutate: () => {
      const previousMgtUsers = queryClient.getQueryData<any>(["users"]) || {};

      queryClient.setQueryData<any>(["users"], (old: any = {}) => {
        // return [...old.result, newMgtUser];
        // old.count++;
        return old;
      });

      // For UI
      // onAdd();
      return { previousMgtUsers };
    },
    onSuccess: () => {
      // APPROACH : Invalidating the cache
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      // APPROACH 2 : Updating the data in the cache
      // queryClient.setQueryData<any>(["users"], (mgtUsers: any) => {
      //   mgtUsers.count++;
      //   mgtUsers.result = mgtUsers.result?.map((mgtUser: any) =>
      //     mgtUser === newMgtUser ? saveMgtUser : mgtUser
      //   );
      //   return mgtUsers;
      // });
    },
    onError: (_error, _newMgtUser, context) => {
      if (!context) return;
      queryClient.setQueryData<any>(["users"], context.previousMgtUsers);
    },
  });
};

export default useMgtUsers;

// interface AddTodoContext {
//   previousTodos: Todo[]
// }

// const useAddTodo = (onAdd: ()=> void) => {
//   const queryClient = useQueryClient();
//   return useMutation<Todo,Error,Todo, AddTodoContext>({
//     mutationFn: (todo: Todo)=>
//     axios.post<Todo>('https://jsonplaceholder.typicode.com/todos',todo)
//     .then((res)=>res.data),
//     onMutate: (newTodo: Todo)=>{
//       const previousTodos = queryClient.getQueryData<Todo[]>(['todos'] || [])
//       queryClient.setQueryData<Todo[]>(['todos'],(todos = [])=>[
//         newTodo,
//         ...todos
//       ]);
//       onAdd();
//       // if(ref.current) ref.current.value = '';
//       return {previousTodos}
//     }
//     onSuccess: (savedTodo, newTodo)=>{ // saveTodo from backend and newTodo from client
//       queryClient.setQueryData<Todo[]>(['todos'],todos=>
//         todos?.map(todo=>todo===newTodo?saveTodo : todo))
//     },
//     onError: (error, newTodo, context) => {
//       if(!context) return;
//       queryClient.setQueryData<Todo[]>(['todos'],context.previousTodos)
//     }
//   })
// }

// const addTodo = useAddTodo(()=>{
//   if(ref.current) ref.current.value='';
// })

// return(
//   <>
//   {addTodo.error && <div>{addTodo.error.message}</div>}
//   <form>
//   </form>
//   </>
// )
