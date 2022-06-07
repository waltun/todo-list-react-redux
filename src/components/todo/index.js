// import components
import AddTodo from "./addTodo";
import TodoItems from "./todoItems";

// import redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// import slices
import { setTodos } from "../../store/slices/todoSlice";
import { setLoading } from "../../store/slices/loadingSlice";

// import packages
import axios from "axios";
import { CogIcon } from "@heroicons/react/outline";

// import react
import { useEffect } from "react";

export default function Todo() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.list);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    const getUsers = async () => {
      dispatch(setLoading());
  
      let res = await axios.get(
        "https://6283d9436b6c317d5ba74d17.endapi.io/todos"
      );
  
      dispatch(setTodos(res.data.data));
  
      dispatch(setLoading());
    };

    getUsers();
  }, []);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-2xl relative">
        <div className="mb-4">
          <h1 className="text-black font-bold">Todo List</h1>
          <AddTodo />
        </div>
        <div>
          {todos.length ? (
            todos.map((item) => <TodoItems todo={item} key={item.id} />)
          ) : (
            <p className="text-center font-bold">Nothing to show...</p>
          )}
        </div>

        {loading ? (
          <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <CogIcon className="w-7 h-7 animate-spin" />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
