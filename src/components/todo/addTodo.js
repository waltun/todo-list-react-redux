// import redux
import { useDispatch } from "react-redux";

// import slices
import { addTodo } from "../../store/slices/todoSlice";
import { setLoading } from "../../store/slices/loadingSlice";

// import packages
import axios from "axios";

// import react
import { useState } from "react";

export default function AddTodo() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    setText(e.target.value);
  };

  const submitAddTodo = () => {
    if (text.length > 0) {
      dispatch(setLoading());

      axios
        .post("https://6283d9436b6c317d5ba74d17.endapi.io/todos", {
          text: text,
          done: false,
        })
        .then((response) => {
          dispatch(
            addTodo({
              text: text,
              done: false,
            })
          );
          dispatch(setLoading());
        })
        .catch((error) => console.log(error));

      setText("");
    }
  };

  return (
    <div className="flex mt-4">
      <input
        className="shadow appearance-none border border-gray-300 rounded w-full py-2 px-3 mr-4 text-black"
        placeholder="Add Todo"
        onChange={addTodoHandler}
        value={text}
      />
      <button
        className="flex-shrink-0 p-2 border-2 rounded text-green-600 border-green-500 hover:text-white hover:bg-green-500"
        onClick={submitAddTodo}
      >
        Add
      </button>
    </div>
  );
}
