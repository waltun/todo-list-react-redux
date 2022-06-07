// import redux
import { useDispatch } from "react-redux";

// import slices
import { deleteTodo, toggleDoneTodo } from "../../store/slices/todoSlice";
import { setLoading } from "../../store/slices/loadingSlice";

// import packages
import axios from "axios";

export default function TodoItems({ todo }) {
  const dispatch = useDispatch();

  const deleteHandler = async () => {
    dispatch(setLoading());

    await axios
      .delete(`https://6283d9436b6c317d5ba74d17.endapi.io/todos/${todo.id}`)
      .then((response) => {
        dispatch(deleteTodo(todo.id));
        dispatch(setLoading());
      })
      .catch((error) => console.log(error));
  };

  const toggleDoneHandler = async () => {
    dispatch(setLoading());

    await axios
      .put(`https://6283d9436b6c317d5ba74d17.endapi.io/todos/${todo.id}`, {
        done: !todo.done,
      })
      .then((response) => dispatch(toggleDoneTodo(todo.id)))
      .catch((error) => console.log(error));

    dispatch(setLoading());
  };

  return (
    <div className="flex mb-4 items-center">
      <p
        className={`w-full ${
          todo.done ? "line-through text-green" : "text-black"
        }`}
      >
        {todo.text}
      </p>

      {todo.done ? (
        <button
          className="flex-shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-gray-600 border-gray-500 hover:bg-gray-500"
          onClick={toggleDoneHandler}
        >
          Not Done
        </button>
      ) : (
        <button
          className="flex-shrink-0 p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-600 border-green-500 hover:bg-green-500"
          onClick={toggleDoneHandler}
        >
          Done
        </button>
      )}
      <button
        className="flex-shrink-0 p-2 ml-2 border-2 rounded text-red-600 border-red-500 hover:text-white hover:bg-red-500"
        onClick={deleteHandler}
      >
        Remove
      </button>
    </div>
  );
}
